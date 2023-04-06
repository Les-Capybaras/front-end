import Login from '../components/auth/login';
import Register from '../components/auth/register';
import { useState } from 'react';

export default function Auth() {
    const [switchAuth, setswitchAuth] = useState(false);

    const handleLoginSwitch = () => {
        setswitchAuth(!switchAuth);
    }

    return (    
        <div className="flex">

            {switchAuth 
                ? <Register handleLoginSwitch={handleLoginSwitch} /> 
                : <Login handleLoginSwitch={handleLoginSwitch} />
             }

            {/* <a className='btn' onClick={HandleSwitch}>switch</a> */}
        </div>
    )
}