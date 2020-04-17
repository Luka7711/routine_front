import React, {useState} from 'react'

const style={
	img: {
		backgroundSize:"cover", 
		backgroungPosition:"center",
		width:"2.5rem", 
		height:"2.5rem", 
		borderTopRighRadius:"50%"
	},
	username: {
		color:"lightgrey", 
		padding:"10px 0 0 10px", 
		color:"#202428"
	},
	avatarContainer: {
		width:"100%", 
		padding:"10px",
		cursor:"pointer"
	},
	message:{
		marginBottom:"0",
		fontSize:"14px",
		color:"grey"
	}
}

export default({contactList}) => {
	let str;
	let contacts = contactList.map((contact,i) => {
		str = contact.messages[0].text
		if(str.length >= 25){
			str = str.substr(0, str.length-5);
			str=str+"..."
		}
		return <div className="user_avatar_container list_hover" style={style.avatarContainer}>
					<img key={i} alt="not found" src={contact.url} style={style.img}/>
			   		<span style={style.username}>{contact.username}</span>
			   		<p style={style.message}>{str}</p>
			   </div>
	})

	return (<>
				{contacts}
		   </>)
}