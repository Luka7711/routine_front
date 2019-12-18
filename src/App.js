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
      foundUser:'',
      showMessageWindow:false
    }

  }

  // componentDidMount(){
  //   this.handleQuotes();
  //   setInterval(() => this.handleQuotes(), 60000);
  // }

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
  };

  handleShowMessageWindow = async(foundUser) => { 
    //1. make post request to server
    //2. pull up all messages from server
    console.log('its aaaa')
    console.log(foundUser);
    console.log(this.state.username)
    try{
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + 
        '/message/' + this.state.username + '/' + foundUser, {
         
          method:"POST",
          credentials:"include",
          body: JSON.stringify(),
          headers:{
          'Content-Type': 'application/json'
          }
       });
      
      const parsedResponse = await response.json();
      console.log(parsedResponse)
       this.setState({
          conversationId: parsedResponse.conversationData,
          showMessageWindow:true
       })
    }catch(err){
      console.log("something went wrong")
    }
   
  }

  closeChatWindow = () => {
    this.setState({
      conversationId:'',
      showMessageWindow:false
    })
  }

  handleQuotes = async() => {
    try{
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/routine/quotes', {
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
          foundUser:'',
          showResult:false
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
              <SearchResult foundUser={this.state.foundUser}/>
              :
              null
           }
          
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path='/login' render={(props) => <Login {...props} handleUsername={this.handleUsername} handleLoggedIn={this.handleLoggedIn}/>} />
              <Route path='/signup' render={(props) =><Signup {...props} handleUsername={this.handleUsername} handleLoggedIn={this.handleLoggedIn}/>} />
              <Route path='/write-diary' render={(props) => <DiaryForm {...props} name={this.state.username} handleDiary={this.handleDiary}/>} />
              <Route path='/profile' render={(props) => <DiaryList {...props} username={this.state.username}/>}/>
              <Route path='/diary-story/:number' component={StoryOne}/>
              <Route path='/diary/edit/:number' render={(props) => <DiaryEditForm {...props} name={this.state.username}/> } /> 
              <Route path='/search-for' render={(props) => <SearchProfile {...props} foundUser={this.state.foundUser} handleShowMessageWindow={this.handleShowMessageWindow}/> } />
            </Switch>
             {this.state.loggedIn && this.state.showMessageWindow ?
              <Messages closeChatWindow={this.closeChatWindow} foundUser={this.state.foundUser} conversationId={this.state.conversationId} currentUser={this.state.username}/> :
              null
            }
            {this.state.loggedIn ? [<MessageContacts/>] : null}
         </div>
      </Router>
    );
  }
}

export default App;
