import React, { useState } from 'react';
import { Box, MotionDiv, Text } from '../styles'
import { AnimatePresence } from 'framer-motion';
import { Modal } from '../components/Modal';

const spring = {
    ease: [.23, .58, .61, 1.01],
    duration: 0.3
}

export function EditItemModal(props) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    function reset() {
        setName("");
        setPrice("");
    }
    return (
        <Box>
            <Modal
                isVisible={props.editTarget}
                setVisible={props.setEditTarget}
                transition={spring}
                opacity={0.3}
            >
                <MotionDiv
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        width: "60%",
                        height: "calc(100% - 40px)",
                        maxHeight: "640px",
                        maxWidth: "660px",
                        minWidth: "500px",
                        background: "#ffffff",
                        borderRadius: 8,
                    }}
                    transition={spring}
                    initial={{ opacity: 1, y: "120%" }}
                    animate={{ opacity: 1, y: "0" }}
                    exit={{ opacity: 1, y: "120%" }}
                >
                    <Box position="relative" p={20} display="flex" alignItems="center" justifyContent="space-between">
                        <Text
                            className="pointer bold" fontSize={18} color="blue"
                            onClick={() => {
                                reset();
                                props.setEditTarget("")
                            }}
                        >
                            キャンセル
                        </Text>
                        <Text
                            className="pointer bold" fontSize={18} color="blue"
                            onClick={() => {
                                if (name && price) {
                                    props.updateItemPrice(props.editTarget, price);
                                    props.updateItemName(props.editTarget, name);
                                    reset();
                                    props.setEditTarget("")
                                } else {
                                    alert("入力が不正です。")
                                }

                            }}
                        >
                            更新
                        </Text>
                        <Text fontSize={18} color="black45" className="bold"
                            position="absolute" left="50%" style={{ transform: "translateX(-50%)" }}
                        >
                            登録商品の編集
                        </Text>
                    </Box>

                    <Box mt={20}>
                        <Box as="input"
                            lineBottom={true}
                            fontSize={24}
                            fontWeight={500}
                            height={120}
                            pl={70}
                            color="black45"
                            placeholder={props.editTarget}
                            style={{ boxSizing: "border-box" }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text" />
                        <Box display="flex" alignItems="center" justifyContent="flex-start" lineBottom={true}>
                            <Text fontSize={24}
                                fontWeight={500}
                                color="grayc6" pl={70}>¥</Text>
                            <Box as="input"
                                fontSize={24}
                                fontWeight={500}
                                height={120}
                                color="black45"
                                placeholder={props.editTargetPrice}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                style={{ boxSizing: "border-box" }}
                                type="text" />
                        </Box>
                    </Box>

                </MotionDiv>
            </Modal>
        </Box >
    );
}