import React, {Component} from 'react';

class MessageContainer extends Component{
	constructor(){
		super();
		this.state = {
			messages:[]
		}
	}render(){
		return(
			<div>
				<ul>
					<li>Hey, how are you?</li>
					<li>yo I am good</li>
				</ul>
			</div>
		)
	}
}

export default MessageContainer