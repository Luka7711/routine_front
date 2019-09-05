import React, {Component} from 'react'

class Signup extends Component {
	constructor(){
		super();
		this.state = {
			username:'',
			password:'',
			zodiac:'',
			message:''
		}
	}

handleChange = (e) =>{
	this.setState({
		[e.currentTarget.name]: e.currentTarget.value
	})
}

handleSubmit = async(e) => {
	e.preventDefault();
	console.log(this.state)
	
	try{
		const response = await fetch('http://localhost:9000/auth/register', {
			method:'POST',
			credentials:'include',
			body:JSON.stringify(this.state),
			headers:{
				'Content-Type':'application/json'
			}
		})

		const parsedResponse = await response.json();

		if(parsedResponse.status === 200){
			this.setState({
				message:'Thank you for registerring'
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
		return(
			<div>
				<div>
					<form onSubmit={this.handleSubmit}>
						<h3>Sign up</h3>
						<label>username:</label>
						<input placholder="username" name="username" onChange={this.handleChange}/>
						<label>password:</label>
						<input placeholder="password" name="password" onChange={this.handleChange}/>
						<label>zodiac:</label>
						<select onChange={this.handleChange} name="zodiac">
							<option value="aries">aries</option>
							<option value="taurus">taurus</option>
							<option value="gemini">gemini</option>
							<option value="cancer">cancer</option>
							<option value="leo">leo</option>
							<option value="virgo">virgo</option>
							<option value="libra">libra</option>
							<option value="scorpio">scorpio</option>
							<option value="sagitarius">sagitarius</option>
							<option value="capricorn">capricorn</option>
							<option value="aquarius">aquarius</option>
							<option value="pisces">pisces</option>
						</select>
						<button>sign up</button>
					</form>
				</div>
			</div>
		)
	}
}

export default Signup