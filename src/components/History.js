
import React, { useState, useEffect } from 'react';
import { Box, MotionDiv, Text, Icon } from '../styles';

export function History(props) {
    const [count, setCount] = useState(0);
    return (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">

            {props.history.map((item, index) => {
                return (

                    <Dropdown
                        head={
                            <Box
                                key={index}
                                width="100%"
                                height={70}
                                display="flex"
                                alignItems="center"
                                justifyContent="flex-end"
                                // lineBottom={!isVisible}
                                px={46}
                                bg="white"
                            >
                                <MotionDiv width={40} onTap={() => {
                                    {
                                        props.resetItemsCount()
                                        item.items.map((value, index) => {
                                            props.addItem(value.name, value.price, value.count, true, false)
                                            props.updateItemCount(value.name, value.count)
                                        })
                                        props.deleteHistory(item.id)
                                    }
                                }}>
                                    <Icon
                                        name="left_arrow" />
                                </MotionDiv>
                                <Text fontSize={18} fontWeight="bold">
                                    {item.date}
                                </Text>

                                <Text ml="auto" fontSize={18} fontWeight="bold" display="flex" alignItems="center" justifyContent="flex-start">
                                    <Box mr={30}>合計</Box>
                                    <Text fontSize={14}>{item.sumCount}点</Text>
                                    <Box textAlign="right" width={104}>¥{item.total_price}</Box>
                                </Text>
                            </Box>
                        }>
                        <Box pb={14} display="flex" flexDirection="column" alignItems="flex-end" justifyContent="flex-end" width="100%" lineBottom={true} >
                            <Box
                                width="100%"
                                display="flex"
                                alignItems="flex-start"
                                justifyContent="flex-start"
                                // lineBottom={true}
                                flexDirection="column"
                                bg="white"
                                mr={46}
                            >
                                <Text width={200} mb={20} ml="auto" fontSize={18} fontWeight="normal" display="flex" alignItems="center" justifyContent="flex-end">
                                    <Box >お預かり</Box>
                                    <Text width={104} textAlign="right" fontSize={17}>¥{item.received}円</Text>
                                </Text>
                                <Text width={200} mb={20} ml="auto" fontSize={18} fontWeight="normal" display="flex" alignItems="center" justifyContent="flex-end">
                                    <Box>お釣り</Box>
                                    <Text width={104} textAlign="right" fontSize={17}>¥{item.received - item.total_price}円</Text>
                                </Text>


                            </Box>


                            {item.items.map((item, index) => {
                                return (
                                    <Box
                                        key={index}
                                        width="66%"
                                        maxWidth={540}
                                        height={50}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="flex-start"
                                        lineTop={true}
                                        px={46}
                                        bg="white"
                                    >
                                        <Text fontSize={16}>{item.name}</Text>
                                        <Text ml="auto" fontSize={14}>{item.count}点</Text>
                                        <Text fontSize={16} fontWeight="normal" display="flex" alignItems="center" justifyContent="flex-start">
                                            <Box textAlign="right" width={104}>¥{item.price}</Box>
                                        </Text>
                                    </Box>
                                )
                            })}
                        </Box>

                    </Dropdown>

                )
            })
            }

        </Box >
    );
}

const variants = {
    open: {
        opacity: 1,
        height: "auto",
        y: 0,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        }
    },
    closed: {
        opacity: 0,
        height: 0,
        y: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

function Dropdown(props) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <MotionDiv width="100%" display="flex" flexDirection="column-reverse" overflow="hidden" lineBottom={!isVisible}>
            <MotionDiv
                variants={variants}
                initial="closed"
                animate={isVisible ? "open" : "closed"}
                width="100%"
                display="flex"

                zIndex={0}
            >
                {props.children}
            </MotionDiv>
            <MotionDiv
                width="100%"
                display="flex" alignItems="center" justifyContent="center"
                className='pointer'
                onTap={() => {
                    setIsVisible(!isVisible)
                }}
                zIndex={1}
            >
                {props.head}
            </MotionDiv>

        </MotionDiv >
    );
}