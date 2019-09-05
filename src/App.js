import React, {Component} from 'react';
import './App.css';
import Nav from './Navigation';
import Login from './Login';
import Signup from './Signup';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import Home from './Home';


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
              <Route path="/" component={Home}/>
              <Route path='/login' component={Login}/>
              <Route path='/signup' component={Signup}/>
            </Switch>
         </div>
      </Router>
    );
  }
}

export default App;
