import React, { useState, useEffect } from 'react';
import { Box, MotionDiv, Text } from '../styles';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { Header } from '../components/Header';

export function History(props) {
    const [count, setCount] = useState(0);
    return (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            {props.history.map((item, index) => {
                console.log(item)
                return (
                    <MotionDiv
                        key={index}
                        width="100%"
                        height={70}
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-end"
                        lineBottom={true}
                        px={46}
                    >
                        <Text fontSize={18} fontWeight="bold">
                            {item.date}
                        </Text>
                        <Text ml="auto" mr={56} fontSize={14}>{item.sumCount}点</Text>
                        <Text fontSize={18} fontWeight="bold" display="flex" alignItems="center" justifyContent="flex-start">
                            <Box mr={30}>合計</Box>
                            <Box>¥{item.total_price}</Box>
                        </Text>

                        {/* <Box>{item.items}</Box> */}
                    </MotionDiv>
                )
            })
            }
        </Box>
    );
}