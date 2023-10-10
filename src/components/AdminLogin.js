import React, { useState } from 'react';
import { Button, Form, Checkbox, Radio, Dropdown, Input, Message, FormGroup } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [refferlSource, setrefferlSource] =useState({
        linkedIn: false,
        friends: false,
        jobPortal: false,
        others: false
    });
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    let id=0;
    const cityOptions = [
        { key: 'm', text: 'Mumbai', value: 'Mumbai' },
        { key: 'p', text: 'Pune', value: 'Pune' },
        { key: 'a', text: 'Ahmedabad', value: 'Ahmedabad' }
    ];
    const handleCheckboxChange = (e, { name, checked }) => {
        setrefferlSource({
            ...refferlSource,
            [name]: checked
        });
    };
    
    const handleCityChange = (e, { value }) => {
        setCity(value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }else{
        axios.post(`https://65225df6f43b179384146c7e.mockapi.io/adminData`, {
            name,
            email,
            phone,
            gender,
            refferlSource,
            city,
            state,
            password
        })
         }
         if (name!==''&&email!==''&& phone!==''&&gender!==''&&city!==''&&state!==''&&password!=='') {
            navigate("/login")
         }else{
            alert("fill the form completly");
         }
    }
    return (
        <div >
            <h2 class='main-header'>Signup</h2>
            <Form onSubmit={handleSubmit} className="create-form">
            <FormGroup widths='equal'>
            <Form.Field>
                    <label>Name</label>
                    <Input type="text" name="name" value={name}  onChange={(e) => setName(e.target.value)} placeholder="Name" pattern="[A-Za-z]+" title="Alphabets only" />
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <Input type="email" name="email" value={email}onChange={(e) => setEmail(e.target.value)} placeholder="Email" pattern="[A-Za-z0-9]+@[A-Za-z0-9]+.[A-Za-z]+" title="Alphanumeric only"/>
                </Form.Field>
                <Form.Field>
                    <label>Phone</label>
                    <Input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" pattern="[0-9]+" title="Number only"/>
                </Form.Field>
                </FormGroup>
                <Form.Group>
                    <label>Gender</label>
                    <Form.Field control={Radio} label="Male" name="gender" value="male" checked={gender === 'male'} onChange={(e, {value}) => setGender(value)} />
                    <Form.Field control={Radio} label="Female" name="gender" value="female" checked={gender === 'female'} onChange={(e, {value}) => setGender(value)} />
                    <Form.Field control={Radio} label="Others" name="gender" value="others" checked={gender === 'others'} onChange={(e, {value}) => setGender(value)} />

                    </Form.Group>
                <Form.Group grouped>
                    <label>How did you hear about us?</label>
                    <Checkbox
                        label="LinkedIn"
                        name="linkedIn"
                        checked={refferlSource.linkedIn}
                        onChange={handleCheckboxChange}
                    />
                    <Checkbox
                        label="Friends"
                        name="friends"
                        checked={refferlSource.friends}
                        onChange={handleCheckboxChange}
                    />
                    <Checkbox
                        label="Job Portal"
                        name="jobPortal"
                        checked={refferlSource.jobPortal}
                        onChange={handleCheckboxChange}
                    />
                    <Checkbox
                        label="Others"
                        name="others"
                        checked={refferlSource.others}
                        onChange={handleCheckboxChange}
                    />
                </Form.Group>
                <FormGroup widths='equal'>
                <Form.Field>
                    <label>City</label>
                    <Dropdown
                        placeholder="Select City"
                        fluid
                        selection
                        options={cityOptions}
                        value={city}
                        onChange={handleCityChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>State</label>
                    <Input list="states" name="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
                    <datalist id="states">
                        <option value="Gujarat" />
                        <option value="Maharashtra" />
                        <option value="Karnataka" />
                    </datalist>
                </Form.Field>
                </FormGroup>
                <Form.Field>
                    <label>Password</label>
                    <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Confirm Password</label>
                    <Input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Field>
                <Button type="submit">Save</Button>
                {password && confirmPassword && password !== confirmPassword &&
                    <Message negative>
                        <Message.Header>Passwords do not match</Message.Header>
                        <p>Please make sure your passwords match before submitting.</p>
                    </Message>
                }
            </Form>
        </div>
    );
}

export default AdminLogin;
