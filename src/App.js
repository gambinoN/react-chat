import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes'
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';

import ProtectedRoute from './helpers/protected.route';

const Welcome = lazy(() => import('./pages/welcome'))
const Login = lazy(() => import('./pages/login'))
const SignUp = lazy(() => import('./pages/sign-up'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const ChatRoom = lazy(() => import('./pages/chat-room'))
const GroupChat = lazy(() => import('./pages/group-chat'))

function App() {
  const {user} = useAuthListener()

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading..</p>}>
        <Routes>
          <Route path={ROUTES.WELCOME} element={<Welcome />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route
            exact
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path='/chat/:username' element={<ChatRoom user={user} />} />
          <Route path='/group' element={<GroupChat user={user} />} />
        </Routes>
        </Suspense>
      </Router>  
    </UserContext.Provider>
  );
}

export default App;
