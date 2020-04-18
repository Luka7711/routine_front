import React, {useState, useEffect} from 'react';
import openSocket from 'socket.io-client';
import ReactDOM from 'react-dom';
import { componentWillAppendToBody } from "react-append-to-body";
export const socket = openSocket(process.env.REACT_APP_BACKEND_URL);

export default ({messages}) => {

	let messageContent;
	if(messages){
		messageContent = messages.map((msg, i) => {
			return	 <li key={i}>{msg.text}</li>
		})
	}
	return (
			<div>
				<ul id="text_container">
					{messageContent}
				</ul>
			</div>
		)
}

