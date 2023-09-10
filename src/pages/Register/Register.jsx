import styles from './Register.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useCallback, useEffect} from "react";
import {Link} from "react-router-dom";
import {registerUser} from "../../services/actions/authActions";
import {useDispatch} from "react-redux";


export default function Register() {
    const dispatch = useDispatch();
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const inputRef = React.useRef(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const sendForm = useCallback(() => {
        if (name && email && password) {
            dispatch(registerUser(name, email, password));
        }
        
    },[email, name, password]);
    return (
        <main className={styles.wrapper}>
            <form className={styles.form}>
                <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}
                    value={name}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    isIcon={false}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    extraClass="mb-6"
                />
                <div className={styles.buttonWrap}>
                    <Button htmlType="button" onClick={() => sendForm()} type="primary" size="medium" extraClass='mb-20'>
                        Зарегистрироваться
                    </Button>
                </div>


                <div  className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы?
                    <Link to={'/login'} className={styles.link}>Войти</Link>
                </div>
            </form>
        </main>
    )
}