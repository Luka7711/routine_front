import React from 'react'

const Story = (props) => {
	console.log(props.item)
	return(
		<div>
			<ul>
				<li>{props.item.about}</li>
			</ul>
		</div>
	)
}

export default Story