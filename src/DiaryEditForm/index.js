import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

const style = {
	textarea:{
		width:"100%",
		height:"9rem",
		borderRadius:"2px",
		border:'none',
		padding:"5px",
		fontFamily:'Helvetica'
	},
	forms:{
		width:"100%",
		borderRadius:"2px",
		border:'none',
		height:"3rem",
		padding:'5px',
		fontFamily:'Helvetica'
	},
	btn:{
		backgroundColor:"lightgrey",
		border:'none',
		borderRadius:'2px'
	}
}

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
			return <Redirect to="/posts"/>
		};
		let editForm;
		if(this.state.showForm){
			return (
				editForm = 
							<div className="col-lg-6 container">
								<form className="form" onSubmit={this.handleSubmit}>
									<div className="form-group">
										<div>
											<label>Date:</label>
											<input style={style.forms} type="date" name="date" value={this.state.date} onChange={this.handleChange}/>
										</div>	
										
										<div>
											<label>Title:</label>
											<input style={style.forms} type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
										</div>
										
										<div>
											<label>About:</label>
											<textarea style={style.textarea} type="text" name="about" value={this.state.about} onChange={this.handleChange}/>
										</div>
										<input style={style.btn} type="submit" value="update"/>
									</div>
								</form>
							</div>
			)
		}
		return(
			<div className="row">
					{this.state.showForm ? editForm : null}
			</div>
		)
	}
}

export default DiaryEditForm