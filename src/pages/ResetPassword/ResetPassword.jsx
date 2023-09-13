import styles from './ResetPassword.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useCallback, useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {passwordReset} from "../../services/actions/authActions";


export default function ResetPassword() {
    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = React.useState('')
    const [resetCode, setResetCode] = React.useState('')
    const inputRef = React.useRef(null)
    const isResetPassword = useSelector(state => state.authData.isResetPassword)
    const error = useSelector(state => state.authData.resetFetchHasError)

    const confirmReset = useCallback(event => {
        event.preventDefault();
        if (newPassword.length && resetCode.length) {
            dispatch(passwordReset(newPassword, resetCode))
        }
    },[dispatch, newPassword, resetCode])
    
    return (
        <main className={styles.wrapper}>
            <form className={styles.form} onSubmit={(e) => confirmReset(e)}>
                <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                <PasswordInput
                    placeholder={'Введите новый пароль'}
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    name={'password'}
                    extraClass="mb-6"
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setResetCode(e.target.value)}
                    value={resetCode}
                    name={'name'}
                    error={error.error}
                    ref={inputRef}
                    size={'default'}
                    errorText={error.message}
                    extraClass="mb-6"
                />


                <div className={styles.buttonWrap}>
                    <Button htmlType="submit"  type="primary" size="medium" extraClass='mb-20'>
                        Сохранить
                    </Button>
                </div>


                <div  className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль?
                    <Link to={'/login'} className={styles.link}>Войти</Link>
                </div>
            </form>
        </main>
    )
}