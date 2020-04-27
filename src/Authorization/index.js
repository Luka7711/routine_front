import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Authorization extends Component{
	render(){
		return(
			<>
				<Link className="nav-item" to="/login" key="1">
					<li className="nav-link">Log in</li>
				</Link>
				
				<Link className="nav-item" to="/signup" key="2">
					<li className="nav-link">Sign Up</li>
				</Link>
			</>
		)	
	}
}

export default Authorization