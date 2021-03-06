import React, {Component} from 'react'
import './index.css';
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
			currentUser:props.currentUser
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

	handleMessage = async() => { 
    //1. make post request to server
    //2. pull up all messages from server
    try{
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + 
        '/message/' + this.state.currentUser + '/' + this.state.foundUser, {
         
          method:"POST",
          credentials:"include",
          body: JSON.stringify(),
          headers:{
          'Content-Type': 'application/json'
          }
       });
      
      const parsedResponse = await response.json();
      console.log(parsedResponse)
       this.setState({
          conversationId: parsedResponse.conversationData,
          showMessage:true
       })
    }catch(err){
      console.log("something went wrong")
    }
   
  }

	

	render(){
		this.handleUserProfile();
				let profile = 
					[<>
						<div class="img_wrapper"><img key="1" alt="not found" className="user_image" src={`${process.env.REACT_APP_BACKEND_URL}/auth/user-avatar/${this.props.foundUser}`}/></div>
						<div className="profile">
							<h5 key="2">{this.props.foundUser}</h5>
							<p className="pointer" key="3"><FontAwesomeIcon icon={faPlus} size="sm"/> add friend</p>
							<p className="pointer" key="4" onClick={this.handleMessage}><FontAwesomeIcon icon={faFeather} size="sm"/> send message</p>
						</div>
					</>
					]
		return(
			<div className="row profile_wrapper">
				
				<div className="col-lg-6 profile">
					{this.state.showProfile? profile : null}
				</div>
				
				{this.state.showMessage ?
					<div className="col-lg-6 card rounded message_container">
						<Messages closeMessage={this.closeMessage} foundUser={this.props.foundUser} conversationId={this.state.conversationId} currentUser={this.state.currentUser}/>
					</div>
					: null
				}
				
			</div>
		)
	}
}

export default SearchProfile