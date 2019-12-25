import React, {Component} from 'react'

class MessageContacts extends Component{
	constructor(){
		super();
		this.state = {

		}
	}render(){
		return(
			<div className="messageContacts">
				<h2>Contact list</h2>
				<ul>
					<li key={1}>luka</li>
					<li key={2}>jim</li>
					<li key={3}>hana</li>
				</ul>
			</div>
		)
	}
}

export default MessageContacts