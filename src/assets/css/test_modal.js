import React, { useState } from 'react';
import { Box, MotionDiv, Text } from '../styles'
import { AnimatePresence } from 'framer-motion';
import { Icon } from '../styles'
export function ItemModal() {
    const [isVisible, setVisible] = useState(false);
    return (
        <Box>
            <MotionDiv
                onTap={() => {
                    setVisible(!isVisible)
                }}
            >
                <Icon mr={45} name="add_item" />
            </MotionDiv>
            <AnimatePresence >
                {isVisible && (
                    <MotionDiv
                        style={{
                            width: "100%",
                            height: "100vh",
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            position: 'absolute',
                            top: "-80px",
                            left: 0,
                            zIndex: 1,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isVisible && (
                    <MotionDiv
                        style={{
                            width: "640px",
                            height: "calc(100vh - 140px)",
                            backgroundColor: 'white',
                            borderRadius: 8,
                            position: 'absolute',
                            top: "calc(50vh + 70px)",
                            left: "50%",
                            zIndex: 2,
                        }}
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1, x: "-50%", y: "calc(-50vh - 80px)" }}
                        exit={{ opacity: 0, scale: 0 }}
                    />
                )}
            </AnimatePresence>
        </Box>
    );
}