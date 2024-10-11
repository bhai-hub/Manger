import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import { useEffect, useState } from 'react';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Navbar from './Components/Navbar';
import VerifyEmail from './Pages/VerifyEmail';
import Forgot from './Pages/Forgot';
import ForgotPass2 from './Pages/ForgotPass2';
import HomeLayout from './Layout/HomeLayout';

function App() {
    const nav = useNavigate();
    const baseUrl = `https://manger-wq3u.onrender.com/api/user`;
    const [isAuthenticated, setAuthenticate] = useState(false);
    const [userData, setUserdata] = useState();
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            async function fetchUserData() {
                try {
                    const response = await fetch(`${baseUrl}/getuser/${localStorage.getItem('userId')}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) throw new Error('Failed to fetch user data');
                    const data = await response.json();
                    setUserdata(data.user);
                    setAuthenticate(true);
                    nav('/'); // Redirect to home page
                } catch (error) {
                    console.error('Error fetching user data:', error);
                } finally {
                    setLoading(false); // Set loading to false after fetch
                }
            }
            fetchUserData();
        } else {
            setLoading(false); // If no token, stop loading
        }
    }, [baseUrl, nav]);

    if (loading) return <p>Loading...</p>; // Show loading state

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} setAuthenticate={setAuthenticate} userData={userData} baseUrl={baseUrl} />
            <Routes>
                <Route path="/login" element={<Login baseUrl={baseUrl} />} />
                <Route path="/signup" element={<SignUp baseUrl={baseUrl} />} />
                <Route path="/verify/:email" element={<VerifyEmail baseUrl={baseUrl} />} />
                <Route path="/forgotPass/:userId/:token/:forId" element={<Forgot baseUrl={baseUrl} />} />
                <Route path="/forgot" element={<ForgotPass2 baseUrl={baseUrl} />} />
                <Route path="/" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <HomeLayout setAuthentication={setAuthenticate} baseUrl={baseUrl} setUserdata={setUserdata} />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
