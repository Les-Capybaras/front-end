import Login from '../components/auth/login';
import Register from '../components/auth/register';
import { useState } from 'react';

export default function Auth() {
    const [switchAuth, setswitchAuth] = useState(false);

    const HandleSwitch = () => {
        setswitchAuth(!switchAuth);
    }

    return (    
        <div className="d-flex ">

            {switchAuth ? <Register/> : <Login/>}

            <a className='btn' onClick={HandleSwitch}>switch</a>
        </div>
    )
}