import './App.css';
import { useState } from 'react';
import Create from './components/Create';
import Read from './components/Read';
import Update from './components/Update';
import HomePage from './components/HomePage';
import {Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import UserContext from './components/UserContext';
import Dashboard from './components/Dashboard';
import AdminLogin from './components/AdminLogin';

function App() {
  const [userData, setUserData] = useState(null);
  return (
<UserContext.Provider value={{ userData, setUserData }}>
<div className="main">
        <Routes> 
          <Route exact path='/'element={<HomePage />}/>
          <Route exact path='/adminlogin'element={<AdminLogin />}/>
          <Route exact path='/create'element={<Create />}/>
          <Route exact path='/read'element={<Read />}/>
          <Route path='/update'element={<Update />}/>
          <Route path='/login'element={<Login/>}/>
          <Route path='/dashboard'element={<Dashboard/>}/>
        </Routes> 
</div>
</UserContext.Provider>
  );
}
 
export default App; 