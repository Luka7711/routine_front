import React from 'react'

const Signup = () =>{
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
						<select>
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

export default Signup