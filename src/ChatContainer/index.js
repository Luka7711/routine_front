import React, {useState, useEffect} from 'react';
import openSocket from 'socket.io-client';
import ReactDOM from 'react-dom';
export const socket = openSocket(process.env.REACT_APP_BACKEND_URL);

export default ({msgs, convoid}) => {
	/* filter(return messages of 
	current user with chosen contact) the array of the objects 
	*/
	let  messageContent = msgs.map((msg, i) => {
		if(msg.messages[0].conversationId == convoid){
			let actualMessage = msg.messages.map((message, k) => {
				return <li key={k}>{message.text}</li>
			})
			return actualMessage;
		}
	})

	return(
			<>
				<ul>
				 	{ messageContent }
				</ul>
			</>
		)
}

