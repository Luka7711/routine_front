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

class App extends Component {
  constructor(){
    super();
    this.state = {
      username:'',
      diaryStories:[],
      loggedIn: false
    }
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

  render(){
    console.log(this.state);
    return (
      <Router>
         <div className="App">  
           <nav>
             <ul>
               <Link to="/"><li>Home</li></Link>
               {this.state.loggedIn ? <Logout handleLogout={this.handleLogout}/> : <Authorization/>}
             </ul>
           </nav>
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
