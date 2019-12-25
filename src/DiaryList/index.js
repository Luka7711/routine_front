import React, {Component} from 'react';
import Story from '../Story'

class DiaryList  extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: props.username,
			message:''
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
			console.log(parsedResponse);
			if(parsedResponse.status === 200){
				console.log('successful request')
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
		return(
			<div>
				<img key="2" alt="not found" src={`http://localhost:9000/auth/user-avatar/${this.state.username}`}/>
				<h3>{this.state.username}</h3>
				<h2>Diary Stories</h2>
				{this.state.stories? allStories :'loading'}
			</div>	
		)
	}
}

export default DiaryList