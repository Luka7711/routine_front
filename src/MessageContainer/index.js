import React, {Component} from 'react';
import openSocket from 'socket.io-client';
export const socket = openSocket(process.env.REACT_APP_BACKEND_URL);


class MessageContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			messages: props.message
		}

	}render(){
		console.log("message container")
		console.log(this.state);
		const conversation = this.state.messages.map((item, i) => {
			return (
				<li key={i}>
					{item.text}
				</li>
			)
		})
		return(
			<div>
				<ul>
					{conversation}
				</ul>
			</div>
		)
	}
}

export default MessageContainer