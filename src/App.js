import React, {Component} from 'react';
import './App.css';
import Nav from './Navigation';
import Login from './Login';
import Signup from './Signup';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import Home from './Home';
import DiaryForm from './DiaryForm'

class App extends Component {
  constructor(){
    super();
    this.state = {

    }
  }
  render(){
    return (
      <Router>
         <div className="App">
            <Nav/>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path='/login' component={Login}/>
              <Route path='/signup' component={Signup}/>
              <Route path='/write-diary' component={DiaryForm}/>
            </Switch>
         </div>
      </Router>
    );
  }
}

export default App;
