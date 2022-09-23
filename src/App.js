import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import HomePage from './pages/HomePage/HomePage';
import Signin from './pages/AuthPage/AuthPage';
import LandingPage from './pages/LandingPage/LandingPage';
function App() {
  return (
      <AuthContextProvider>
        <Routes>
        <Route path='/' element={<LandingPage />}/>
          <Route path='/signin' element={<Signin />} />
          <Route
            path='/home'
            element={
              <Protected>
                <HomePage />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
  );
}

export default App;