import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import mainPageStyles from './MainPage.module.css'
import {DndProvider} from "react-dnd";
import {BurgerIngredients} from "../../components/BurgerIngredients/BurgerIngredients";
import {BurgerConstructor} from "../../components/BurgerConstructor/BurgerConstructor";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Modal} from "../../components/Modal/Modal";
import {
    IngredientDetails
} from "../../components/BurgerIngredients/IngredientCard/modals/IngredientDetails/IngredientDetails";
import {getIngredientsData} from "../../services/actions/ingredientsActions";
import {hideInfoModal} from "../../services/actions/showInfoModalAction";
import Loader from "../../components/Loader/Loader";

function MainPage() {
    const error = useSelector(store =>  store.ingredients.error)
    const loader = useSelector(store => store.ingredients.loader)

    const modalInfoData = useSelector(state => state.modalInfo.modalData);
    const modalInfoVisible = useSelector(state => state.modalInfo.modalInfoVisible);

    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(getIngredientsData());
    }, [dispatch])

    function closeModal() {
        dispatch(hideInfoModal());
    }

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
            {modalInfoVisible &&
                <Modal toggleModal={closeModal} modalTitle={'Детали ингредиента'}>
                    <IngredientDetails {...modalInfoData}/>
                </Modal>
            }
        </>

    );
}

export default MainPage;
