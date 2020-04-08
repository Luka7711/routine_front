import React, {Component} from 'react';
import Story from '../Story'


class DiaryList  extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: props.username,
			message:''
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
			console.log(parsedResponse);
			if(parsedResponse.status === 200){
				console.log('successful request')
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

	render(){
		if(this.state.stories){
			var allStories = this.state.stories.map((item, i) => {
				return (
					<Story key={i} story={item} storyId={this.props.storyId} handleDiaries={this.handleDiaries} username={this.state.username}/>
				)
			}) 
		}
		return(
			<div className="col-lg-12">
				<div className="row">
					<div className="col-lg-5 text-center">
						<img key="2" alt="not found" src={`${process.env.REACT_APP_BACKEND_URL}/auth/user-avatar/${this.state.username}`} 
							style={{
									backgroundSize:"cover", 
									backgroungPosition:"center",
									width:"4rem", 
									height:"4rem", 
									borderRadius:"50%",
									backgroundImage:"url(https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg)"
							}}
						/>
						<h5>{this.state.username}</h5>
					</div>
				
					<div className="col-lg-7 stories_container">
						<h4 className="grey">Diary Stories</h4>
						{this.state.stories? allStories :'loading'}
					</div>
				</div>
			</div>	
		)
	}
}

export default DiaryList