import React from 'react';
import { Link } from 'react-router-dom'

const Diary = () =>{
	return(
		<div>
			<div>
				<h1>Blog</h1>
				<p>______________</p>
				<p>______________</p>
				<p>______________</p>
				<Link to="/write-diary">Write</Link>
			</div>
		</div>
	)
}

export default Diary