import React, { useState } from 'react';
import { Box, MotionDiv, Text, Icon } from '../styles'
import { Modal } from '../components/Modal';

const array = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0, "00", 'AC']];

export function Calculator(props) {
    const [count, setCount] = useState(0);
    return (
        <Modal
            isVisible={props.calcTarget}
            setVisible={props.setCalcTarget}
            top="flex-start"
            left="flex-start"
            opacity={0.1}
            transition={{ duration: 0 }}
        >
            <MotionDiv
                onClick={(e) => e.stopPropagation()}
                bg="white"
                borderRadius={8}
                zIndex={12}
                boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
                position="absolute"
                border="1px solid #c6c6c6"
                width={445} height={400}
                initial={{ x: props.pos.x, y: props.pos.y }}
            >
                <Box display="flex" alignItems="center" justifyContent="flex-end" height={100}>
                    <Text color='black45' fontSize={40} px={45}>{count}</Text>
                </Box>
                <Box width="100%" height="calc(100% - 100px)" display="flex" alignItems="center" justifyContent="space-between">
                    <Box width="75%" height="100%">
                        {
                            array.map((item, index) => {
                                return (
                                    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" height="25%" key={index}>
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
                                                        transition={{ duration: 0.1 }} background="#ffffff"
                                                        whileTap={{ backgroundColor: "rgb(245,245,245)" }}
                                                        borderLeft="solid 1px #c6c6c6" borderTop="solid 1px #c6c6c6"
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
                                    setCount(String(count).slice(0, -1))
                                } else {
                                    setCount(0)
                                }
                            }}
                            borderLeft="solid 1px #c6c6c6" borderTop="solid 1px #c6c6c6" display="flex" alignItems="center" justifyContent="center" height="25%"><Icon name="delete_num"></Icon></MotionDiv>
                        <MotionDiv
                            background="#ffffff"
                            transition={{ duration: 0.1 }}
                            whileTap={{ backgroundColor: "rgb(245,245,245)" }}
                            onClick={() => {
                                props.updateItemCount(props.calcTarget, count);
                                props.setCalcTarget("");
                                setCount(0)
                            }}
                            borderLeft="solid 1px #c6c6c6" borderTop="solid 1px #c6c6c6" display="flex" alignItems="center" justifyContent="center" height="75%">
                            <Text fontSize={24} >決定</Text>
                        </MotionDiv>
                    </Box>

                </Box>
            </MotionDiv>
        </Modal >
    );
}

Calculator.defaultProps = {
    x: 100,
    y: 100,
}