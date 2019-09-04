import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component{
	constructor(){
		super();
	}

	render(){
		return(
			<ul>
				<li>Logo</li>
				<Link to><li>Home</li></Link>
				<Link to><li>Log in</li></Link>
				<Link to><li>Sign Up</li></Link>
			</ul>
		)
	}
}

export default Nav