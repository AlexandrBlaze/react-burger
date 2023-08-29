import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef} from "react";
import burgerConstructorItemStyles from './BurgerConstructorItem.module.css';
import {useDrag, useDrop} from "react-dnd";
import {moveCard} from "../../../services/actions/burgerConstructorActions";
import {useDispatch} from "react-redux";
import {ingredientItem} from "../../../constants/ingredientItem";
import PropTypes from "prop-types";

BurgerConstructorItem.propTypes = {
    item: PropTypes.objectOf(ingredientItem),
    index: PropTypes.number,
    deleteItem: PropTypes.func,
}
export function BurgerConstructorItem({index, item, deleteItem}) {
    const dispatch = useDispatch();
    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'sort',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            dispatch(moveCard(dragIndex, hoverIndex));

            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: 'sort',
        item: () => {
            return { item, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))
    return (
        <div ref={ref}
             data-handler-id={handlerId}
             className={burgerConstructorItemStyles.item}
             style={{opacity}}>
                <span className="mr-2">
                    <DragIcon type="primary" />
                </span>
            <ConstructorElement
                text={item.name}
                price={item.price}
                handleClose={() => deleteItem(index)}
                thumbnail={item.image_mobile}
            />
        </div>
    )
}
