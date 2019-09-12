import React, {Component} from 'react';

class DiaryEditForm extends Component{
	constructor(){
		super();
		this.state = {
			showForm:false,
			message:''
		}
	}

	componentDidMount(){
		this.getDiaryValues();
	}

	getDiaryValues = async() => {
		try{
			const response = await fetch(`http://localhost:9000/routine/mydiary/${this.props.match.params.number}`, {
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

	render(){
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