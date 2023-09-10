import styles from './ForgotPassword.module.css'
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {Link} from "react-router-dom";


export default function ForgotPassword() {
    const [value, setValue] = React.useState('')
    const [value2, setValue2] = React.useState('')
    const [value3, setValue3] = React.useState('')
    const inputRef = React.useRef(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }
    const onChange = e => {
        setValue2(e.target.value)
    }
    return (
        <main className={styles.wrapper}>
            <form className={styles.form}>
                <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                <EmailInput
                    onChange={() => (console.log('kek'))}
                    value={value}
                    name={'email'}
                    placeholder={'Укажите e-mail'}
                    isIcon={false}
                    extraClass="mb-6"
                />

                <div className={styles.buttonWrap}>
                    <Button htmlType="button" type="primary" size="medium" extraClass='mb-20'>
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