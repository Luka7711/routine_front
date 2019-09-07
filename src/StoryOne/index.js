import React, {Component} from 'react';


class StoryOne extends Component{
	constructor(){
		super();
		this.state = {

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