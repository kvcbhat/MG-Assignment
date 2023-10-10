import React, { useState } from 'react';
import { Button, Checkbox, Form, FormGroup } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FamilyRestroomTwoTone } from '@mui/icons-material';

export default function Create() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [status,setStatus] = useState(false);
    const postData = () => {
        setStatus(!status);
        if (name!==''&& email!==''&& mobile!=='') {
            setStatus(!status);
        axios.post(`https://65225df6f43b179384146c7e.mockapi.io/userData`, {
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
    }else{
        alert('data cant be blank');
    }
   
    }
   
    const navigate = useNavigate();
    if (status !== false) {
        navigate('/read');
    }
    return (
        <div>
            <h2 className='main-header'>Add user</h2>
            <Form className="create-form" onSubmit={postData}>
                <FormGroup widths={'equal'}>
                    <Form.Field>
                        <label> Name</label>
                        <input placeholder=' Name' onChange={(e) => setName(e.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Field>
                </FormGroup>
                <Form.Field>
                <label>Mobile no</label>
                    <input placeholder='mobile no' onChange={(e) => setMobile(e.target.value)}/>
                </Form.Field>
                <Button.Group size='large'>
                    <Button type='submit'>Save</Button>
                    <Button.Or />
                    <Button onClick={()=> navigate('/dashboard')}>Cancel</Button>
                </Button.Group>
            </Form>
        </div>
    )
}