import React, {Component} from 'react';
import './App.css';
import Authorization from './Authorization';
import Login from './Login';
import Signup from './Signup';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'; 
import Home from './Home';
import DiaryForm from './DiaryForm';
import DiaryList from './DiaryList';
import StoryOne from './StoryOne';
import Logout from './Logout';
import DiaryEditForm from './DiaryEditForm';
import SearchResult from './SearchResult';

class App extends Component {
  constructor(){
    super();
    this.state = {
      username:'',
      diaryStories:[],
      loggedIn: false,
      quote:'',
      showResult:false
    }
  }

  componentDidMount(){
    this.handleQuotes();
    setInterval(() => this.handleQuotes(), 60000);
  }

  handleUsername = (user) => {
    this.setState({
      username:user
    })
  }

  handleDiary = (stories) => {
    this.setState({
      diaryStories:stories
    })
  }

  handleLoggedIn = () => {
    this.setState({
      loggedIn:true
    })
  }

  handleLogout = () => {
    this.setState({
      loggedIn:false
    })
  }

  handleQuotes = async() => {
    try{
        const response = await fetch('http://localhost:9000/routine/quotes', {
            method:'GET',
            credentials:'include'
        });
        const parsedResponse = await response.json();
        
        if(parsedResponse.status === 200){
          this.setState({
            quote:parsedResponse.data
          })
        }else{
          this.setState({
            quote:'nothin'
          })
        }
    }catch(err){
      console.log(err);
      console.log('Something went wrong, data is not mined')
    }
  }

  handleChange = async(e) =>{
    try{
      const response = await fetch('http://localhost:9000/auth/users', {
        method:'GET',
        credentials:'include'
      });
      const parsedResponse = await response.json();
      let allUsers = [];
      this.setState({
        showResult:true
      })
    }catch(err){
      console.log(err)
    }
  }

  handleRemoveForm = () => {
    this.setState({
      showResult:false
    })
  }

  render(){
    console.log(this.state);
    return (
      <Router>
         <div className="App" onClick={this.handleRemoveForm}>  
           <nav>
             <ul>
               <Link to="/"><li>Home</li></Link>
               {this.state.loggedIn ? <Logout handleLogout={this.handleLogout}/> : <Authorization/>}
               <li><input type="text" placeholder="search" onChange={this.handleChange}/></li>
             </ul>
           </nav>
           {this.state.showResult ?
              <SearchResult users={this.state.users}/>
              :
              null
           }
           <div className="quotes">
             <p>{this.state.quote? this.state.quote.message : null}</p>
             <p>- {this.state.quote.author}</p>
           </div>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path='/login' render={(props) => <Login {...props} handleUsername={this.handleUsername} handleLoggedIn={this.handleLoggedIn}/>} />
              <Route path='/signup' render={(props) =><Signup {...props} handleUsername={this.handleUsername} handleLoggedIn={this.handleLoggedIn}/>} />
              <Route path='/write-diary' render={(props) => <DiaryForm {...props} name={this.state.username} handleDiary={this.handleDiary}/>} />
              <Route path='/profile' render={(props) => <DiaryList {...props} username={this.state.username}/>}/>
              <Route path='/diary-story/:number' component={StoryOne}/>
              <Route path='/diary/edit/:number' render={(props) => <DiaryEditForm {...props} name={this.state.username}/> } /> 
            </Switch>
         </div>
      </Router>
    );
  }
}

export default App;
