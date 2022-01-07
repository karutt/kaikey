import React, { useState } from 'react';
import { Box, MotionDiv, Text } from '../styles'
import { Modal } from '../components/Modal';


const spring = {
    ease: [.23, .58, .61, 1.01],
    duration: 0.3
}
export function ItemModal(props) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    return (
        <Box>
            <Modal
                isVisible={props.itemModalIsVisible}
                setVisible={props.setItemModalVisible}
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
                                setName("");
                                setPrice("");
                                props.setItemModalVisible(false)
                            }}
                        >
                            キャンセル
                        </Text>
                        <Text
                            className="pointer bold" fontSize={18} color="blue"
                            onClick={() => {

                                if (props.addItem(name, price)) {
                                    setName("");
                                    setPrice("");
                                    props.setItemModalVisible(false)
                                }
                            }}
                        >
                            追加
                        </Text>
                        <Text fontSize={18} color="black45" className="bold"
                            position="absolute" left="50%" style={{ transform: "translateX(-50%)" }}
                        >
                            新規商品登録
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
                            placeholder="商品名"
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
                                placeholder="価格"
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