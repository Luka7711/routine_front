import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
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
		this.props.closeMessage();
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
		console.log('sending messages from client');
	}

	componentWillUmount(){
		this.setState({
			messages:'',
			text:'',
			conversationId:''
		})
	}
	render(){
		return(
			<>	
				<FontAwesomeIcon icon={faTimes} size="lg" onClick={this.closeWindow} className="closingIcon"/>
				<h5><FontAwesomeIcon icon={faUserAstronaut} className="astronautIcon"/> {this.props.foundUser}</h5>
				<div className="message_content rounded">	
					{this.state.message? <MessageContainer message={this.state.message} allMessages={this.allMessages}/> : null}
				</div>	
				<form onSubmit={this.handleSubmit} className="messageForm">
					<div className="row">
						<div className="col-lg-10">
							<input className="form-control no-border" type="text" name="text" placeholder="Write a message ..." onChange={this.handleChange}/>
						</div>
						<div className="col-lg-2">
							<button className="btn btn-success sm"><FontAwesomeIcon icon={faPaperPlane}/></button>
						</div>
					</div>
				</form>
			</>
		)
	}
}

export default Messages