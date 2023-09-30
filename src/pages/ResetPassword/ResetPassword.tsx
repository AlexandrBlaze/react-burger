import styles from './ResetPassword.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useCallback} from "react";
import {Link} from "react-router-dom";
import {passwordReset} from "../../services/actions/authActions";
import {useAppDispatch, useAppSelector} from "../../hooks";


export default function ResetPassword() {
    const dispatch = useAppDispatch();
    const [newPassword, setNewPassword] = React.useState<string>('')
    const [resetCode, setResetCode] = React.useState<string>('')
    const inputRef = React.useRef<HTMLInputElement>(null)
    const error = useAppSelector(state => state.authData.resetFetchHasError)

    const confirmReset:React.FormEventHandler<HTMLFormElement> = useCallback((event) => {
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