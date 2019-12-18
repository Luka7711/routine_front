import React, {Component} from 'react'
import MessageContainer from '../MessageContainer';
import openSocket from 'socket.io-client';
export const socket = openSocket(process.env.REACT_APP_BACKEND_URL);

class Messages extends Component{
	constructor(props){
		super(props);
		this.state = {
			typing:false,
			conversationId:props.conversationId,
			currentUser: props.currentUser
		}
	}

	componentDidMount(){
		this.allMessages();
		socket.on('messages', (msg) => {
			this.allMessages()
		})
	}
	
	allMessages = async() => {
		try{
			const response = await fetch(process.env.REACT_APP_BACKEND_URL + 
				"/message/my-conversation/" + this.state.conversationId, {
						method:"GET",
						credentials:'include'
					});

			const parsedResponse = await response.json();
			this.setState({
				message:parsedResponse.messages
			})
		}catch(err){
			console.log("something went wrong")
		}
	}
	
	handleChange = (e) => {
		this.setState({
			text:e.target.value
		})
	}

	closeWindow = () => {
		this.props.closeChatWindow()
	}

	handleSubmit = async(e) => {
		e.preventDefault();
		try{
			const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/message/texting/" + this.state.currentUser + "/" +this.state.conversationId, {
				method:"POST",
				credentials:"include",
				body:JSON.stringify(this.state),
				headers:{
					"Content-Type":'application/json'
				}
			});
			const parsedResponse = await response.json()
			this.setState({
				message: [...this.state.message, parsedResponse.messages]
			})
			this.sendSocket();
		}catch(err){
			console.log('create message function wont work')
		}
	}

	sendSocket(){
		socket.emit('messages', this.state.messages);
		console.log('sending messages from client')
	}

	componentWillUmount(){
		this.setState({
			messages:'',
			text:'',
			conversationId:''
		})
	}
	render(){
		console.log(this.state)
		return(
			<div className="messageWindow">
				<span onClick={this.closeWindow}>x</span>
				<h2>Message to:</h2>
				<h3>{this.props.foundUser}</h3>
				{this.state.message? <MessageContainer message={this.state.message} allMessages={this.allMessages}/> : null}
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="text" placeholder="Type here ..." onChange={this.handleChange}/>
					<button>send</button>
				</form>
			</div>
		)
	}
}

export default Messages