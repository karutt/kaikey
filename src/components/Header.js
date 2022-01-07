import React from "react";
import { MotionDiv, Box, Text } from '../styles'

export function Header(props) {
  return (
    <Box height={80} width="100%" display="flex" alignItems="center" justifyContent="center" lineBottom={true}>
      <Box as="ul" display="flex" background="#fff">
        {props.tabs.map((title, i) => (
          <Item
            key={title}
            title={title}
            isSelected={props.selectedTab === title}
            onClick={() => props.setSelectedTab(title)}
            i={i}
            len={props.tabs.length}
          />
        ))}
      </Box>
    </Box >
  );
}

function Item({ title, isSelected, onClick, i, len }) {
  return (
    <Box position="relative"
      px={2}
      width={200}
      height={42}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="graye6"
      borderRadius={i === 0 ? "8px 0 0 8px" : i === (len - 1) ? "0 8px 8px 0" : 0}
      className="item" onClick={onClick} style={{ listStyle: "none", cursor: "pointer" }}
    >


      {isSelected && (
        <MotionDiv
          height={38}
          width="calc(100% - 4px)"
          borderRadius={6}
          position="absolute"
          bg="white"
          layoutId="unserline"
          initial={false}
          transition={spring}
          zIndex={1}
          boxShadow="2px 2px 4px rgba(0, 0, 0, 0.10)"
        />
      )}
      <Text
        fontWeight={isSelected ? "600" : "400"}
        className="bold"
        fontSize={16}
        color={isSelected ? "black" : "black45"}
        fontFamily="Noto Sans JP"
        zIndex={2}>
        {title}
      </Text>
    </Box >
  );
}

// const tabs = ["会計", "カスタム商品", "ヒストリー"];
const spring = {
  ease: [.08, .48, 0, .96],
  duration: 0.3,
};
