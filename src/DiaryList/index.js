import React from 'react';
import Story from '../Story'

const DiaryList = (props) => {
	return(
		<div>
			<h1>Diary Stories</h1>
			{props.diaryStories.map((item, i) => 
				<Story key={i} item={item}/>
			)}
		</div>
	)
}

export default DiaryList