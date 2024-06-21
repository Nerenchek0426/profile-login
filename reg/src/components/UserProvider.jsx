import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUserData = async (email) => {
        try {
            const response = await fetch(`http://192.168.2.151:5000/user?Email=${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            if (response.ok) {
                setUser(result.user);
            } else {
                console.error('Error fetching user data:', result.error);
            }
        } catch (error) {
            console.error('Network error:', error.message);
        }
    };

    const loginUser = async (Email, Password) => {
        try {
            console.log('Sending Email:', Email);
            console.log('Sending Password:', Password);
            const response = await fetch('http://192.168.2.151:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Email, Password })
            });

            const result = await response.json();
            if (response.ok) {
                await fetchUserData(Email);
                return { success: true, message: result.message };
            } else {
                return { success: false, message: result.error };
            }
        } catch (error) {
            return { success: false, message: 'Network error: ' + error.message };
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, loginUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;