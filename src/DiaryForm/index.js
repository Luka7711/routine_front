import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'

class DiaryForm extends Component{
	constructor(props){
		super(props);
		this.state = {
			date:'',
			title:'',
			about:'',
			username:props.name,
			redirect:false,
			diaryStories:[]
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
		console.log(this.state)
	}

	handleSubmit = async(e) => {
		e.preventDefault();
		try{
			let response = await fetch(process.env.REACT_APP_BACKEND_URL+'/routine/diary/' + this.state.username, {
				method:'POST',
				credentials:'include',
				body: JSON.stringify(this.state),
				headers:{
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await response.json();
			
			if(parsedResponse.status === 200){
				let userStories = [];
				await parsedResponse.data.diaryStory.map(data => userStories.push(data))
				this.setState({
					diaryStories:[userStories]
				})
				this.props.handleDiary(this.state.diaryStories);
				
				this.setState({
					redirect:true
				})
			}
		}catch(err){
			console.log(err, "this is err")
		}
	}

	render(){
		if(this.state.redirect === true){
			return <Redirect to='/profile'/>
		}
		return(
			<div>
				<div>
					<p>Horoscope:</p>
					<form onSubmit={this.handleSubmit}>
						<label> Date:
							<input type="date" name="date" onChange={this.handleChange}/>
						</label>
						<label>Title:
							<input type="text" onChange={this.handleChange} name="title"/>
						</label>
						<label>
							About:
							<textarea type="text" rows="20" cols="100" onChange={this.handleChange} name="about" defaultValue="your thoughts">
							</textarea>
						</label>
						<button>submit</button>
					</form>
				</div>
			</div>
		)
	}
}

export default DiaryForm