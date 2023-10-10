import React, { useState,useEffect } from 'react';
import { Button, Checkbox, Form, FormGroup } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Update() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState(false);
    const [id, setID] = useState(null);
    const navigate = useNavigate();

useEffect(() => {
        setID(localStorage.getItem('ID'))
        setName(localStorage.getItem('Name'));
        setEmail(localStorage.getItem('Email'));
        setMobile(localStorage.getItem('Mobile'))
}, []);
const updateAPIData = (e) => {
    e.preventDefault();
    console.log('submitted');
  axios.put(`https://65225df6f43b179384146c7e.mockapi.io/userData/${id}`, {
      name,
      email,
      mobile

})
.then(response => {
    console.log("Inside the .then block");
    navigate('/read');
})
.catch(error => {
    console.error("Error posting data:", error);
  });
}

    return (
        <div style={{width: '25%'}}> 
            <h2 class='main-header'>Update</h2>

              
            <form onSubmit={updateAPIData} >
            <div class="form-group mb-2">
                <label for="exampleName">Name</label>
                <input type="name" class="form-control form-control-lg"  placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </div>
            <div class="form-group mb-2" >
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>

            <div class="form-group">
                <label for="exampleInputMobile ">Mobile</label>
                <input type="text" class="form-control form-control-lg " id="exampleInputmobile" placeholder="mobile" value={mobile} onChange={(e)=>{setMobile(e.target.value)}}/>
            </div>
            <div class="d-grid ">
            <button type="submit" class="btn btn-primary btn-lg loat-right mt-3"  >Update</button>
            </div>
            </form>
                    </div>
    )
}
export default Update;
