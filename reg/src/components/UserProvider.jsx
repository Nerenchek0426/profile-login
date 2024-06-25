import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userCookie = getCookie('user');
        if (userCookie) {
            setUser(JSON.parse(userCookie));
        }
    }, []);

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
                setCookie('user', JSON.stringify(result.user), 7);
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

    const setCookie = (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    };

    const getCookie = (name) => {
        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return null;
    };

    return (
        <UserContext.Provider value={{ user, setUser, loginUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
