import styles from './Register.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useCallback} from "react";
import {Link} from "react-router-dom";
import {registerUser} from "../../services/actions/authActions";
import {useAppDispatch} from "../../hooks";


export default function Register() {
    const dispatch = useAppDispatch();
    const [name, setName] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const inputRef = React.useRef<HTMLInputElement>(null)
    const onIconClick = () => {
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }, 0)
    }

    const sendForm:React.FormEventHandler<HTMLFormElement> = useCallback((event) => {
        event.preventDefault();
        if (name && email && password) {
            dispatch(registerUser(name, email, password));
        }
        
    },[dispatch, email, name, password]);
    return (
        <main className={styles.wrapper}>
            <form className={styles.form} onSubmit={(e) => sendForm(e)}>
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
                    <Button htmlType="submit" type="primary" size="medium" extraClass='mb-20'>
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