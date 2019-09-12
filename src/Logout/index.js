import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

class Logout extends Component {
	constructor(){
		super();
		this.state = {
			message:'',
			redirect: false
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
					message:parsedResponse.message,
					redirect:true
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
		if(this.state.redirect === true){
			return <Redirect to='/'/>
		}
		return(
			<ul>
				<Link to="/profile"><li>Profile</li></Link>
				<li onClick={this.handleLogout}>Logout</li>
			</ul>
		)
	}
}

export default Logout