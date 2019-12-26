import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
const Diary = () =>{
	return(
		<>
			<div className="row">
				<div className="col-lg-4 card rounded" id="to-do1" style={{height: "4rem"}}>
					<div className="row" style={{paddingTop: "1rem"}}>
						<div className="col-lg-8">
							<h5> <Link to="/write-diary">Write a post</Link></h5>
						</div>
						
						<div className="col-lg-4">
							<h5><i className="fa fa-edit icon"></i></h5>
						</div>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-lg-4 card rounded" id="to-do1" style={{height: "4rem"}}>
						<div className="row" style={{paddingTop: "1rem"}}>
						<div className="col-lg-8">
							<h5> <Link to="/write-diary">News</Link></h5>
						</div>
						
						<div className="col-lg-4">
							<h5><FontAwesomeIcon icon={faNewspaper} size="lg"/></h5>
						</div>
					</div>
				</div>
			</div>

				<div className="row">
				<div className="col-lg-4 card rounded" id="to-do1" style={{height: "4rem"}}>
						<div className="row" style={{paddingTop: "1rem"}}>
						<div className="col-lg-8">
							<h5> <Link to="/write-diary">Messenger</Link></h5>
						</div>
						
						<div className="col-lg-4">
							<h5><FontAwesomeIcon icon={faComments} size="lg"/></h5>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Diary