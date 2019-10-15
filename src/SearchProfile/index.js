import React, {Component} from 'react'

class SearchProfile extends Component{
	constructor(){
		super();
		this.state = {
			showProfile:false
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
			const response = await fetch('http://localhost:9000/auth/users/' + this.props.foundUser, {
				method:'GET',
				credentials:'include'
			});
			const parsedResponse = await response.json();
			if(parsedResponse.status == 200){
				this.setState({
					diaryStories: parsedResponse.stories.diaryStory,
					showProfile:true
				})
			}
		}catch(err){
			console.log('something went wrong')
		}
	}
	

	render(){
		{this.handleUserProfile()}
		let profile;
		if(this.state.diaryStories){
			if(this.state.diaryStories.length >= 1){
				profile = 
					[<h4 key="1">{this.props.foundUser}</h4>,
					<img key="2" src={`http://localhost:9000/auth/user-avatar/${this.props.foundUser}`}/>,
					<span key="3">add to friends</span>,
					<p key="4">{this.state.diaryStories[0].about}</p>
				]
			}else{
				profile = <p>no blogs yet</p>
			}

		}
		console.log(this.state)
		return(
			<div>
				<h1>Profile Page</h1>
				{this.state.showProfile? profile : 'loading'}
			</div>
		)
	}
}

export default SearchProfile