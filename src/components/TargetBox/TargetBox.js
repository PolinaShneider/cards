import React from 'react'
import {NativeTypes} from 'react-dnd-html5-backend'
import {useDrop} from 'react-dnd'
import notifier from "codex-notifier";
import "./TargetBox.css";

export const TargetBox = props => {
    const {onDrop} = props;
    const [{canDrop, isOver}, drop] = useDrop({
        accept: [NativeTypes.FILE],
        drop(props, monitor ){
            const droppedImage = monitor.getItem().files[0];

            if (!/^image\//.test(droppedImage.type)) {
                notifier.show({
                    style: 'info',
                    message: 'Only image files are acceptable'
                });

                return;
            }

            if (onDrop) {
                onDrop(props, monitor)
            }
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    const classes = ["TargetBox"];
    canDrop && isOver && classes.push("TargetBox-active");

    return (
        <div ref={drop} className={classes.join(" ")}/>
    )
};
