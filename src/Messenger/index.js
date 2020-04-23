import React, {useState, useEffect} from 'react';
import MessageContainer from '../MessageContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import openSocket from 'socket.io-client';
export const socket = openSocket(process.env.REACT_APP_BACKEND_URL);


const style = {
	messageContainer: {
		backgroundColor:'white',
		borderRadius:'10xp'
	}
}

export default (({currentUser, convoid}) => {
	const [messages, setMessages]   = useState([]);
	const [foundUser, setFoundUser] = useState("luka");
	const [text, setText] 			= useState('');

	const allMessages = async() => {
		
		try{
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/message/my-conversation/${convoid}`, {
				method:"GET",
				credentials:"include"
			})

			const parsedResponse = await response.json();
			setMessages(parsedResponse.messages)
		}
		catch(err){
			console.log(err);
		}
	}

	useEffect(() => {
		allMessages();			
	}, []);

	socket.on("messages", () => {
		return allMessages()
	});

	const handleSubmit = async(e) => {
		
		e.preventDefault();
		
		try{
			if(text.length !== 0 ){
				
				socket.emit("messages", text);
				const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/message/texting/" + currentUser + "/" + convoid, {
					
					method:"POST",
					credentials:"include",
					body:JSON.stringify({text:text}),
					
					headers:{
						"Content-type":"application/json"
					}
				});
				//sending typed text to server through socket;
				await setText("");
				await allMessages();
			}			
		}
		catch(err){
			console.log(err);
		}
	}

	const handleChange = (e) => {
		setText(e.target.value);
	}

	const closeMessage = () => {
		console.log("close message")
	}

	socket.on("messages", () => {
		console.log("message")
	})

	return 	<div className="col-lg-7" style={style.messageContainer}>
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
			</div>
}) 