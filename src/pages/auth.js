import Login from '../components/auth/login';
import Register from '../components/auth/register';

export default function Auth() {
    return (    
        <div className="d-flex ">
            <Login/>
            <Register/>
        </div>
    )
}