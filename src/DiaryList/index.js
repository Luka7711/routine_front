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
			const response = await fetch('http://localhost:9000/routine/diary/' + this.state.username, {
				method:'GET',
				credentials:'include'
			})

			const parsedResponse = await response.json();
			console.log('alksnfksdngkjnfdgkjndfkgjn');
			console.log(parsedResponse)
			if(parsedResponse.status === 200){
				this.setState({
					stories: parsedResponse.data.diaryStory,
					message:parsedResponse.message
				});
				console.log('parsed Response')
				console.log(parsedResponse)
			}else{
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
		console.log(this.state)
		if(this.state.stories){
			var allStories = this.state.stories.map((item, i) => {
				return (
					<Story key={i} story={item} storyId={this.props.storyId}/>
				)
			}) 
		}
		return(
			<div>
				<h1>Diary Stories</h1>
				{this.state.stories? allStories :'loading'}
			</div>	
		)
	}
}

export default DiaryList