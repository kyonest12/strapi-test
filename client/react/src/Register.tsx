import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [inValidRegister, setInValidRegister] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(email)
        console.log(password)
        console.log(username)
        try {
            const response = await fetch('http://localhost:1337/api/auth/local/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, username }),
            });
            if (!response.ok) {
                setInValidRegister(true)
                return;
            }
            navigate('/login')

        } catch (error) {
            setInValidRegister(true)
            console.error('Error during register:', error);
        }
      };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-700">Register</h1>
            {inValidRegister && <h2 className="text-center text-red-600">Invalid Register</h2>}
            <form className="space-y-6">
            <div>
                <label className="block text-sm">Email</label>
                <input type="email" value={email} onChange={handleEmailChange}  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
            </div>
            <div>
                <label className="block text-sm">Password</label>
                <input type="password" value={password} onChange={handlePasswordChange} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
            </div>
            <div>
                <label className="block text-sm">Username</label>
                <input type="text" value={username} onChange={handleUsernameChange} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
            </div>
            <div className="flex items-center justify-between">
                <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none" onClick={handleSubmit}>Register</button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default Register;