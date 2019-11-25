import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Signup extends Component {
	constructor(){
		super();
		this.state = {
			username:'',
			password:'',
			avatar:'',
			message:'',
			redirect:false
		}
	}


	handleChange = (e) => {
		console.log(e.target.name)
		switch(e.target.name){
			case 'avatar':
			this.setState({avatar:e.target.files[0]});
			break;
		default:
			this.setState({[e.target.name]:e.target.value})
		}
	}

handleSubmit = async(e) => {
	e.preventDefault();
	try{
		const formData = await new FormData();
		formData.append('username', this.state.username);
		formData.append('password', this.state.password);
		formData.append('avatar', this.state.avatar);
		const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/auth/register', {
			method:'POST',
			credentials:'include',
			body:formData
		});

		const parsedResponse = await response.json();

		if(parsedResponse.status === 200){

			this.props.handleUsername(this.state.username);
			this.props.handleLoggedIn();
			this.setState({
				message:'Thank you for registerring',
				redirect:true
			})
			console.log(this.state.message)
		}else{
			this.setState({
				message:'Not able to sign you up'
			})
			console.log(this.state.message)
		}
	}catch(err){
		this.setState({
			message:'Something went wrong, try again!'
		})
		console.log(this.state.message)
	}
}

	render(){
		console.log(this.state)
		if(this.state.redirect){
			return <Redirect to="/"/>
		}
		return(
			<div>
				<div>
					<form onSubmit={this.handleSubmit} encType="multipart/form-data">
						<h3>Sign up</h3>
						<label>username:</label>
						<input placholder="username" name="username" onChange={this.handleChange}/>
						<label>password:</label>
						<input placeholder="password" name="password" onChange={this.handleChange}/>
						<input type="file" name="avatar" onChange={this.handleChange}/>
						<button>sign up</button>
					</form>
				</div>
			</div>
		)
	}
}

export default Signup