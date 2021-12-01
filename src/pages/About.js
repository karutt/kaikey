import React, { Component } from 'react'
import { Box, Text } from '../styles'
import Header from '../components/Header'
class About extends Component {
  render() {
    return (
      <Box height="100vh">
        <Header />
        <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
          <Text fontSize={40}>About</Text>
        </Box>
      </Box>
    )
  }
}

export default About
