import React, {Component} from 'react';
import Story from '../Story';
import ContactList from '../ContactList';
import Messenger from '../Messenger';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'; 

const style={
	img: {
		backgroundSize:"cover", 
		backgroungPosition:"center",
		width:"2.5rem", 
		height:"2.5rem", 
		borderRadius:"50%"
	},
	username: {
		color:"lightgrey", 
		padding:"10px 0 0 10px", 
		color:"#202428"
	},
	contactList: {
		backgroundColor:"#f8f9fa",
		height:"65vh",
		padding:0,
		overflowY:'scroll'
	},
	avatarContainer: {
		width:"100%", 
		padding:"10px", 
		backgroundColor:"#f9c132"
	}
}

class Chat  extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: props.username,
			contactList: props.contactList
		}
	}
	
	render(){
		return(
		<Router>
				<div className="row container-fluid justify-content-center paddingTop">
					<div className="col-lg-3" style={style.contactList}>
						<div className="user_avatar_container" style={style.avatarContainer}>
							<img key="2" alt="not found" src={`${process.env.REACT_APP_BACKEND_URL}/auth/user-avatar/${this.state.username}`} style={style.img} />
							<span style={style.username}>{this.state.username}</span>
						</div>
						{ this.state.contactList ? <ContactList contactList={this.state.contactList}/> : null }
					</div>
					
					<Switch>
						<Route path='/message-container/:number' 
								render={(props) => <Messenger {...props} contactList={this.state.contactList} currentUser={this.state.username} convoid={props.match.params.number}/>}
						/>
					</Switch>
				</div>

		</Router>
		)
	}
}

export default Chat