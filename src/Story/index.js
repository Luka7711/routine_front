import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Story extends Component  {
	constructor(){
		super();
		this.state = {

		}
	}
	
	render(){
		let stories = this.props.story.map((item, i) => {
			return(
				<div key={i}>
					<ul>
						<Link to={`/diary-story/${item._id}`}><li>{item.date}</li>
						<li>{item.title}</li>
						<li>{item.about}</li></Link>
					</ul>
				</div>
			)
		});

		return(
			<div>
				{stories}
			</div>
		)
	}
}
export default Story