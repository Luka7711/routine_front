import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Story extends Component  {
	constructor(){
		super();
		this.state = {
			message:''
		}
	}

	handleDelete = async(e) => {
		try{
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/routine/my-diary/delete/${this.props.story._id}/${this.props.username}`, {
				method:'DELETE',
				credentials:'include'
			});
			const parsedResponse = await response.json();
			if(parsedResponse.status === 200){
				this.setState({
					message:parsedResponse.message
				});
				this.props.handleDiaries()
			}else{
				this.setState({
					message:parsedResponse.message
				})
			}
		}catch(err){
			console.log(err)
		}
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