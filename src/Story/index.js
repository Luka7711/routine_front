import React from 'react'

const Story = (props) => {
	let stories = props.story.map((item, i) =>{
		return(
			<div key={i}>
				<ul>
					<li key={i}>{item.title}</li>
				</ul>
			</div>
		)
	});
	return(
		<div>
			{stories}
		</div>
	)
}

export default Story