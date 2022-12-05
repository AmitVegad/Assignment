import React from 'react'
import "./card.css"
import user from "../../images/user.jpg"
function Card({ userDetail, editUser, deleteUser }) {

  return (
    <div className="card">
      <img src={user} alt="Avatar" className='user-image' />
      <div className="container">
        <h4><b>{userDetail?.name}</b></h4>
        <p>{`+91 ${userDetail?.mobile_no}`}</p>
      </div>
      <div className="container">
        <button onClick={() => { editUser(userDetail) }}>Edit</button>
        <button onClick={() => { deleteUser(userDetail?._id) }}>Delete</button>
      </div>
    </div>
  )
}

export default Card