import React from 'react'

const Signup = () => {
	render(){
		return(
			<div>
				<div>
					<form>
						<h3>Sign up</h3>
						<label>username:</label>
						<input placholder="username"/>
						<label>password:</label>
						<input placeholder="password"/>
						<label>zodiac:</label>
						<input placeholder="zodiak"/>
						<input type="submit/"/>
					</form>
				</div>
			</div>
		)
	}
}

export default Signup