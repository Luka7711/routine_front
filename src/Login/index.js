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
		if(this.state.redirect) {
			return <Redirect to="/"/>
		}
		return(
			<div className="col-md-12 d-flex justify-content-center flex-column">
				<div className="row" >
					<div className="col-lg-6 col-md-8 mx-auto">
						<div className="card rounded shadow shadow-sm">
							<div className="card-header text-center">
								<h3>Sign in</h3>
							</div>
							<div className="card-body d-flex justify-content-center">
								<form className="form" onSubmit={this.handleSubmit}>
									<div className="form-group">
										<label className="sign">username: </label>
											<input className="form-control w-100" type="text" placeholder="username" name="username" onChange={this.handleChange} autoComplete="off"/>
									
									</div>
									<div className="form-group">	
										<label className="sign">password:</label>
											<input className="form-control w-100" type="password" placeholder="password" name="password" onChange={this.handleChange}/>
										
									</div>
									<button className="btn btn-dark">sign in</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Login