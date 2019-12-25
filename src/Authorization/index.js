import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Authorization extends Component{
	render(){
		const validation = [<Link to="/login" key="1"><li className="nav-link">Log in</li></Link>,
		<Link to="/signup" key="2"><li className="nav-link">Sign Up</li></Link>];
		return(
			<React.Fragment>
				{validation.map((item, i) => item)}
			</React.Fragment>
		)	
	}
}

export default Authorization