import React, { useState, useEffect } from 'react';
import { Box, MotionDiv, Text, Icon } from '../styles';
import { AnimatePresence } from 'framer-motion';
import { Modal } from '../components/Modal';
import { BlueBtn } from '../components/Btn';
export function Resister(props) {
    const [count, setCount] = useState(0);
    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100%'>
            <Modal
                isVisible={props.resisterIsVisible}
                setVisible={props.setResisterIsVisible}
                transition={spring}
                close={() => { setCount(0) }}
            >
                <MotionDiv
                    onClick={(e) => e.stopPropagation()}
                    width="60vw"
                    height="calc(100% - 32px)"
                    background='#fff'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='flex-start'
                    transition={spring}
                    borderRadius={8}
                    initial={{ opacity: 0, y: "calc(40% - 16px)" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "calc(40% - 16px)" }}
                >
                    <Box flexDirection="column" display="flex" alignItems="center" justifyContent="flex-start" width="100%" height="25%" lineBottom={true}>
                        <Box width="100%" height={40} lineBottom={true} display="flex" alignItems="center" justifyContent="center" fontSize={16}>お支払い</Box>
                        <Text height="calc(100% - 40px)" display="flex" alignItems="center" justifyContent="center" fontSize={90} fontWeight="600">¥{props.sumPrice.toLocaleString()}</Text>
                    </Box>
                    <Calculator count={count} setCount={setCount} sumPrice={props.sumPrice}></Calculator>
                    <Box width="100%" height={90} bg="grayf6" display="flex" alignItems="center" justifyContent="center">
                        <Box width="50%" px={32} display="flex" alignItems="center" justifyContent="flex-end">
                            <Text mr="auto" fontSize={20} color={(count - props.sumPrice) < 0 ? "red" : "black45"}>{(count - props.sumPrice) < 0 ? "未精算" : "お釣り"}</Text>
                            <Text fontSize={20} color={(count - props.sumPrice) < 0 ? "red" : "black45"}>¥{count - props.sumPrice}</Text>
                        </Box>
                        <BlueBtn width="calc(50% - 10px)" mx={5}>お会計</BlueBtn>
                    </Box>
                </MotionDiv>
            </Modal>
        </Box >
    );
}



export function Calculator({ count, setCount, sumPrice }) {
    const [a, b] = charge(sumPrice);
    const array = [[a, b, <Icon name="delete_num"></Icon>], [7, 8, 9], [4, 5, 6], [1, 2, 3], [0, "00", 'AC']];
    return (
        <Box height="calc(75% - 90px)" width="100%" display="flex" alignItems="flex-start" bg="grayf6" pt={5} lineBottom={true}>
            <Box width="50%" >
                <Box border="solid 0.5px #e6e6e6" px={32} height={170} bg="white" display="flex" alignItems="center" justifyContent="flex-end">
                    <Text color="grayc6" fontSize={20} mr="auto">現金</Text>
                    <Text color='black45' fontSize={40}>¥{count.toLocaleString()}</Text>
                </Box>
            </Box>

            <Box width="50%" height="100%" display="flex" alignItems="center" justifyContent="space-between" style={{ boxSizing: "border-box" }}>
                <Box width="100%" height="100%" pl={5} >
                    {
                        array.map((item, row) => {
                            return (
                                <Box mb={5} bg="grayf6" display="flex" alignItems="center" justifyContent="space-between" width="100%" height="calc(20% - 5px)" key={row}>
                                    {
                                        item.map((item, col) => {
                                            return (
                                                <MotionDiv
                                                    onTap={() => {
                                                        if (item === 'AC') {
                                                            setCount(0)
                                                        } else if (row == 0 && (col == 0 | col == 1)) {
                                                            setCount(Number(item))
                                                        } else if (row == 0 && col == 2) {
                                                            setCount(Number(String(count).slice(0, -1)))
                                                        } else if (item === '00') {
                                                            setCount(Number(count + '00'))
                                                        } else {
                                                            setCount(Number(count + String(item)))
                                                        }
                                                    }}
                                                    mr={5}
                                                    bg="white"
                                                    transition={{ duration: 0.1 }}
                                                    whileTap={{ backgroundColor: "rgb(245,245,245)" }}
                                                    display="flex" alignItems="center" justifyContent="center"
                                                    borderRadius={6}
                                                    border="solid 0.5px #e6e6e6"
                                                    width="33.33333333333%" height="100%" key={col}>
                                                    <Text fontSize={24}>{item}</Text>
                                                </MotionDiv>
                                            )
                                        })
                                    }
                                </Box>
                            )
                        })
                    }
                </Box>

            </Box>

        </Box>
    );
}

const charge = (sumPrice) => {
    let num = Number(sumPrice.toString().slice(-2))
    let num3 = Number(sumPrice.toString().slice(-3))
    if (sumPrice >= 0 && sumPrice <= 50) {
        return [50, 100];
    } else if (sumPrice >= 50 && sumPrice <= 100) {
        return [100, 500];
    } else if (sumPrice > 100 && sumPrice <= 500) {
        if (num <= 50) {
            if (num === 0) {
                return [Math.ceil(sumPrice / 10, 2) * 10, 500];
            } else {
                return [Math.ceil(sumPrice / 10, 2) * 10, (Number(String(sumPrice)[0]) + 1) * 100];
            }
        } else {
            return [(Number(String(sumPrice)[0]) + 1) * 100, 500];
        }
    } else if (sumPrice < 1000) {
        if (num === 0) {
            return [(Number(String(sumPrice)[0])) * 100, 1000];
        } else {
            return [(Number(String(sumPrice)[0]) + 1) * 100, 1000];
        }
    } else {
        if (num3 < 500) {
            if (num3 == 0) {
                if (Number(sumPrice.toString()[0]) < 5) {
                    return [(Math.ceil(Number(sumPrice) / 100, 2)) * 100, 5000];
                } else {
                    return [(Math.ceil(Number(sumPrice) / 100, 2)) * 100, 10000];
                }
            }
            else if (num3 <= 300) {
                return [(Math.ceil(Number(sumPrice) / 100, 2)) * 100, (Number(String(sumPrice)[0])) * 1000 + 500];
            } else {
                return [(Number(String(sumPrice)[0])) * 1000 + 500, (Number(String(sumPrice)[0]) + 1) * 1000];
            }
        } else {
            const a = (Math.ceil(Number(sumPrice) / 100, 2)) * 100;
            const b = (Number(String(sumPrice)[0]) + 1) * 1000;
            if (a !== b) {
                return [a, b];
            } else {
                return [a, b + 1000];
            }
        }
    }
}
const spring = {
    ease: [.23, .58, .61, 1.01],
    duration: 0.2
}