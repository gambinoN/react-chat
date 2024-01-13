import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from '../constants/routes'
import FirebaseContext from "../context/firebase";
import { doesUsernameExist } from "../services/firebase";

const SignUp = () => {
    const navigate = useNavigate
    const {firebase} = useContext(FirebaseContext)

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [emailAdress, setEmailAdress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('')

    const handleSignUp = async (e) => {
        e.preventDefault()

        const usernameExists = await doesUsernameExist(username);

        if(!usernameExists.length) {
            try {
                const createdUser = await firebase.auth().createUserWithEmailAndPassword(emailAdress, password)

                await createdUser.user.updateProfile({
                    displayName: username
                })

                await firebase.firestore().collection('users').add({
                    userId: createdUser.user.uid,
                    username: username.toLowerCase(),
                    fullName: fullName,
                    emailAdress: emailAdress.toLowerCase(),
                    dateCreated: Date.now()
                })

                navigate(ROUTES.DASHBOARD)
            } catch (error) {
                setFullName('')
                setUsername('')
                setEmailAdress('')
                setPassword('')
                setError(error.message);
            }} else {
            setUsername('')
            setError('That username exists please try another one')
        }
    }
    
    useEffect(() => {
        document.title = 'Sign Up'
    })
    
    
    return (     
    <>
        <div className="w-full flex justify-center items-center bg-[#0a0e0f] h-screen font-pop">
            <div id='gradient-02' className="absolute top-20 right-[140px] z-[5] opacity-75"></div>
                <div className="flex flex-col mb-4">
                    <form method="POST" onSubmit={handleSignUp} className="flex flex-col justify-center items-center z-10">
                        <span className="input w-full mb-4">
                            <input 
                                aria-label="Enter your username"
                                type="text"
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }}
                                value={username}
                                placeholder="Username"
                                className="text-sm text-white w-full"
                            />
                            <span></span>
                        </span>
                        <span className="input w-full mb-4">
                        <input 
                                aria-label="Enter your full name"
                                type="text"
                                onChange={(e) => {
                                    setFullName(e.target.value)
                                }}
                                value={fullName}
                                placeholder="Full name"
                                className="text-sm text-white w-full"
                            />
                        <span></span>
                        </span>
                        <span className="input w-full mb-4">
                        <input 
                                aria-label="Enter your email address"
                                type="text"
                                onChange={(e) => {
                                    setEmailAdress(e.target.value)
                                }}
                                value={emailAdress}
                                placeholder="Email address"
                                className="text-sm text-white w-full"
                                />
                        <span></span>
                        </span>
                        <span className="input w-full mb-10">
                        <input 
                                aria-label="Enter your password"
                                type="password"
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                value={password}
                                placeholder="Password"
                                className="text-sm text-white w-full"
                            />
                        <span></span>
                        </span>
                        <button type="submit" className="w-[330px] h-[50px] bg-white text-black rounded-full">Sign Up</button>
                    </form>
                    <div className="flex justify-center items-center flex-col mt-16 w-full z-10">
                        <p className="text-sm text-[#B9C1BE]">Already have an account?{` `}
                            <Link to={ROUTES.LOGIN} className="text-white font-bold">
                                Log in
                            </Link>
                        </p>                
                    </div>
                </div>    
            <div id="gradient-01" className="absolute z-[5] bottom-[350px] left-7 hidden md:block"></div>            
        </div>
    </>
    )
}
 
export default SignUp;