import React, {Component} from 'react';
import Story from '../Story'

class DiaryList  extends Component {
	constructor(props){
		super(props);
		this.state = {
			stories:props.diaryStories
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