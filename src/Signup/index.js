import React, {Component} from 'react'

class Signup extends Component {
	constructor(){
		super();
		this.state = {
			username:'',
			password:'',
			zodiac:''
		}
	}

handleChange = (e) =>{
	this.setState({
		[e.currentTarget.name]: e.currentTarget.value
	})
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
						<select onChange={this.handleChange}>
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