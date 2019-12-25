import React from 'react';
import { Link } from 'react-router-dom'

const Diary = () =>{
	return(
		<div className="col-lg-6 card rounded" style={{height: "7rem"}}>
			<div class="row" style={{paddingTop: "1rem"}}>
				<div className="col-lg-4">
					<h5>Blog</h5>
					<Link to="/write-diary">Write a post</Link>
				</div>
				<div className="col-lg-4">
					
				</div>
			</div>
		</div>
	)
}

export default Diary