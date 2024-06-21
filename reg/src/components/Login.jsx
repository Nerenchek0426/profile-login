import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import styles from './styles/registr.module.css';

const Login = () => {
    const navigate = useNavigate();
    const { loginUser } = useContext(UserContext);
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

    const handleLogin = async (e) => {
        e.preventDefault();
        if (formValid) {
            try {
                const result = await loginUser(Email, Password); // Отправляем пароль в открытом виде
                if (result.success) {
                    navigate('/profile');
                } else {
                    alert(result.message);
                }
            } catch (error) {
                alert('Ошибка сети: ' + error.message);
            }
        }
    };
    
    return (
        <div className={styles['main-page']}>
                <form>
                    <div className={styles.header}>
                        <h1>Войти</h1>
                        <h2>Заполните поля ниже и нажмите кнопку войти</h2>
                    </div>
                    <div className={styles.inputs}>
                        {(emailDirty && emailError) && <div className={styles.exeptinal}>{emailError}</div>}
                        <div className={styles.before_input}>
                            <div className={styles.preview}>
                                <h4>Email</h4>
                            </div>
                            <input onChange={e => emailHandler(e)} value={Email} onBlur={e => blurHandler(e)} name='email' type='text' placeholder='например, example@mail.ru' />
                        </div>
                        {(passwordDirty && passwordError) && <div className={styles.exeptinal}>{passwordError}</div>}
                        <div className={styles.before_input}>
                            <div className={styles.preview}>
                                <h4>Password</h4>
                            </div>
                            <input onChange={e => passwordHandler(e)} value={Password} onBlur={e => blurHandler(e)} name='password' type='password' placeholder='например, Qwerty123' />
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button disabled={!formValid} onClick={handleLogin} type="button">Войти</button>
                    </div>
                    <div className={styles.textChangeForm}>
                        <p>Нет аккаунта? <span onClick={() => navigate('/')} style={{color: 'blue', cursor: 'pointer'}}>Регистрация</span></p>
                    </div>
                </form>
        </div>
    );
};

export default Login;
