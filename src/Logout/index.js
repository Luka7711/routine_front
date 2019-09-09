import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Logout extends Component {
	constructor(){
		super();
		this.state = {
			message:''
		}
	}

	handleLogout = async() => {
		
		try{
			const response = await fetch('http://localhost:9000/auth/logout', {
				method:'GET',
				credentials:'include'
			});
			const parsedResponse = await response.json();
			if(parsedResponse.status === 200){
				this.setState({
					message:parsedResponse.message
				})
				this.props.handleLogout();
				console.log(this.state.message)
			}else{
				this.setState({
					message:parsedResponse.message
				})
			}
		}catch(err){
			console.log(err)
		}
	}

	render(){
		return(
			<ul>
				<Link to="/profile"><li>Profile</li></Link>
				<li onClick={this.handleLogout}>Logout</li>
			</ul>
		)
	}
}

export default Logout