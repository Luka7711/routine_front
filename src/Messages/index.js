import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import MessageContainer from '../MessageContainer';
import openSocket from 'socket.io-client';
export const socket = openSocket(process.env.REACT_APP_BACKEND_URL);


export default ({conversationId, currentUser, foundUser, closeMessage}) => {
	const [text, setText] = useState("");
	const [messages, setMessages] 	= useState([]);
	const [convoID, setConvoID] 	= useState(conversationId)
	//retrieve data when Message container is bein rendered
	let getData = async() => {
		try{
			if(convoID !== null){		
				let response = await fetch(process.env.REACT_APP_BACKEND_URL + 
					"/message/my-conversation/" + convoID, {
						method:"GET",
						credentials:'include'
					});
				let parsedResponse = await response.json();
				//all message being pulled from contacts chat
				setMessages(parsedResponse.messages);
			}
		}catch(err){
			console.log(err);
		}
	}
	//pull all messages between contacts when Messages 
	//component is rendered
	useEffect(() => {
		getData();	
	})

	//close MessageContainer 
	let closeWindow = () => {
		closeMessage();
	} 
	
	//need to add message to DB
	//update Message component
	let handleSubmit = async(e) => {
		e.preventDefault();
		try{
			if(text.length !== 0 ){

				socket.emit("messages", text);
				let date = new Date();
				const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/message/texting/" + currentUser + "/" + convoID, {
						method:"POST",
						credentials:"include",
						body:JSON.stringify({
						text:text,
						shipper:currentUser,
						receiver:foundUser,
						timestamp: date
						}),
						headers:{
							"Content-type":"application/json"
						}
				});
				setText("");
				const parsedResponse = await response.json();
				//sending typed text to server through socket;
				setConvoID(parsedResponse.convoID);
			}			
		}
		catch(err){
			console.log(err);
		}
	}
	//update text value when user is typing
	let handleChange = (e) => {
		setText(e.target.value);
	};

	return ( 
			<>
				<FontAwesomeIcon icon={faTimes} size="lg" onClick={closeWindow} className="closingIcon"/>
				<p><FontAwesomeIcon icon={faUserAstronaut} className="astronautIcon"/> chat with: {foundUser} <span style={{color:"green", fontStyle:"italic"}}>typing...</span></p>	
				<div className="message_content rounded">			
					<MessageContainer messages={messages}/> 
				</div>	
				{/*form element to send new message*/}
				<form onSubmit={handleSubmit} className="messageForm">
					<div className="row">
						<div className="col-lg-10 col-md-4 col-sm-6 col-xs-6">
							<input id="message_input" className="form-control no-border" type="text" value={text} name="text" onChange={handleChange} autoComplete="off"/>
						</div>
						<div className="col-lg-2 col-md-4 col-sm-6 col-xs6">
							<button className="btn btn-success sm"><FontAwesomeIcon icon={faPaperPlane}/></button>
						</div>
					</div>
				</form>
			</>
		)
}
