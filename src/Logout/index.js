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
			const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/auth/logout', {
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
			<>
				<Link to="/profile"><li className="nav-link">Profile</li></Link>
				<li className="nav-link">Friends</li>
				<li className="nav-link">Notifications</li>
				<li className="nav-link" onClick={this.handleLogout}>Logout</li>
			</>
		)
	}
}

export default Logout