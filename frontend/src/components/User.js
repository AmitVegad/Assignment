import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiCall from '../helper/apiCall'
import Card from './card/Card'

function User() {
    const [user,setUser] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        apiCall({path:"http://localhost:3000/user"}).then((res)=>{
            if(res?.status){
                setUser(res?.data)
            }
        }).catch((err)=>{
            console.log(err);
        })
    },[])
    
      const deleteUser = (id) => {
        apiCall({path:`http://localhost:3000/user/delete/${id}`, method:"delete"}).then((res)=>{
          if(res?.status){
             const filterUser = user.filter((i)=> i._id !== id)
             setUser(filterUser)
          }
      }).catch((err)=>{
          console.log(err);
      })
      }

      const editUser = (userDetail) => {
        navigate("/edituser", { state: { user: userDetail } })
      }

      const Adduser = () => {
        navigate("/adduser")
      }

  return (
    <>
    User
    <div><button onClick={Adduser}>Add User</button></div>
    {user.map((_user, index)=><Card key={index} userDetail={_user} editUser={editUser} deleteUser={deleteUser}/>)}
    </>
  )
}

export default User