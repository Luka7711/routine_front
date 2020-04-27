import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Button, FormControl, Form, 
        Nav, NavItem, NavDropdown, DropdownButton, 
        MenuItem, CollapsibleNav} from 'react-bootstrap';


import Authorization from './Authorization';
import Login from './Login';
import Signup from './Signup';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'; 
import Home from './Home';
import DiaryForm from './DiaryForm';
import Chat from './Chat';
import StoryOne from './StoryOne';
import Logout from './Logout';
import DiaryEditForm from './DiaryEditForm';
import SearchResult from './SearchResult';
import SearchProfile from './SearchProfile';
import Messages from './Messages';
import Posts from './Posts';
import openSocket from 'socket.io-client';
import coverImage from './img/cover.jpg';
import logo from './img/logo.gif';
export const socket = openSocket(process.env.REACT_APP_BACKEND_URL);


const style = {
  logo:{
    width:"3rem", height:"3rem", 
    backgroundImage:`url(${logo})`, 
    backgroundSize:'cover', 
    backgroundPosition:'center', 
    borderRadius:'5px'
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      username:'',
      diaryStories:[],
      loggedIn: false,
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
    })
  }


  closeChatWindow = () => {
    this.setState({
      conversationId:'',
      showMessageWindow:false
    })
  }

  //return searched user 
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

  //return list of users that having a conversation with current user 
  getContactList = async() => {
    try{
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/message/contact-list/${this.state.username}`, {
        method:"GET",
        credentials:"include"
      })
      const parsedResponse = await response.json();
      if(parsedResponse.status === 200){
        this.setState({
          contactList:parsedResponse.data
        })
      }
    }catch(err) {
      console.log(err);
    }
  }

  render(){
    if(this.state.loggedIn === true) this.getContactList()
   
    return (
      <Router>
         <div className="App container" onClick={this.handleRemoveForm}>  
            <Navbar id="navigation" bg="light" variant="light" expand="sm">
              <div style={style.logo}></div>
              <Navbar.Toggle aria-controls="basic-navbar-nav"/>

              <Navbar.Collapse id="basic-navbar-nav">
                <ul className="navbar-nav mr-auto">
                  
                  <Link className="nav-item" to="/">
                    <li className="nav-link">Home</li>
                  </Link>
                  
                  { this.state.loggedIn ? 
                      <Logout handleLogout={this.handleLogout}/> : <Authorization/>
                  }
                  
                  { this.state.showResult ? 
                      <SearchResult foundUser={this.state.foundUser}/> : null
                  }
                </ul>
                
                <form className="form-inline my-2 my-lg-0">  
                    <input className="form-control mr-sm-2" type="text" placeholder="search" onChange={this.handleChange}/>
                </form>
              </Navbar.Collapse>
           </Navbar>
        
          <div className="jumbotron" id="jum" style={{backgroundImage:`url(${coverImage})`}}>
             <div className="container" id="content">
               <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path='/login' render={(props) => <Login {...props} handleUsername={this.handleUsername} handleLoggedIn={this.handleLoggedIn}/>} />
                  <Route path='/signup' render={(props) =><Signup {...props} handleUsername={this.handleUsername} handleLoggedIn={this.handleLoggedIn}/>} />
                  <Route path='/write-diary' render={(props) => <DiaryForm {...props} name={this.state.username} handleDiary={this.handleDiary}/>} />
                  <Route path='/messenger' render={(props) => <Chat {...props} username={this.state.username} contactList={this.state.contactList}/>} />
                  <Route path='/diary/edit/:number' render={(props) => <DiaryEditForm {...props} name={this.state.username}/> } /> 
                  <Route path='/search-for' render={(props) => <SearchProfile {...props} closeChatWindow={this.closeChatWindow} foundUser={this.state.foundUser} conversationId={this.state.conversationId} currentUser={this.state.username}/> } />
                  <Route path='/posts' render={(props)=> <Posts {...props} username={this.state.username}/> }/>
               </Switch>
             </div>
          </div>
        
         </div>
      </Router>
    );
  }
}

export default App;

