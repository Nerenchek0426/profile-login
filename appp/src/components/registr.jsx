import React, { useState, useEffect } from "react";
import "./styles/registr.css"

const Mainform = () => {
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
                <h1>Регистрация</h1>
                <div className="inputs">
                    {(emailDirty && emailError) && <div style={{ color: 'red' }}>{emailError}</div>}
                    <input onChange={e => emailHandler(e)} value={Email} onBlur={e => blurHandler(e)} name='email' type='text' placeholder='Enter your email....' />
                    {(passwordDirty && passwordError) && <div style={{ color: 'red' }}>{passwordError}</div>}
                    <input onChange={e => passwordHandler(e)} value={Password} onBlur={e => blurHandler(e)} name='password' type='password' placeholder='Enter your password....' />
                </div>
                <div className="buttons">
                    <button disabled={!formValid} onClick={handleRegistration} type='button'>Registration</button>
                    <button disabled={!formValid} type="button">Log in</button>
                </div>
            </form>
        </div>
    );
};


export default Mainform;
