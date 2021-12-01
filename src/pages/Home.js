import React, { Component } from 'react'

import { Box, MotionDiv, Logo_svg, Text } from '../styles'
import Header from '../components/Header'

class Home extends Component {
  render() {
    return (
      <Box height="100vh">
        <Header />
        <Box height="100%" display="flex" alignItems="center" justifyContent="center">
          <Box display="flex" flexDirection="column" alignItems="center" >
            <Logo_svg name="Logo" width={130} height={130} />
            <Text color="black" fontSize={18} mt={20}>Welcame to the my app.</Text>
          </Box>
        </Box>
      </Box>
    )
  }
}

export default Home
