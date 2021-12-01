import React from 'react'

import { Box, Clickable, Text } from '../styles'

export default function Header() {
  return (
    <Box position="absolute" display="flex" alignItems="center" height={100} width="100vw">
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100vw" px="10%">
        <Text fontSize={20}>My-app</Text>
        <Box>
          <Clickable to={{ pathname: "/" }} exact={true} fontSize={16} color="#999" mr={20}>Home</Clickable>
          <Clickable to={{ pathname: "/about" }} fontSize={16} color="#999" mr={20}>About</Clickable>
          <Clickable as="a" href="https://note.com" color="#999">Note</Clickable>
        </Box>
      </Box>
    </Box>
  )
}
