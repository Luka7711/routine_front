import React, {Component} from 'react';


class StoryOne extends Component{
	constructor(){
		super();
		this.state = {

		}
	}

	componentDidMount(){
		this.showStory(this.props.match.params.number)
	}

	showStory = async(number) => {
		try{
			const response = await('http://localhost:9000/diary/' + number, {

			})
		}catch(err){
			console.log('something went wrong');
			console.log(err)
		}
	}


	render(){
		console.log(this.props.match.params.number)
		return(
			<div>
				<h1>Hello</h1>
				<h1>{this.props.match.params.number}</h1>
			</div>
		)
	}
	
}

export default StoryOne