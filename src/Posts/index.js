import React, {Component} from 'react';
import Story from '../Story';
import ContactList from '../ContactList';
import Messenger from '../Messenger';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'; 
import loadIcon from '../img/loading.gif';

class Posts  extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: props.username
		}
	}

	componentDidMount(){
		this.handleDiaries();
	}

	handleDiaries = async() => {
		try{
			const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/routine/diary/' + this.state.username, {
				method:'GET',
				credentials:'include'
			})

			const parsedResponse = await response.json();
			if(parsedResponse.status === 200){
				this.setState({
					stories: parsedResponse.data.diaryStory,
					message:parsedResponse.message
				});
			}else{
				console.log('something went wrong')
				this.setState({
					message:parsedResponse.message
				})
			}
		}catch(err){
			this.setState({
				message:'Whole request are shit'
			})
		}
	}

	
	render(){
		if(this.state.stories){
			var allStories = this.state.stories.map((item, i) => {
				return (
					<Story key={i} story={item} storyId={this.props.storyId} handleDiaries={this.handleDiaries} username={this.state.username}/>
				)
			}) 
		}

		let loading = <img id="loading_icon" src={loadIcon} alt="loading icon"/>
					  
		return(
				<div className="row container-fluid paddingTop">
					<div className="col-lg-6 stories_container">
						{this.state.stories ? allStories : loading}
					</div>
				</div>
		)
	}
}

export default Posts