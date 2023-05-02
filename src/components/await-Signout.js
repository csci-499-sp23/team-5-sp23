import {React,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const AwaitSignout = () => {
    const navigate = useNavigate();
    setTimeout(useEffect(()=>{navigate(('/'))}),100);
    
    return (
        <div>
            <h1>Hi, we are signing you out!</h1>
        </div>
    );
}

export default AwaitSignout;