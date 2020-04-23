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
		backgroundColor:"#ffffff",
		height:"65vh",
		padding:0,
		borderRadius:'5px',
		overflowY:'scroll'
	},
	avatarContainer: {
		width:"100%", 
		padding:"10px", 
		backgroundColor:"#f9c132", 
		borderRadius:"5px"
	}
}

class Chat  extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: props.username,
			contactList: props.contactList,
			message:'',
			currentUser:'mike',
			foundUser:'luka',
			conversationId:'5e9e87d1be14ed7d3add50d5'
		}
	}

	componentDidMount(){
		this.handleDiaries();
	}

	handleDiaries = async() => {
		try{
			const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/routine/diary/' + this.state.username, {
				method:'GET',
				credentials:'include'
			})

			const parsedResponse = await response.json();
			if(parsedResponse.status === 200){
				this.setState({
					stories: parsedResponse.data.diaryStory,
					message:parsedResponse.message
				});
			}else{
				console.log('something went wrong')
				this.setState({
					message:parsedResponse.message
				})
			}
		}catch(err){
			this.setState({
				message:'Whole request are shit'
			})
		}
	}

	/*<div className="col-lg-7 stories_container">
						<h4 className="grey">Diary Stories</h4>
						{this.state.stories? allStories :'loading'}
	</div>
	*/
	render(){
		if(this.state.stories){
			var allStories = this.state.stories.map((item, i) => {
				return (
					<Story key={i} story={item} storyId={this.props.storyId} handleDiaries={this.handleDiaries} username={this.state.username}/>
				)
			}) 
		}
		return(
		<Router>
			<div className="col-lg-12">
				<div className="row">
					<div className="col-lg-3" style={style.contactList}>
						<div className="user_avatar_container" style={style.avatarContainer}>
							<img key="2" alt="not found" src={`${process.env.REACT_APP_BACKEND_URL}/auth/user-avatar/${this.state.username}`} style={style.img} />
							<span style={style.username}>{this.state.username}</span>
						</div>
						{ this.state.contactList ? <ContactList contactList={this.state.contactList}/> : null }
					</div>
					
					<Switch>
						<Route path='/message-container/:number' 
								render={(props) => <Messenger {...props} currentUser={this.state.username} convoid={props.match.params.number}/>}
						/>
					</Switch>
				</div>
			</div>	
		</Router>
		)
	}
}

export default Chat