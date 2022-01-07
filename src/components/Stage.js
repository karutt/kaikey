import React from 'react';
import { Box, MotionDiv, Text } from '../styles';
import { AnimatePresence } from 'framer-motion';
import { Icon } from '../styles'

export function Stage(props) {
    return (
        <Box width="33.333%" bg="grayf6" zIndex={1} position="relative">
            <Box
                py={20} pr={40}
                height={84}
                display="flex" alignItems="center" justifyContent="flex-end"
            >

                <MotionDiv
                    whileTap={{ scale: 0.8 }}
                    onTap={() => props.resetItemsCount()}
                    width={44} height={44}
                    display="flex" alignItems="center" justifyContent="center"
                    border="2px solid #dadada" borderRadius={6}
                    style={{ cursor: "pointer" }}
                >
                    <MotionDiv p={12} whileHover={{ rotate: 360 }}>
                        <Icon name="reset_stage"></Icon>
                    </MotionDiv>
                </MotionDiv>
            </Box>
            <Box height="calc(100vh - 164px)" overflow="scroll">
                <AnimatePresence>
                    {props.items.map((item, index) => {

                        if (item.custom && item.count == 0) {
                            props.deleteItem(item.name);
                        }
                        if (item.count !== 0) {
                            return (
                                <MotionDiv
                                    key={index}
                                    animate={{ opacity: 1, x: 0 }}
                                    initial={{ opacity: 0, x: -150 }}
                                    exit={{ opacity: 0, x: 150 }}
                                    px={10}
                                    transition={{
                                        ease: [.08, .48, 0, .96],
                                        duration: 0.15,
                                    }}
                                    position="relative"
                                    layout>
                                    <Box
                                        onClick={() => props.updateItemCount(item.name, 0)}
                                        position="absolute" right={18} top="0"
                                        zIndex={2}
                                        width={50}
                                        height="100%"
                                        display="flex" alignItems="center" justifyContent="center"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <Icon name="delete_count"  ></Icon>
                                    </Box>
                                    <MotionDiv
                                        key={item.count}
                                        animate={{ backgroundColor: ["#f6f6f6", 'rgba(255,255,255,1)'] }}
                                        transition={{
                                            duration: 0.3,
                                        }}
                                        layout bg="white" py={18} px={40} borderRadius={5} mb={4}>
                                        <Box>
                                            <Text mb={18} color="black45" fontSize={20} fontWeight="600">
                                                {item.name}
                                            </Text>
                                            <Box display="flex" alignItems="center" justifyContent="flex-start">

                                                <MotionDiv
                                                    onClick={(e) => {
                                                        // calculator width={445} height={400}
                                                        let [x, y] = [e.currentTarget.getBoundingClientRect().left, e.currentTarget.getBoundingClientRect().top];
                                                        if (y > window.innerHeight - 400) {
                                                            y = window.innerHeight - 400;
                                                        } else {
                                                            y = y - 100
                                                        }
                                                        props.setCalcTarget(item.name);
                                                        props.setCalcPos({ x: x + 56 + 20, y: y });
                                                    }}
                                                    display="flex" alignItems="center" justifyContent="flex-end"
                                                    bg="grayee" borderRadius={6} width={56} px={14} py={10}>
                                                    <Text fontSize={18} color="black45">
                                                        {item.count}
                                                    </Text>
                                                </MotionDiv>

                                                <Text px={10} fontWeight={600}>×</Text>
                                                <Text fontSize={18} color="black45">
                                                    ¥{item.price}
                                                </Text>

                                            </Box>
                                        </Box>
                                    </MotionDiv>
                                </MotionDiv>
                            )
                        } else {
                            return null
                        }
                    })}
                </AnimatePresence>
            </Box>

            <Box
                position="absolute" bottom={0} left={0}
                width="100%" height={80}
                display="flex" alignItems="center" justifyContent="flex-end"
                px={40}>
                <Text mr="auto" fontSize={16}>
                    {props.getSumCount(props.items)}点
                </Text>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Text fontSize={20} fontWeight="600">
                        ¥{props.getSumPrice(props.items)}
                    </Text>
                    <Text fontSize={14} color="grayc6">
                        （税込）
                    </Text>
                </Box>
                <Text>

                </Text>
            </Box>

        </Box >
    );
}