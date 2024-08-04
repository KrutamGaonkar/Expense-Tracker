import React, { useEffect } from 'react'
import "./style.css"
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";
import { toast } from 'react-toastify';

function Header() {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);

    useEffect(()=>{
        if(user){
            navigate('/dashboard');
        }
    },[user, loading])

    function logoutFunc(){
        try {
            signOut(auth).then(() => {
                toast.success("Logged Out Successfully");
                navigate("/");
              }).catch((error) => {
                console.log(error);
              });
        } catch (error) {
            
        }
    }

    return (
        <div className='navbar'>
            <p className='logo' >FinTracker</p>
            {user && <p className='logo link' onClick={logoutFunc}>Logout</p>}
        </div>
    )
}

export default Header
