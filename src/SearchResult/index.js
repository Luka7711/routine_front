import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SearchResult extends Component{
	render(){
		let output;
		if(this.props.foundUser){
			output = <Link to="/search-for"><li className="nav-link">{this.props.foundUser}</li></Link>
		}else{
			output = <li className="nav-link">User not found</li>
		}
		return(
			<div>
				<ul>
					{output}
				</ul>
			</div>
		)
	}
}

export default SearchResult