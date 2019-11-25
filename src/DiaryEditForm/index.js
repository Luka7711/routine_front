import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class DiaryEditForm extends Component{
	constructor(){
		super();
		this.state = {
			showForm:false,
			message:'',
			redirect:false
		}
	}

	componentDidMount(){
		this.getDiaryValues();
	}

	getDiaryValues = async() => {
		try{
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/routine/my-diary/${this.props.match.params.number}`, {
				method: 'GET',
				credentials: 'include'
			});
			
			const parsedResponse = await response.json();
			if(parsedResponse.status === 200){
				this.setState({
					date:parsedResponse.data.date,
					title:parsedResponse.data.title,
					about:parsedResponse.data.about,
					message:parsedResponse.message,
					showForm:true
				});
			}else{
				this.setState({
					message:parsedResponse.message
				})
			}
		}catch(err){
			this.setState({
				message:'Nothin works dude'
			})
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.currentTarget.name]: event.currentTarget.value 
		})
	}

	handleSubmit = async(e) => {
		e.preventDefault();
		try{
			const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/routine/my-diary/edit/'+this.props.match.params.number, {
				method:'PUT',
				credentials:'include',
				body:JSON.stringify(this.state),
				headers:{
					'Content-Type':'application/json'
				}
			});
			const parsedResponse = await response.json();
			if(parsedResponse.status === 200){
				this.setState({
					showForm:false,
					redirect:true,
					message: parsedResponse.message
				})
			}else{
				this.setState({
					message:parsedResponse.message
				})
			}
		}catch(err){
			console.log(err);
		}
	}

	render(){
		if(this.state.redirect === true){
			return <Redirect to={`/diary-story/${this.props.match.params.number}`}/>
		};
		let editForm;
		if(this.state.showForm){
			return (
				editForm = <form onSubmit={this.handleSubmit}>
					<label>Date:</label>
					<input type="date" name="date" value={this.state.date} onChange={this.handleChange}/>
					<label>Title:</label>
					<input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
					<label>About:</label>
					<textarea type="text" name="about" value={this.state.about} onChange={this.handleChange}/>
					<input type="submit" value="update"/>
				</form>
			)
		}
		return(
			<div>
				{this.state.showForm ? editForm : null}
			</div>	
		)
	}
}

export default DiaryEditForm