import React, {Component} from 'react'

class DiaryForm extends Component{
	constructor(props){
		super(props);
		this.state = {
			date:'',
			title:'',
			about:''
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

			const response = await fetch('http://localhost:9000/routine/diary', {
				method:'POST',
				credentials:'include',
				body: JSON.stringify(this.state),
				headers:{
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await response.json();
			console.log(parsedResponse.message)
		}catch(err){
			console.log(err, "this is err")
		}
	}

	render(){
		return(
			<div>
				<div>
					<p>Horoscope:</p>
					<form onSubmit={this.handleSumbit}>
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