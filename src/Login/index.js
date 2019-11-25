import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'

class Login extends Component {
	constructor(){
		super();
		this.state = {
			username:'',
			password:'',
			message:'',
			redirect:false
		}
	}


handleChange = (event) => {
	this.setState({
		[event.currentTarget.name]: event.currentTarget.value
	})
}

handleSubmit = async(event) => {
	event.preventDefault();
	try{
		const response = await fetch(process.env.REACT_APP_BACKEND_URL+ '/auth/login', {
			method:'POST',
			credentials:'include',
			body:JSON.stringify(this.state),
			headers:{
				'Content-Type': 'application/json'
			}
		});

		const parsedResponse = await response.json();
		if(parsedResponse.status === 200){
			
			this.props.handleUsername(this.state.username);
			this.props.handleLoggedIn();
			this.setState({
				message: "Thank you! Welcome",
				redirect: true
			})
		}else{
			this.setState({
				message: "Username or password is incorrect"
			})
		}

	}catch(err){
		this.setState({
			message:'Something went wrong!'
		})
	}
}

	render(){
		console.log(process.env.REACT_APP_BACKEND_URL);
		if(this.state.redirect) {
			return <Redirect to="/"/>
		}
		return(
			<div>
				<div>
					<form onSubmit={this.handleSubmit}>
						<h3>Sign in</h3>
						<label>username:
							<input type="text" placeholder="username" name="username" onChange={this.handleChange}/>
						</label>
						<label>password:
							<input type="password" placeholder="password" name="password" onChange={this.handleChange}/>
						</label>
						<button>sign in</button>
					</form>
				</div>
			</div>
		)
	}
}

export default Login