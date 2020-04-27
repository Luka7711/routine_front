import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SearchResult extends Component{
	render(){
		let output;
		if(this.props.foundUser){
			output = <Link className="nav-item" to="/search-for"><li className="nav-link" style={{backgroundColor:"orange", borderRadius:"5px"}}> {this.props.foundUser}</li></Link>
		}else{
			output = <li className="nav-link">User not found</li>
		}
		return(
				<>
					{output}
				</>
		)
	}
}

export default SearchResult