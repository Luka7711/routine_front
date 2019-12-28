import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import SearchProfile from './SearchProfile';
import MessageContacts from './MessageContacts';
import Messages from './Messages';
import openSocket from 'socket.io-client';
export const socket = openSocket(process.env.REACT_APP_BACKEND_URL);


class App extends Component {
  constructor(){
    super();
    this.state = {
      username:'',
      diaryStories:[],
      loggedIn: false,
      quote:'',
      showResult:false,
      searchValue:'',
      foundUser:''
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
      loggedIn:false,
      foundUser:'',
      showMessageWindow:false,
      diaryStories:[]
    });
  }


  closeChatWindow = () => {
    this.setState({
      conversationId:'',
      showMessageWindow:false
    })
  }

  handleChange = async(e) =>{
    e.persist();
    try{
      let response = await fetch(process.env.REACT_APP_BACKEND_URL+'/auth/users', {
        method:'GET',
        credentials:'include'
      });
      let parsedResponse = await response.json();
      this.setState({
        allUsers:parsedResponse.users,
        searchValue: e.target.value
      });
     //check if items in array === searchValue
      let regex = new RegExp("^" + this.state.searchValue + "$", "i");
      let users = this.state.allUsers;
      let result; 
      await (function(){
        for(let i=0; i<users.length; i++){
          result = users[i].match(regex);
            if(result !== null){
              return result[0]
            }
        }
      }())

      if(result !== null){
        this.setState({
          foundUser: result[0],
          showResult:true
        })
      }else{
        this.setState({
          foundUser:''
        })
      }
    }catch(err){
      console.log('something went wrong') 
    }
  }

  handleRemoveForm = () => {
    this.setState({
      showResult:false
    })
  }

  componentDidMount(){
    this.sendSocket()
  }

  sendSocket(){
      socket.emit("messages", "HEllO people");
      console.log("message just sent");
  }

  render(){
    
    return (
      <Router>
         <div className="App container" onClick={this.handleRemoveForm}>  
           <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <div className="collapse navbar-collapse" id="navbarNav">
             <ul className="navbar-nav">
               <Link to="/"><li className="nav-item nav-link">Home</li></Link>
               {this.state.loggedIn ? <Logout handleLogout={this.handleLogout}/> : <Authorization/>}
               <li className="nav-link" style={{paddingLeft:"30rem"}}><input className="form-control" type="text" placeholder="search" onChange={this.handleChange}/></li>
             </ul>
             </div>
           </nav>
           {this.state.showResult ?
              <SearchResult foundUser={this.state.foundUser}/>
              :
              null
           }
           <div className="jumbotron" id="jum">
          <div className="container" id="content">
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path='/login' render={(props) => <Login {...props} handleUsername={this.handleUsername} handleLoggedIn={this.handleLoggedIn}/>} />
              <Route path='/signup' render={(props) =><Signup {...props} handleUsername={this.handleUsername} handleLoggedIn={this.handleLoggedIn}/>} />
              <Route path='/write-diary' render={(props) => <DiaryForm {...props} name={this.state.username} handleDiary={this.handleDiary}/>} />
              <Route path='/profile' render={(props) => <DiaryList {...props} username={this.state.username}/>}/>
              <Route path='/diary-story/:number' component={StoryOne}/>
              <Route path='/diary/edit/:number' render={(props) => <DiaryEditForm {...props} name={this.state.username}/> } /> 
              <Route path='/search-for' render={(props) => <SearchProfile {...props} closeChatWindow={this.closeChatWindow} foundUser={this.state.foundUser} conversationId={this.state.conversationId} currentUser={this.state.username}/> } />
            </Switch>
           
            </div>
             </div>
         </div>
      </Router>
    );
  }
}

export default App;

