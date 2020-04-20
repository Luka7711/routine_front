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
			showMessage:false,
			currentUser:props.currentUser,
			num:1
		}
	}

	componentDidMount(){
		this.handleUserProfile();
	}

	componentWillUnmount(){
		this.setState({
			showProfile:false,
			diaryStories:'',
			foundUser:'',
			contactList:'',
			conversationId:''
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
			if(parsedResponse.status === 200){
				this.setState({
					diaryStories: parsedResponse.stories.diaryStory,
					showProfile:true
				})
			}else if(parsedResponse.status === 404){
				this.setState({
					showProfile:false
				})
			}
		}catch(err){
			console.log('something went wrong')
		}
	}

	closeMessage = () => {
		this.setState({
			showMessage:false
		})
	}

	showMessage = () => {
		this.setState({
			showMessage:true
		})
	}
	conversation = async() => { 
   		try{
      		const response = await fetch(process.env.REACT_APP_BACKEND_URL + 
        		'/message/receive-id/text/' + this.state.currentUser + '/' + this.state.foundUser, {
         		
         		 method:"GET",
          		 credentials:"include"
       		});
      		// get message list from DB 
    	    const parsedResponse = await response.json();
       		//add messages to state & show message container
       		this.setState({
       			conversationId:parsedResponse.conversationId
       		});
    	}
    	catch(err){
      		console.log("something went wrong")
    	} 
  	}


	render(){
			this.conversation()
				let profile = 
					[	<img key="1" alt="not found" src={`${process.env.REACT_APP_BACKEND_URL}/auth/user-avatar/${this.props.foundUser}`}/>,
						<div className="profile">
							<h5 key="2">{this.props.foundUser}</h5>
							<p className="pointer" key="3"><FontAwesomeIcon icon={faPlus} size="sm"/> add friend</p>
							<p className="pointer" key="4" onClick={this.showMessage}>
								<FontAwesomeIcon icon={faFeather} size="sm"/> send message
							</p>
						</div>
					]
		return(
			<div className="row profilePage">
				<div className="grey col-lg-6" style={{background:"#ffff", borderRadius:"5px"}}>
					{this.state.showProfile? profile : 'loading'}
				</div>
				{this.state.showMessage ?
					<div className="col-lg-5 card rounded message_container">
						<Messages conversationId={this.state.conversationId} closeMessage={this.closeMessage} foundUser={this.props.foundUser} currentUser={this.state.currentUser}/>
					</div>
					: null
				}
				
			</div>
		)
	}
}

export default SearchProfile