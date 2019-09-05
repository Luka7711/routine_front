import React, {Component} from 'react';


class Login extends Component {
	constructor(){
		super();
		this.state = {
			username:'',
			password:'',
			message:''
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
		const response = await fetch('http://localhost:9000/auth/login', {
			method:POST,
			credentials:'include',
			body:JSON.stringify(this.state),
			header:{
				'Content-Type': 'application-json'
			}
		})

	}catch(err){
		this.setState({
			message:'Something went wrong!'
		})
	}
}

	render(){
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