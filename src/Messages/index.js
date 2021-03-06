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
	const [messages, setMessages] = useState([]);

	//retrieve data when Message container is bein rendered
	let getData = async() => {
		try{		
			let response = await fetch(process.env.REACT_APP_BACKEND_URL + 
				"/message/my-conversation/" + conversationId, {
					
					method:"GET",
					credentials:'include'
				});

			let parsedResponse = await response.json();
			//all message being pulled from contacts chat
			setMessages(parsedResponse.messages);
		}catch(err){
			console.log(err);
		}
	}
	
	// if messages has been sent update the messages
	// pull up all messages when component is rendered
	useEffect(() => {
		getData();
	}, []);

	socket.once("messages", (msg) => {
		getData()
	})

	// senging message to server
	let handleSubmit = async(e) => {
		
		e.preventDefault();
		
		try{
			if(text.length !== 0 ){
				
				socket.emit("messages", text);
				const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/message/texting/" + currentUser + "/" + conversationId, {
					
					method:"POST",
					credentials:"include",
					body:JSON.stringify({text:text}),
					
					headers:{
						"Content-type":"application/json"
					}
				});
				//sending typed text to server through socket;
				await setText("");
				await getData();
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
				<FontAwesomeIcon icon={faTimes} size="lg" onClick={closeMessage} className="closingIcon"/>
				<p><FontAwesomeIcon icon={faUserAstronaut} className="astronautIcon"/> chat with: {foundUser} <span style={{color:"green", fontStyle:"italic"}}>typing...</span></p>
				
				<div className="message_content rounded">					
					<MessageContainer messages={messages}/> 
				</div>	

				<form onSubmit={handleSubmit} className="messageForm">
					<div className="row">
						<div className="col-lg-10 col-md-4 col-sm-6 col-xs-6">
							<input id="message_input" className="form-control no-border" type="text" value={text} name="text" onChange={handleChange}/>
						</div>
						<div className="col-lg-2 col-md-4 col-sm-6 col-xs6">
							<button className="btn btn-success sm"><FontAwesomeIcon icon={faPaperPlane}/></button>
						</div>
					</div>
				</form>
			</>/*col-lg7*/
		)
}
