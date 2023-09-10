import styles from './Login.module.css'
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useCallback} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {signIn} from "../../services/actions/authActions";
import Loader from "../../components/Loader/Loader";


export default function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')


    const sendForm = useCallback(() => {
        if (email && password) {
            dispatch(signIn(email, password));
        }

    },[email, password]);
    return (
        <main className={styles.wrapper}>
            <form className={styles.form}>
                <h1 className="text text_type_main-medium mb-6">Вход</h1>
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
                    <Button htmlType="button" type="primary" onClick={() => sendForm()} size="medium" extraClass='mb-20'>
                        Войти
                    </Button>
                </div>

                <div  className="text text_type_main-default text_color_inactive">
                    Вы — новый пользователь?
                    <Link to={'/register'} className={styles.link}>Зарегистрироваться</Link>
                </div>
                <div  className="text text_type_main-default text_color_inactive">
                    Забыли пароль?
                    <Link to={'/forgot-password'} className={styles.link}>Восстановить пароль</Link>
                </div>
            </form>
        </main>
    )
}