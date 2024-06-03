import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./styles/registr.css";

const Mainform = () => {
    const navigate = useNavigate();
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('Email не может быть пустым');
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, passwordError]);

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный Email');
        } else {
            setEmailError('');
        }
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 3 || e.target.value.length > 15) {
            setPasswordError('Пароль должен содержать не меньше 3 и не более 15 символов');
            if (!e.target.value) {
                setPasswordError('Пароль не может быть пустым');
            }
        } else {
            setPasswordError('');
        }
    };

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
        }
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        if (formValid) {
            try {
                const response = await fetch('http://192.168.2.151:5000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ Email, Password })
                });

                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                    navigate('/profile'); // Redirect to profile page after successful registration
                } else {
                    alert(result.error);
                }
            } catch (error) {
                alert('Ошибка сети: ' + error.message);
            }
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (formValid) {
            try {
                const response = await fetch('http://192.168.2.151:5000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ Email, Password })
                });
    
                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                    navigate('/profile'); // Redirect to profile page after successful login
                } else {
                    alert(result.error);
                }
            } catch (error) {
                alert('Ошибка сети: ' + error.message);
            }
        }
    };
    
    return (
        <div className="app">
            <form>
                <div className="header">
                    <h1>Создайте свой профиль</h1>
                    <h2>Заполните поля ниже и нажмите кнопку регистрации</h2>
                </div>
                <div className="inputs">
                    {(emailDirty && emailError) && <div className="exeptinal">{emailError}</div>}

                    <div className="before_input">
                        <div className="preview">
                            <h4>Email</h4>
                        </div>
                        <input onChange={e => emailHandler(e)} value={Email} onBlur={e => blurHandler(e)} name='email' type='text' placeholder='e.g  example@mail.ru' />
                    </div> 
                    {(passwordDirty && passwordError) && <div className="exeptinal">{passwordError}</div>}
                    
                    <div className="before_input">
                        <div className="preview">
                            <h4>Password</h4>
                        </div>
                        <input onChange={e => passwordHandler(e)} value={Password} onBlur={e => blurHandler(e)} name='password' type='password' placeholder='e.g  Qwerty123' />
                    </div> 
                </div>
                
                <div className="buttons">
                    <button disabled={!formValid} onClick={handleRegistration} type='button'>Registration</button>
                    <button disabled={!formValid} onClick={handleLogin} type="button">Log in</button>
                </div>
            </form>
        </div>
    );
};

export default Mainform;
