import React from 'react';
import { Box, MotionDiv, Text } from '../styles';

export function BlueBtn(props) {
    return (
        <MotionDiv
            maxWidth={440}
            whileTap={{ opacity: 0.8 }}
            transition={{ duration: 0.05 }}
            style={{ cursor: "pointer" }}
            width={props.width} height={60}
            display="flex" alignItems="center" justifyContent="center" bg="blue"
            borderRadius={6}
            border="1px solid #1C91BF"
            onClick={props.onClick}
            style={{ boxSizing: "border-box" }}
            {...props}
        >
            <Text color='white' fontSize={20} fontWeight="600">
                {props.children}
            </Text>
        </MotionDiv >
    );
}

BlueBtn.defaultProps = {
    width: '100%'
}