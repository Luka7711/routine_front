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
					<li>luka</li>
					<li>jim</li>
					<li>hana</li>
				</ul>
			</div>
		)
	}
}

export default MessageContacts