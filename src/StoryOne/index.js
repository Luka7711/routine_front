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
			const response = await fetch('http://localhost:9000/routine/diary/' + number, {
				method:'GET',
				credentials:'include'
			})
			const parsedResponse = await response.json();
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