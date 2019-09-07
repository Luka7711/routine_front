import React, {Component} from 'react';
import './App.css';
import Nav from './Navigation';
import Login from './Login';
import Signup from './Signup';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import Home from './Home';
import DiaryForm from './DiaryForm';
import DiaryList from './DiaryList';
import StoryOne from './StoryOne'

class App extends Component {
  constructor(){
    super();
    this.state = {
      username:'',
      diaryStories:[]
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

  render(){
    console.log(this.state.username)
    return (
      <Router>
         <div className="App">
            <Nav/>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path='/login' render={(props) => <Login {...props} handleUsername={this.handleUsername}/>} />
              <Route path='/signup' render={(props) =><Signup {...props} handleUsername={this.handleUsername}/>} />
              <Route path='/write-diary' render={(props) => <DiaryForm {...props} name={this.state.username} handleDiary={this.handleDiary}/>} />
              <Route path='/profile' render={(props) => <DiaryList {...props} diaryStories={this.state.diaryStories}/>}/>
              <Route path='/diary-story/:number' component={StoryOne}/>
            </Switch>
         </div>
      </Router>
    );
  }
}

export default App;
