import React, { Component } from 'react';
import Diary from '../Diary'

class Home extends Component {
	constructor(){
		super();
		this.state = {

		}
	}

	render(){
		return(
			<div>
				<Diary/>
			</div>
		)
	}
}

export default Home