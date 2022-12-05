import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import apiCall from '../helper/apiCall';
// import { useHistory } from "react-router-dom";

function AddUser() {
    const [userDetail, setUserDetail] = useState({ name: "", mobile_no: "", password: "" })
    const [error, setError] = useState(false);
    const location = useLocation()
    const navigate = useNavigate();
    const isEdit = location.pathname === "/edituser"

    useEffect(() => {
        if (isEdit) {
            setUserDetail(location?.state?.user)
        }
    }, [location, isEdit])

    const onChange = (e, type) => {
        setError(false);
        setUserDetail(prev => ({ ...prev, [type]: e.target.value }))
    }

    const onAdd = () => {
        let inError = false;
        Object.keys(userDetail).forEach((i) => {
            if (userDetail[i] === "") {
                setError(true);
                inError = true;
            }
        })
        if (!inError) {
            apiCall({ path: "http://localhost:3000/user/add", method: "post", body: userDetail }).then((res) => {
                if (res?.status) {
                    navigate("/")
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const editUser = () => {
        console.log(232323, userDetail);
        let inError = false;

        Object.keys(userDetail).forEach((i) => {
            if (userDetail[i] === "") {
                console.log(232323, userDetail[i] === "");
                setError(true);
                inError = true;
            }
        })
        if (!inError) {
            apiCall({ path: "http://localhost:3000/user/edit", method: "put", body: userDetail }).then((res) => {
                if (res?.status) {
                    navigate("/")

                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const onSubmit = () => {
        if (isEdit) {
            editUser();
        } else {
            onAdd();
        }
    }

    return (
        <>
            <div>Add user</div>
            <div><b>Name: </b><input value={userDetail?.name} onChange={(e) => { onChange(e, "name") }} type={"text"} /></div>
            <div><b>Phone No.: </b><input value={userDetail?.mobile_no} onChange={(e) => { onChange(e, "mobile_no") }} type={"number"} /></div>
            <div><b>Password: </b><input value={userDetail?.password} onChange={(e) => { onChange(e, "password") }} type={"text"} /></div>
            <button onClick={onSubmit}>{`${isEdit ? "Edit User" : "Add User"}`}</button>
            {error && <p>please fill all details</p>}
        </>


    )
}

export default AddUser