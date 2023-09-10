import profileStyles from './Profile.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout, updateUserData} from "../../services/actions/authActions";
import styles from "../Profile/Profile.module.css";

export default function Profile() {

    const userData = useSelector((state) => state.authData.user)

    const inputRef = React.useRef(null)
    const [isFocused, setIsFocused] = useState(true);


    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState({
        name: userData.name,
        email: userData.email,
        password: "",
    });

    const [buttonVisible, setButtonVisible] = useState(false);

    const onLogout = () => {
        dispatch(logout);
    }
    const handleInputChange = (e) => {
        setFormValue((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        if (formValue.name !== userData.name || formValue.email !== userData.email || formValue.password.length) {
            setButtonVisible(true);
        } else {
            setButtonVisible(false);
        }
    }, [formValue.email, formValue.name, formValue.password.length, userData.email, userData.name])

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        setIsFocused(false);
    }

    const saveForm = useCallback(() => {
        dispatch(updateUserData(formValue.name, formValue.email, formValue.password))
    },[dispatch, formValue.email, formValue.name, formValue.password]);

    const handleBlur = () => {
        setIsFocused(true);
    };

    const setInitialParams = () => {
        setFormValue({
            name: userData.name,
            email: userData.email,
            password: ""
        })
    }

    return (
        <main className={profileStyles.wrapper}>
            <div className={profileStyles.inner}>
                <div className={profileStyles.sidebar}>
                    <nav className={profileStyles.nav}>
                        <li className='text text_type_main-medium'>Профиль</li>
                        <li className='text text_type_main-medium text_color_inactive'>История заказов</li>
                        <li className='text text_type_main-medium text_color_inactive' onClick={onLogout}>Выход</li>
                    </nav>
                    <div className={profileStyles.infoMessage}>
                        В этом разделе вы можете
                        изменить свои персональные данные
                    </div>
                </div>
                <form>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={(e) => handleInputChange(e)}
                        icon={'EditIcon'}
                        value={formValue.name}
                        disabled={isFocused}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        onIconClick={() => onIconClick()}
                        errorText={'Ошибка'}
                        size={'default'}
                        onBlur={() => handleBlur()}
                        extraClass="mb-6"
                    />
                    <EmailInput
                        onChange={(e) => handleInputChange(e)}
                        value={formValue.email}
                        name={'email'}
                        placeholder="Email"
                        isIcon={true}
                        extraClass="mb-6"
                    />
                    <PasswordInput
                        onChange={(e) => handleInputChange(e)}
                        value={formValue.password}
                        icon={'EditIcon'}
                        name={'password'}
                        extraClass="mb-6"
                    />
                    {buttonVisible &&
                        <div className={styles.buttonWrap}>
                            <Button htmlType="button"
                                    type="secondary"
                                    size="medium"
                                    onClick={setInitialParams}
                                    extraClass="mr-2">
                                Отменить
                            </Button>
                            <Button htmlType="button"
                                    type="primary"
                                    size="medium"
                                    onClick={() => saveForm()}
                                    extraClass='mb-20'>
                                Сохранить
                            </Button>
                        </div>

                    }

                </form>
            </div>
        </main>
    )
}