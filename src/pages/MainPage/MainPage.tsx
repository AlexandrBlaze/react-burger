import mainPageStyles from './MainPage.module.css'
import {DndProvider} from "react-dnd";
import {BurgerIngredients} from "../../components/BurgerIngredients/BurgerIngredients";
import {BurgerConstructor} from "../../components/BurgerConstructor/BurgerConstructor";
import {HTML5Backend} from "react-dnd-html5-backend";
import Loader from "../../components/Loader/Loader";
import {useAppSelector} from "../../components/App/hooks";

function MainPage() {
    const error = useAppSelector(store =>  store.ingredients.error)
    const loader = useAppSelector(store => store.ingredients.loader)
    return (
        <>
            <main className={mainPageStyles.mainPage}>
                {error && <div>Ошибка сервера</div>}
                {loader && <Loader/>}
                { (!error && !loader) &&
                    <div className={mainPageStyles.content}>
                        <DndProvider backend={HTML5Backend}>
                            <div className={mainPageStyles.halfLeft}>
                                <BurgerIngredients />
                            </div>
                            <div className={mainPageStyles.halfRight}>
                                <BurgerConstructor />
                            </div>
                        </DndProvider>
                    </div>
                }
            </main>
        </>

    );
}

export default MainPage;
