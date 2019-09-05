import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component{
	constructor(){
		super();
		this.state = {
			loggedIn: false,
		}
	}

	render(){
		const validation = [<Link to="/login" key="1"><li>Log in</li></Link>,
		<Link to="/signup" key="2"><li>Sign Up</li></Link>]
		
		return(
			<ul>
				<li>Logo</li>
				<Link to="/"><li>Home</li></Link>
				{this.state.loggedIn === false? validation.map((item, i) => item) : null}
			</ul>
		)
	}
}

export default Nav