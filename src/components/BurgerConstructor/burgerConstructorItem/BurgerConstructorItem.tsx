import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef} from "react";
import burgerConstructorItemStyles from './BurgerConstructorItem.module.css';
import { XYCoord } from 'dnd-core';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import {moveCard} from "../../../services/actions/burgerConstructorActions";
import {IIngredientItem} from "../../../services/reducers/ingredientsReducer";
import {useAppDispatch} from "../../../hooks";

interface IDragItem {
    ingredientItem: IIngredientItem,
    index: number,
}
interface Props {
    index: number,
    ingredientItem: IIngredientItem,
    deleteItem: (index: number) => void
}


export function BurgerConstructorItem({index, ingredientItem, deleteItem}: Props) {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop<IDragItem>({
        accept: 'sort',
        hover(dragItem: IDragItem, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = dragItem.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current!.getBoundingClientRect();

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            dispatch(moveCard(dragIndex, hoverIndex));

            dragItem.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: 'sort',
        item: () => {
            return { ingredientItem, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))
    return (
        <div ref={ref}
             className={burgerConstructorItemStyles.item}
             style={{opacity}}>
                <span className="mr-2">
                    <DragIcon type="primary" />
                </span>
            <ConstructorElement
                text={ingredientItem.name}
                price={ingredientItem.price}
                handleClose={() => deleteItem(index)}
                thumbnail={ingredientItem.image_mobile}
            />
        </div>
    )
}
