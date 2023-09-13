import styles from './ForgotPassword.module.css'
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {passwordRecovery} from "../../services/actions/authActions";


export default function ForgotPassword() {
    const [value, setValue] = React.useState('');
    const isResetPassword = useSelector(state => state.authData.isResetPassword)
    const dispatch = useDispatch();
    const navigate = useNavigate ();
    const onChange = e => {
        setValue(e.target.value)
    }

    useEffect(() => {
        if (isResetPassword) {
            navigate('/reset-password');
        }
    }, [isResetPassword, navigate])

    const forgotPass = (e) => {
        e.preventDefault();
        dispatch(passwordRecovery(value))
    }
    return (
        <main className={styles.wrapper}>
            <form className={styles.form} onSubmit={(e) => forgotPass(e)}>
                <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                <EmailInput
                    onChange={(e) => onChange(e)}
                    value={value}
                    name={'email'}
                    placeholder={'Укажите e-mail'}
                    isIcon={false}
                    extraClass="mb-6"
                />

                <div className={styles.buttonWrap}>
                    <Button htmlType="submit" type="primary" size="medium" extraClass='mb-20'>
                        Восстановить
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