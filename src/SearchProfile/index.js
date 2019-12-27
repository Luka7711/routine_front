import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import Messages from '../Messages';

class SearchProfile extends Component{
	constructor(props){
		super(props);
		this.state = {
			showProfile:false,
			foundUser:props.foundUser,
			showMessage:false
		}
	}

	componentWillUnmount(){
		this.setState({
			showProfile:false,
			diaryStories:'',
			foundUser:''
		})
	}

	  //if page on search-for url, do not change content of searchProfile
	  //else if page not search-for pass all data and show profile component 

	handleUserProfile = async() => {
		try{	
			const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/auth/users/' + this.props.foundUser, {
				method:'GET',
				credentials:'include'
			});
			const parsedResponse = await response.json();
			if(parsedResponse.status == 200){
				this.setState({
					diaryStories: parsedResponse.stories.diaryStory,
					showProfile:true
				})
			}else if(parsedResponse.status == 404){
				this.setState({
					showProfile:false
				})
			}
		}catch(err){
			console.log('something went wrong')
		}
	}

	handleMessage = () => {
		this.setState({
			showMessage:true
		})
	}

	closeMessage = () => {
		this.setState({
			showMessage:false
		})
	}
	

	render(){
		// <Messages closeChatWindow={this.closeChatWindow} foundUser={this.state.foundUser} conversationId={this.state.conversationId} currentUser={this.state.username}/> 

		{this.handleUserProfile()}
		let profile;
		if(this.state.diaryStories){
			if(this.state.diaryStories.length >= 1){
				profile = 
					[
					<img key="1" alt="not found" src={`http://localhost:9000/auth/user-avatar/${this.props.foundUser}`}/>,
					<h4 key="2">{this.props.foundUser}</h4>,
					<p className="pointer" key="3"><FontAwesomeIcon icon={faPlus} size="md"/> add friend</p>,
					<p className="pointer" key="4" onClick={this.handleMessage}><FontAwesomeIcon icon={faFeather} size="md"/> send message</p>
				]
			}else{
				profile = <p>no blogs yet</p>
			}

		}
		return(
			<div className="row profilePage">
				<div className="grey col-lg-6">
					{this.state.showProfile? profile : 'loading'}
				</div>
				{this.state.showMessage ?
					<div className="col-lg-5 card rounded message_container">
						<Messages closeMessage={this.closeMessage} closeChatWindow={this.props.closeChatWindow} foundUser={this.props.foundUser} conversationId={this.props.conversationId} currentUser={this.props.username}/>
					</div>
					: null
				}
				
			</div>
		)
	}
}

export default SearchProfile