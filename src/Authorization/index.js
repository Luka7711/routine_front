import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Authorization extends Component{
	render(){
		const validation = [<Link to="/login" key="1"><li>Log in</li></Link>,
		<Link to="/signup" key="2"><li>Sign Up</li></Link>];
		return(
			<ul>
				{validation.map((item, i) => item)}
			</ul>
		)	
	}
}

export default Authorization