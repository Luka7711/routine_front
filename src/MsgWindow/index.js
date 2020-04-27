import React, {useState, useEffect} from 'react';
import openSocket from 'socket.io-client';
import ReactDOM from 'react-dom';
export const socket = openSocket(process.env.REACT_APP_BACKEND_URL);

export default ({messages, convoid}) => {
	let messageContent = messages.map((msg, i) => {
			return	 <li key={i}>{msg.text}</li>
		})

	useEffect(()=>{
		console.log("hello")
	}, [])
	return (
			<div>
				<ul id="text_container">
					{messageContent}
				</ul>
			</div>
		)
}
