import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component{
	constructor(){
		super();
		this.state = {
			loggedIn: true
		}
	}

	render(){
		const validation = [<Link to="/login"><li>Log in</li></Link>,
		<Link to="/signup"><li>Sign Up</li></Link>]
		
		return(
			<ul>
				<li>Logo</li>
				<Link to="/"><li>Home</li></Link>
				{this.state.loggedIn === false ? validation.map(item => item) : null}
			</ul>
		)
	}
}

export default Nav