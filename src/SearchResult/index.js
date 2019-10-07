import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SearchResult extends Component{
	constructor(){
		super();
		this.state={
			users:[]
		}
	}

	render(){
		return(
			<div>
				<ul>
					<li>A</li>
					<li>B</li>
					<li>C</li>
				</ul>
			</div>
		)
	}
}

export default SearchResult