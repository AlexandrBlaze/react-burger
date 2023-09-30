import styles from './Login.module.css'
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useCallback} from "react";
import {Link} from "react-router-dom";
import {signIn} from "../../services/actions/authActions";
import {useAppDispatch} from "../../hooks";


export default function Login() {
    const dispatch = useAppDispatch();
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')


    const sendForm:React.FormEventHandler<HTMLFormElement> = useCallback((event ) => {
        event.preventDefault();
        if (email && password) {
            dispatch(signIn(email, password));
        }

    },[dispatch, email, password]);
    return (
        <main className={styles.wrapper}>
            <form className={styles.form} onSubmit={(e) => sendForm(e)}>
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
                    <Button htmlType="submit" type="primary" size="medium" extraClass='mb-20'>
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