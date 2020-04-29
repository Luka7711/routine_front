import React from 'react';
import Diary from '../Diary'

const Home = (props) =>{
		return(
			<>
				<Diary name={props.name} handleDiary={props.handleDiary}/>
			</>
		)
}

export default Home