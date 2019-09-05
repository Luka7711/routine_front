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