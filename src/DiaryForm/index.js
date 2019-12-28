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
			<div className="col-lg-12">
				<div className="row">
					<div className="col-lg-6">
						<form className="form" onSubmit={this.handleSubmit}>
							<div className="form-group">
							<div>
								<label> Date:
									<input className="form-control" type="date" name="date" onChange={this.handleChange}/>
								</label>
							</div>
								<label>Title:
									<input className="form-control" type="text" onChange={this.handleChange} name="title" autoComplete="off"/>
								</label>
							</div>
							
							<label>
								About:
							<textarea className="form-control" type="text" rows="10" cols="100" onChange={this.handleChange} name="about" placeholder="Type here">
							</textarea>
							</label>
							<button className="btn btn-dark">submit</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default DiaryForm