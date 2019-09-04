import React, {Component} from 'react';
import './App.css';
import Nav from './Navigation';
import Login from './Login'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom' 

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
              <Route to='/login' component={Login}/>
              <Route to='/signup' component={Signup}/>
            </Switch>
         </div>
      </Router>
    );
  }
}

export default App;
