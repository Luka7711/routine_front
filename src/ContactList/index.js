import React, {useState} from 'react'

const style={
	img: {
		backgroundSize:"cover", 
		backgroungPosition:"center",
		width:"2.5rem", 
		height:"2.5rem", 
		borderRadius:"50%"
	},
	username: {
		color:"lightgrey", 
		padding:"10px 0 0 10px", 
		color:"#202428"
	},
	avatarContainer: {
		width:"100%", 
		padding:"10px"
	},
	message:{
		marginBottom:"0",
		fontSize:"14px",
		color:"grey"
	}
}

export default({contactList}) => {
	let contacts = contactList.map((contact,i) => {
		return <div className="user_avatar_container" style={style.avatarContainer}>
					<img key={i} alt="not found" src={contact.url} style={style.img}/>
			   		<span style={style.username}>{contact.username}</span>
			   		<p style={style.message}>{contact.messages[0].text}</p>
			   </div>
	})

	return (<>
				{contacts}
		   </>)
}