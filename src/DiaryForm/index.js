import React, {Component} from 'react'

class DiaryForm extends Component{
	constructor(){
		super();
		this.state = {
			date:'',
			title:'',
			about:''
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
							<input type="text" onChange={this.hanleChange} name="title"/>
						</label>
						<label>
							About:
							<textarea type="text" rows="20" cols="100" onChange={this.handleChange} name="about">
								Your thoughts ...
							</textarea>
						</label>
					</form>
				</div>
			</div>
		)
	}
}

export default DiaryForm