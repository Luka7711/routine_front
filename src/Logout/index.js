import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Logout extends Component {
	render(){
		return(
			<ul>
				<Link to="/profile"><li>Profile</li></Link>
				<Link to="/logout"><li>Logout</li></Link>
			</ul>
		)
	}
}

export default Logout