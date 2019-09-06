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
		console.log(this.state.stories)
		const allStories = this.state.stories.map((item, i) => {
			console.log(item)
			return (
				<Story key={i} story={item}/>
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