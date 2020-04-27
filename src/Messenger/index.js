import React, {useState, useEffect} from 'react';
import ChatContainer from '../ChatContainer';
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

export default (({contactList, currentUser, convoid}) => {
	const [messages, setMessages]   = useState(contactList);
	const [foundUser, setFoundUser] = useState("luka");
	const [text, setText] 			= useState('');

	const getMessages = async() => {
    	try{
     		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/message/contact-list/${currentUser}`, {
       			method:"GET",
        		credentials:"include"
      		})
    		const parsedResponse = await response.json();
     		 
     		if(parsedResponse.status === 200){
       			 setMessages(parsedResponse.data)
      		}
    	} catch(err) {
      		console.log(err);
   		}
	}

	socket.on("messages", () => {
		//if message has been sent or received update messages
		return getMessages();
	});

	const handleSubmit = async(e) => {
		
		e.preventDefault();
		
		try {
			/* if text value is not empty string: 
				Save message in data base sending POST req
				Clear input field 
				Update messages  
			*/
			if(text.length !== 0 ) {
				
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
				await getMessages();
			}			
		} catch(err) {
			console.log(err);
		}
	}

	const handleChange = (e) => {
		// Set text with value from input field 
		setText(e.target.value);
	}

	return 	<div className="col-lg-7" style={style.messageContainer}>
				<p><FontAwesomeIcon icon={faUserAstronaut} className="astronautIcon"/> chat with: {foundUser} <span style={{color:"green", fontStyle:"italic"}}>typing...</span></p>
				<div className="message_content rounded">					
					<ChatContainer msgs={messages} convoid={convoid}/> 
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