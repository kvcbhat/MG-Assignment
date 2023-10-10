import React from 'react';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
   const navigate=useNavigate();
  return (
    <div>
      <h2 className="main-header">Welcome to the web app!</h2>
        <Button.Group size='large'>
            <Button onClick={()=>navigate('/adminlogin')}>Signup</Button>
            <Button.Or />
            <Button onClick={()=>navigate('/login')}>Login</Button>
        </Button.Group>
    </div>
  )
}

export default HomePage


