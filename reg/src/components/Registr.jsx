import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import styles from './styles/registr.module.css';

const Register = () => {
    const navigate = useNavigate();
    const { loginUser } = useContext(UserContext);
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Username, setUsername] = useState('');
    const [Usersurname, setUsersurname] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [usernameDirty, setUsernameDirty] = useState(false);
    const [usersurnameDirty, setUsersurnameDirty] = useState(false);
    const [emailError, setEmailError] = useState('Email не может быть пустым');
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
    const [usernameError, setUsernameError] = useState('Имя не может быть пустым');
    const [usersurnameError, setUsersurnameError] = useState('Фамилия не может быть пустой');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (emailError || passwordError || usernameError || usersurnameError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, passwordError, usernameError, usersurnameError]);

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
            setPasswordError('Пароль должен содержать не менее 3 и не более 15 символов');
            if (!e.target.value) {
                setPasswordError('Пароль не может быть пустым');
            }
        } else {
            setPasswordError('');
        }
    };

    const usernameHandler = (e) => {
        setUsername(e.target.value);
        if (!/^[A-ZА-ЯЁ]/i.test(e.target.value)) {
            setUsernameError('Имя должно начинаться с заглавной буквы');
        } else {
            setUsernameError('');
        }
    };
    
    const usersurnameHandler = (e) => {
        setUsersurname(e.target.value);
        if (!/^[A-ZА-ЯЁ]/i.test(e.target.value)) {
            setUsersurnameError('Фамилия должна начинаться с заглавной буквы');
        } else {
            setUsersurnameError('');
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
            case 'username':
                setUsernameDirty(true);
                break;
            case 'usersurname':
                setUsersurnameDirty(true);
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
                    body: JSON.stringify({ Email, Password, Username, Usersurname })
                });

                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                    const loginResult = await loginUser(Email, Password);
                    if (loginResult.success) {
                        navigate('/profile');
                    } else {
                        alert(loginResult.message);
                    }
                } else {
                    alert(result.error);
                }
            } catch (error) {
                alert('Ошибка сети: ' + error.message);
            }
        }
    };

    return (
        <div className={styles['main-page']}>
            <form >
                <div className={styles.header}>
                    <h1>Создайте свой профиль</h1>
                    <h2>Заполните поля ниже и нажмите кнопку регистрации</h2>
                </div>
                <div className={styles.inputs}>
                    {(emailDirty && emailError) && <div className={styles.exeptinal}>{emailError}</div>}

                    <div className={styles['before_input']}>
                        <div className={styles.preview}>
                            <h4>Email</h4>
                        </div>
                        <input onChange={e => emailHandler(e)} value={Email} onBlur={e => blurHandler(e)} name='email' type='text' placeholder='например, example@mail.ru' />
                    </div> 
                    
                    {(passwordDirty && passwordError) && <div className={styles.exeptinal}>{passwordError}</div>}
                    
                    <div className={styles['before_input']}>
                        <div className={styles.preview}>
                            <h4>Password</h4>
                        </div>
                        <input onChange={e => passwordHandler(e)} value={Password} onBlur={e => blurHandler(e)} name='password' type='password' placeholder='например, Qwerty123' />
                    </div> 

                    {(usernameDirty && usernameError) && <div className={styles.exeptinal}>{usernameError}</div>}
                    <div className={styles['before_input']}>
                        <div className={styles.preview}>
                            <h4>Username</h4>
                        </div>
                        <input onChange={e => usernameHandler(e)} value={Username} onBlur={e => blurHandler(e)} name='username' type='text' placeholder='Например, John' />
                    </div> 

                    {(usersurnameDirty && usersurnameError) && <div className={styles.exeptinal}>{usersurnameError}</div>}
                    <div className={styles['before_input']}>
                        <div className={styles.preview}>
                            <h4>Usersurname</h4>
                        </div>
                        <input onChange={e => usersurnameHandler(e)} value={Usersurname} onBlur={e => blurHandler(e)} name='usersurname' type='text' placeholder='Например, Doe' />
                    </div> 
                </div>
                
                <div className={styles.buttons}>
                    <button disabled={!formValid} onClick={handleRegistration} type='button'>Регистрация</button>
                </div>
                
                <div className={styles.textChangeForm}>
                    <p>Уже есть аккаунт? <span onClick={() => navigate('/login')} style={{color: 'blue', cursor: 'pointer'}}>Войти</span></p>
                </div>
            </form>
        </div>
    );
};

export default Register;
