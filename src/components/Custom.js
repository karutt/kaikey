

import React, { useState, useEffect } from 'react';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { Box, MotionDiv, Text, Icon, } from '../styles'
import { BlueBtn } from '../components/Btn';
const array = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0, "00", 'AC']];
export function Custom(props) {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('カスタム商品');
    return (
        <Box width="100%" height="100%" bg="grayf6" display="flex" alignItems="center" justifyContent="flex-start" flexDirection="column">
            <Box width="100%" height="calc(100% - 80px)" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <Box width={520} lineBottom={true} mb={12}>
                    <Box mb={8} color="black45" textAlign="right" width={520} fontSize={32} as="input" value={name} onChange={(e) => setName(e.target.value)}></Box>
                </Box>

                <MotionDiv
                    bg="grayf6"
                    mb={5}
                    width={520} height={500}
                >
                    <Box
                        line={true} height="24%"
                        borderRadius={6}
                        mb={5} bg="white"
                        display="flex" alignItems="center" justifyContent="flex-end">
                        <Text color='black45' fontSize={64} px={45}>¥{count.toLocaleString()}</Text>
                    </Box>

                    <Box width="100%" height="76%" display="flex" alignItems="center" justifyContent="space-between">
                        <Box width="75%" height="100%">
                            {
                                array.map((item, index) => {
                                    return (
                                        <Box mb={5} display="flex" alignItems="center" justifyContent="space-between" width="100%" height="calc(25% - 5px)" key={index}>
                                            {
                                                item.map((item, index) => {
                                                    return (
                                                        <MotionDiv
                                                            onTap={() => {
                                                                if (item === 'AC') {
                                                                    setCount(0)
                                                                } else if (item === '00') {
                                                                    setCount(Number(count + '00'))
                                                                } else {
                                                                    setCount(Number(count + String(item)))
                                                                }
                                                            }}
                                                            mr={5}
                                                            line={true}
                                                            transition={{ duration: 0.1 }} background="#ffffff"
                                                            whileTap={{ backgroundColor: "rgb(245,245,245)" }}
                                                            display="flex" alignItems="center" justifyContent="center"
                                                            width="33.33333333333%" height="100%" key={index}>
                                                            <Text fontSize={30}>{item}</Text>
                                                        </MotionDiv>
                                                    )
                                                })
                                            }
                                        </Box>
                                    )
                                })
                            }
                        </Box>

                        <Box width="25%" height="100%">
                            <MotionDiv
                                background="#ffffff"
                                transition={{ duration: 0.1 }}
                                whileTap={{ backgroundColor: "rgb(245,245,245)" }}
                                onClick={() => {
                                    if (Number(count) > 9) {
                                        setCount(Number(String(count).slice(0, -1)))
                                    } else {
                                        setCount(0)
                                    }
                                }}
                                display="flex" alignItems="center" justifyContent="center"
                                mb={5} height="calc(25% - 5px)" line={true}>
                                <Icon name="delete_num"></Icon>
                            </MotionDiv>
                            <MotionDiv
                                background="#ffffff"
                                transition={{ duration: 0.1 }}
                                whileTap={{ backgroundColor: "rgb(245,245,245)" }}
                                onClick={() => {
                                    if (props.addItem(name, count, 1, true)) {
                                        setCount(0)
                                    }
                                }}
                                display="flex" alignItems="center" justifyContent="center"
                                mb={5} height="calc(75% - 5px)" line={true}>
                                <Text fontSize={24} >追加</Text>
                            </MotionDiv>
                        </Box>

                    </Box>
                </MotionDiv>
            </Box>
            <Box
                width="100%" height={80}
                bg="white"
                position="absolute" bottom={0} left={0}
                px={10}
                display="flex" alignItems="center" justifyContent="flex-end"
                borderTop="0.5px solid #e6e6e6"
                bg="grayf6"
            >
                <BlueBtn
                    width="50%"
                    onClick={() => props.setResisterIsVisible(true)}
                >
                    支払いへ進む
                </BlueBtn>
            </Box>
        </Box>
    );
}
