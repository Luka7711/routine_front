import React, {Component} from 'react';
import Story from '../Story'

class DiaryList  extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: props.username
		}
	}

	//take username in state
	//make fetch call to get list of diaries

	componentDidMount(){
		this.handleDiaries();
	}

	handleDiaries = async() => {
		try{
			const response = await('http://localhost:9000/routine/diary', {
				method:'GET',
				credentials:'include'
			})

			const parsedResponse = await response.json();

		}catch(err){

		}
	}

	render(){
		const allStories = this.state.stories.map((item, i) => {
			return (
				<Story key={i} story={item} storyId={this.props.storyId}/>
			)
		}) 
		return(
			<div>
				<h1>Diary Stories</h1>
				{allStories? allStories :'loading'}
			</div>	
		)
	}
}

export default DiaryList