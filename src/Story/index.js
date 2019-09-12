import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Story extends Component  {

	handleEdit = async() => {

	}
	render(){
		return(
			<div>
				<ul>
					<Link to={`/diary-story/${this.props.story._id}`}><li>{this.props.story.date}</li>
						<li>{this.props.story.title}</li>
						<li>{this.props.story.about}</li>
					</Link>
					<Link to={`/diary/edit/${this.props.story._id}`}><li>Edit</li></Link>
					<li onClick={this.handleDelete}>Delete</li>
				</ul>
			</div>
		)
	}
}

export default Story