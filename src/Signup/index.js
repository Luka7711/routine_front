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
				message:'username is exist'
			})
		}
	}catch(err){
		this.setState({
			message:'Something went wrong, try again!'
		})
		console.log(this.state.message)
	}
}

	render(){
		if(this.state.redirect){
			return <Redirect to="/home"/>
		}
		return(
			<div style={{marginTop:"3rem"}}className="col-md-12 d-flex justify-content-center flex-column">
				<div className="row" >
					<div className="col-sm-5 col-md-5 col-lg-4 mx-auto">
						<div className="card rounded shadow shadow-sm">
							<div className="card-header text-center">
								<h3>Sign up</h3>
							</div>
							<div className="card-body d-flex justify-content-center">
								<form className="form" onSubmit={this.handleSubmit}>
									<div className="form-group">
										<label className="sign">username: {this.state.message}</label>
										<input className="form-control" type="text" placeholder="username" name="username" onChange={this.handleChange}/>
									</div>
									<div className="form-group">	
										<label className="sign">password:</label>
										<input className="form-control" type="password" placeholder="password" name="password" onChange={this.handleChange}/>
										
									</div>

									<div className="form-group">	
										<label className="sign">Profile picture: </label>
											<input type="file" name="avatar" onChange={this.handleChange}/>
									</div>
									<button className="btn btn-info">sign up</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Signup

