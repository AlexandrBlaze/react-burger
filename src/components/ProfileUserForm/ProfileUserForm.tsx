import styles from "../ProfileUserForm/ProfileUserForm.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useCallback, useEffect, useState} from "react";
import {updateUserData} from "../../services/actions/authActions";
import {useAppDispatch, useAppSelector} from "../../hooks";


export default function ProfileUserForm() {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState<boolean>(true);
    const [buttonVisible, setButtonVisible] = useState<boolean>(false);
    const userData  = useAppSelector((state) => state.authData.user)

    const dispatch = useAppDispatch();

    const [formValue, setFormValue] = useState({
        name: userData?.name || "",
        email: userData?.email || "",
        password: userData?.password || "",
    });


    useEffect(() => {
        if (userData) {
            if (formValue.name !== userData.name || formValue.email !== userData.email || formValue.password.length) {
                setButtonVisible(true);
            } else {
                setButtonVisible(false);
            }
        }

    }, [formValue.email, formValue.name, formValue.password.length, userData?.email, userData?.name])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormValue((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const onIconClick = () => {
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }, 0)
        setIsFocused(false);

    }

    const saveForm:React.FormEventHandler<HTMLFormElement> = useCallback((event) => {
        event.preventDefault();
        dispatch(updateUserData(formValue.name, formValue.email, formValue.password))
    },[dispatch, formValue.email, formValue.name, formValue.password]);

    const handleBlur = () => {
        setIsFocused(true);
    };

    const setInitialParams = () => {
        if (userData) {
            setFormValue({
                name: userData.name,
                email: userData.email,
                password: ""
            })
        }

    }
    return (
        <div className="pt-20">
            <form onSubmit={(e) => saveForm(e)}>
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
                        <Button htmlType="submit"
                                type="primary"
                                size="medium"
                                extraClass='mb-20'>
                            Сохранить
                        </Button>
                    </div>

                }

            </form>
        </div>
    )
}