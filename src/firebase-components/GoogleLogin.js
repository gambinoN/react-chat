import {auth, googleProvider} from "./firebase";
import {browserSessionPersistence, setPersistence, signInWithPopup, signOut, onAuthStateChanged} from 'firebase/auth';
import { useState, useEffect } from "react";

const GoogleLogin = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Add an observer to listen to the authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
    
        // Unsubscribe the observer when the component unmounts
        return () => unsubscribe();
      }, []);

    const handleGoogleLogin = async () => {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          setPersistence(auth, browserSessionPersistence)
          setUser(result.user);
        } catch (error) {
          console.error('Google login error:', error);
        }
      };

      const handleSignOut = async () => {
        try {
          await signOut(auth);
          // User is signed out
        } catch (error) {
          console.error(error.message);
        }
      };

    return ( 
        <div>
            {user ? (
                <div id="login" className="w-full h-28 flex flex-row justify-center items-center border ">
                    <img className='rounded-full' src={user.photoURL} alt={user.displayName} />
                    <div className="ml-5">
                    <h2 className="text-white font-semibold font-sans text-lg ">Welcome, {user.displayName}!</h2>
                    <h3 style={{color: '#7d8081',}}>My Account</h3>
                    </div>
                    <button className='text-white font-sans text-md ml-10 hover:bg-sky-600 px-4 py-2 rounded-lg' onClick={handleSignOut}>Sign out</button>
                </div>
            ) : (
                <div className="w-full h-28 flex justify-center items-center">
                    <button className="text-white text-2xl hover:bg-sky-600 px-4 py-2 rounded-lg" onClick={handleGoogleLogin}>Sign in</button>
                </div>
            )}
        </div>
      );
}
 
export default GoogleLogin;