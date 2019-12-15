import React, {Component} from 'react'
import MessageContainer from '../MessageContainer';

class Messages extends Component{
	constructor(){
		super();
		this.state = {
			receivers:[],
			message:'',
			typing:false
		}
	}
	
	handleChange = (e) => {
		this.setState({
			message:e.target.value
		})
	}

	closeWindow = () => {
		this.props.closeChatWindow()
	}

	handleSubmit = async(e) => {
		e.preventDefault();
		try{
			
		}catch(err){
			console.log('something went wrong')
		}
	}
	render(){
		console.log(this.state)
		return(
			<div className="messageWindow">
				<span onClick={this.closeWindow}>x</span>
				<h2>Message to:</h2>
				<h3>{this.props.foundUser}</h3>
				<MessageContainer/>
				<form onSubmit={this.handleSubmit}>
					<input type="text" placeholder="Type here ..." onChange={this.handleChange}/>
					<button>send</button>
				</form>
			</div>
		)
	}
}

export default Messages