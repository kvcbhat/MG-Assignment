import React, { useContext } from 'react';
import UserContext from './UserContext';
import { Card } from 'semantic-ui-react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';


import { Button } from 'semantic-ui-react';


function Dashboard() {
    const { userData } = useContext(UserContext);
    const Navigate = useNavigate();
    if (!userData) {
        return <p>Loading...</p>;
    }
    

    const handleAddClick = () => {
        Navigate('/create');
    };


    return (

    <>
        <div class="ui card">
            <div class="content">
                <div class="header">{userData.name}</div>
                <div class="meta">
                    <span>admin</span>
                </div>
                <h4>email:{userData.email}</h4>
                <h4>phone:{userData.phone}</h4>
                <Button onClick={()=>Navigate('/read')}>List Item</Button>
            </div>
        </div>
        <Fab 
                color="primary" 
                aria-label="add" 
                style={{ position: 'fixed', bottom: '16px', right: '16px' }}
                onClick={handleAddClick}
            >
                <AddIcon />
        </Fab>
     </>
    );
}

export default Dashboard;
