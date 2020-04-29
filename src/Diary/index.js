import React from 'react';
import DiaryForm from '../DiaryForm';

const Diary = (props) => {
	return(
		<div className="row paddingTop container justify-content-center">
			<div className="col-lg-4">
				<img id="write_image" src="https://images.unsplash.com/photo-1510922903530-28ecf3f00362?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"alt="image"/>
			</div>
			
			<div className="col-lg-6">
				<DiaryForm name={props.name} handleDiary={props.handleDiary}/>
			</div>
		</div>
	)
}

export default Diary