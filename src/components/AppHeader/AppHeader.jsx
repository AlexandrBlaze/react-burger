import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {HeaderButton} from "./HeaderButton/HeaderButton";
import appHeaderStyles from './AppHeader.module.css'

export function AppHeader() {
    return (
        <header className={appHeaderStyles.header}>
            <div className={appHeaderStyles.headerInner}>
                <nav className={appHeaderStyles.half}>
                    <HeaderButton buttonText='Конструктор' classes="mr-2">
                        <BurgerIcon type="secondary" />
                    </HeaderButton>
                    <HeaderButton buttonText='Лента заказов'>
                        <ListIcon type="secondary" />
                    </HeaderButton>
                </nav>

                <a href="#">
                    <Logo />
                </a>

                <nav className={appHeaderStyles.halfRight}>
                    <HeaderButton buttonText='Личный кабинет'>
                        <ProfileIcon type="secondary" />
                    </HeaderButton>
                </nav>
            </div>
        </header>
    )
}
