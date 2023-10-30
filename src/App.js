import React from 'react'
import NavBar from './sidebar-components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contact from './home-components/Contact';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-components/firebase';
import PleaseLogin from './home-components/PleaseLogin';
import Home from './home-components/Home';
import SideBar from './sidebar-components/SideBar';
import ChatRoom from './chat-components/ChatRoom';

function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
      // Add an observer to listen to the authentication state changes
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
  
      // Unsubscribe the observer when the component unmounts
      return () => unsubscribe();
    }, []);

    if (!user) {
      // Handle the case where currentUser is not yet available
      return (
        <div className='flex flex-row relative'>
          <Router>
            <NavBar />
            <SideBar />
            <PleaseLogin />
          </Router>
         
        </div>
      )
    }

  return (
    <div className='flex flex-row'>
   
      <Router>
        <NavBar />  
        <SideBar />
        <Routes>
          <Route path='/'  exact element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/chat/:roomId" element={<ChatRoom currentUser={user} />} />
        </Routes>
      </Router>  
    </div>
  );
}

export default App;
