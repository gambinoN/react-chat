import { useContext, useEffect, useState } from "react"
import * as ROUTES from '../constants/routes'
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";

const Login = () => {
    const navigate = useNavigate()
    const {firebase} = useContext(FirebaseContext)
    const [emailAdress, setEmailAdress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('')

    const handleLogin = async (e) => {
    e.preventDefault()
    try{
        await firebase.auth().signInWithEmailAndPassword(emailAdress, password)
        navigate(ROUTES.DASHBOARD)
        } catch (error) {
            setEmailAdress('');
            setPassword('');
            setError(error.message);   
         }
    }

    useEffect(() => {
        document.title = 'Login'
    }, [])

    return (
        <>
            <div className="w-full flex justify-center items-center bg-[#0a0e0f] h-screen font-pop">
            <div id='gradient-01' className="absolute top-20 right-[140px] z-[5] opacity-75"></div>
                <div className="flex flex-col mb-4">
                    {error && <p className="mb-4 text-xs text-red-600">{error}</p>}
                    <form onSubmit={handleLogin} method="POST" className="flex flex-col justify-center items-center z-10">
                        <span className="input w-full mb-4">
                            <input 
                                id="input"
                                aria-label="Enter your email address"
                                type="text"
                                onChange={(e) => {
                                    setEmailAdress(e.target.value)
                                }}
                                value={emailAdress}
                                placeholder="Email address"
                                autoComplete="current-password"
                                className="text-sm text-white w-full h-[40px] rounded-3xl "
                            />
                            <span></span>
                        </span>
                        <span className="input w-full mb-10">
                            <input 
                                id="input"
                                aria-label="Enter your password"
                                type="password"
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                value={password}
                                placeholder="Password"
                                className="text-sm text-white w-full rounded-3xl"
                            />
                            <span></span>
                        </span>
                        <button type="submit" className="w-[330px] h-[50px] bg-white text-black rounded-full">Log In</button>
                    </form>
                    <div className="flex justify-center items-center flex-col mt-16 w-full z-10">
                        <p className="text-sm text-[#B9C1BE]">Don't have an account?{` `}
                            <Link to={ROUTES.SIGN_UP} className="text-white font-bold">
                                Sign Up
                            </Link>
                        </p>                
                    </div>
                </div>    
                <div id="gradient-02" className="absolute z-[5] bottom-[350px] left-7 hidden md:block"></div>            
            </div>
        </>
    )
}
 
export default Login;