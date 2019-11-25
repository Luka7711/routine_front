import React, {Component} from 'react';


class StoryOne extends Component{
	constructor(){
		super();
		this.state = {
			message:''
		}
	}

	componentDidMount(){
		this.showStory(this.props.match.params.number)
	}

	showStory = async(number) => {
		try{
			const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/routine/my-diary/' + number, {
				method:'GET',
				credentials:'include'
			})
			const parsedResponse = await response.json();
			console.log('parsed response')
			console.log(parsedResponse)
			if(parsedResponse.status === 200){
				this.setState({
					diaryStory:parsedResponse.data,
					message: parsedResponse.message
				})
				console.log(this.state)
			}else{
				this.setState({
					message:parsedResponse.message
				})
			}

		}catch(err){
			console.log('something went wrong');
			console.log(err)
		}
	}

	render(){
		let storyContent;
		if(this.state.diaryStory){
			 storyContent= 
				<ul> 
					<label>Date: <li>{this.state.diaryStory.date}</li></label>
					<label>Title: <li>{this.state.diaryStory.title}</li></label>
					<label>About: <li>{this.state.diaryStory.about}</li> </label>
				</ul>
		}
		return(
			<div>
				<ul>
					{storyContent}
				</ul>
			</div>
		)
	}
	
}

export default StoryOne