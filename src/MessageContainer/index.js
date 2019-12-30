import React, {Component} from 'react';
import openSocket from 'socket.io-client';
export const socket = openSocket(process.env.REACT_APP_BACKEND_URL);


class MessageContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			messages: props.message,
			count: 0
		}

		this.updateMessages = this.updateMessages.bind(this)
	}

	updateMessages =()=>{
		this.setState({
			count: this.state.count+1
		})
		let counter = setInterval(this.updateMessages, 1000);
	}

	render(){
		const conversation = this.state.messages.map((item, i) => {
			return (
				<li key={i} style={{color:"lightgrey"}}>
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