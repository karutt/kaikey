import React, { useState } from 'react';
import { MotionDiv, Box, Text } from '../styles'
import { Icon } from '../styles'
import { useMotionValue, Reorder, useDragControls } from "framer-motion"
import { useRaisedShadow } from "../components/useRaisedShadow";
import { LayoutGroup, AnimatePresence } from 'framer-motion';

import { BlueBtn } from '../components/Btn';

export function Items(props) {

    return (
        <Box position="relative" height="calc(100%)">
            {/* ---------------- 追加・編集ボタン ----------------- */}
            <Box
                width="100%" height={46}
                display="flex" alignItems="center" justifyContent="flex-end"
                bg="white"
            >
                <Icon mr={32} name="edit_stroke1" onClick={() => props.setEditMode()} />
                <MotionDiv onTap={() => props.setItemModalVisible(true)}>
                    <Icon mr={45} name="add_item" />
                </MotionDiv>
            </Box>
            {/* ------------------- end ---------------------- */}

            {/* ---------------- 商品リスト ----------------- */}
            <ReorderGroup {...props} />
            {/* ------------------- end ---------------------- */}

            {/* ------------------ 支払いボタン ------------------ */}
            <Box
                width="100%" height={80}
                bg="white"
                position="absolute" bottom={0} left={0}
                px={10}
                display="flex" alignItems="center" justifyContent="flex-end"
                borderTop="0.5px solid #e6e6e6"
            >
                <BlueBtn
                    width="50%"
                    onClick={() => props.setResisterIsVisible(true)}
                >
                    支払いへ進む
                </BlueBtn>
            </Box>
            {/* ------------------- end ---------------------- */}
        </Box>
    );
}

function ReorderGroup(props) {


    const [isDragged, setIsDragged] = useState(false)

    window.addEventListener('touchmove', function (event) {
        if (isDragged) {
            event.preventDefault();
            setIsDragged(false)
        }
    }, { passive: false, once: true });

    return (
        <LayoutGroup>
            <Reorder.Group
                as="ul"
                axis="y"
                values={props.ids}
                onReorder={props.setIds}
                className="reorder_ul"
                style={{ overflow: "scroll", height: "calc(100% - 120px" }}
            >

                {props.ids.map((id) => {
                    const item = props.items[id]
                    return (!item.custom) && (
                        <ReorderItem
                            key={id}
                            index={id}
                            item={item}
                            editMode={props.editMode}
                            deleteItem={props.deleteItem}
                            setEditTarget={props.setEditTarget}
                            incrementItemCount={props.incrementItemCount}
                            isDragged={isDragged}
                            setIsDragged={setIsDragged}
                        />
                    )
                }
                )}

            </Reorder.Group>
        </LayoutGroup>
    )
}

function ReorderItem({ item, index, deleteItem, editMode, setEditTarget, incrementItemCount, isDragged, setIsDragged }) {

    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y, setIsDragged);
    const dragControls = useDragControls()
    return (
        <Reorder.Item
            value={index}
            style={{ boxShadow, y }}
            dragListener={false}
            dragControls={dragControls}
            className="reorder_list"
        >
            <MotionDiv
                key={index}
                height={70}
                display="flex" alignItems="center" justifyContent="flex-start"
                lineBottom={true}
                px={46}
                bg="white"
                whileTap={{ backgroundColor: editMode ? "#fff" : '#f5f5f5' }}
                onTap={() => {
                    if (!editMode) {
                        incrementItemCount(item.name)
                    }
                }}
                transition={{ duration: 0.1 }}
                onPointerUp={(event) => {
                    setIsDragged(false)
                }}
            >

                <AnimatePresence exitBeforeEnter>
                    <MotionDiv
                        key={editMode ? index : "empty"}
                        animate={{ opacity: 1, x: 0 }}
                        initial={{ opacity: isDragged ? 1 : 0, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={spring}
                        layout
                    >
                        {editMode ?
                            <MotionDiv
                                mr={36}
                                onClick={() => deleteItem(item.name)}
                                layout
                            >
                                <Icon name="delete_item" />
                            </MotionDiv>
                            : null
                        }
                    </MotionDiv>
                </AnimatePresence>


                <MotionDiv layout
                    mr={10}
                    padding={12}
                    ml={-12}
                    borderRadius={5}
                    style={{ cursor: editMode ? "pointer" : "default" }}
                    animate={{ background: editMode && !isDragged ? "rgba(246,246,246,1)" : "rgba(255, 255, 255, 0)" }}
                    transition={spring}
                    onTap={() => {
                        if (editMode) {
                            setEditTarget(item.name)
                        }
                    }}>
                    <Text fontWeight={600} fontSize={18} color="black45">
                        {item.name}
                    </Text>
                </MotionDiv>

                <MotionDiv layout
                    ml={"auto"}
                    animate={{ background: editMode && !isDragged ? "rgba(246,246,246,1)" : "rgba(255, 255, 255, 0)" }}
                    transition={spring}
                    padding={12}
                    mr={-12}
                    borderRadius={5}
                    style={{ cursor: editMode ? "pointer" : "default" }}
                    onTap={() => {
                        if (editMode) {
                            setEditTarget(item.name)
                        }
                    }}
                >
                    <Text fontSize={18} color="black45">
                        ¥{item.price}
                    </Text>
                </MotionDiv>


                <AnimatePresence exitBeforeEnter>
                    <MotionDiv
                        key={editMode ? index : "empty"}
                        animate={{ opacity: 1, x: 0 }}
                        initial={{ opacity: isDragged ? 1 : 0, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={spring}
                        layout
                    >
                        {editMode ?
                            <MotionDiv
                                ml={36}
                                onPointerDown={(event) => {
                                    setIsDragged(true)
                                    return dragControls.start(event)
                                }}

                                className="reorder_list"
                                layout
                            >
                                <Icon name="reorder" width={24} height={70} />
                            </MotionDiv>
                            : null
                        }
                    </MotionDiv>
                </AnimatePresence>

            </MotionDiv>


        </Reorder.Item>
    )
}


// const tabs = ["会計", "カスタム商品", "ヒストリー"];
const spring = {
    ease: [.44, .59, .69, .94],
    duration: 0.15,
};