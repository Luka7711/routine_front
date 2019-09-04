import React from 'react';


const Login = () => {
		return(
			<div>
				<div>
					<form>
						<h3>Sign in</h3>
						<label>username:</label>
						<input placeholder="username"/>
						<label>password:</label>
						<input placeholder="password"/>
						<button>sign in</button>
					</form>
				</div>
			</div>
		)
}

export default Login