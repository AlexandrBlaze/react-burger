import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {HeaderButton} from "./HeaderButton/HeaderButton";
import appHeaderStyles from './AppHeader.module.css'
import {Link} from "react-router-dom";

export function AppHeader() {
    return (
        <header className={appHeaderStyles.header}>
            <div className={appHeaderStyles.headerInner}>
                <nav className={appHeaderStyles.half}>
                    <HeaderButton buttonText='Конструктор' classes="mr-2" url={'/'}>
                        <BurgerIcon type="secondary" />
                    </HeaderButton>
                    <HeaderButton buttonText='Лента заказов' url={'/history'}>
                        <ListIcon type="secondary" />
                    </HeaderButton>
                </nav>

                <Link to={'/'}>
                    <Logo />
                </Link>

                <nav className={appHeaderStyles.halfRight}>
                    <HeaderButton buttonText='Личный кабинет' url={'/profile'}>
                        <ProfileIcon type="secondary" />
                    </HeaderButton>
                </nav>
            </div>
        </header>
    )
}
