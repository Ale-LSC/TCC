import { View, Text, Image } from 'react-native'
import React from 'react'

const Logo = () => {
  return (
    <View>
      <Image source = { require("../assets/logo.png")} style = {{width: 360, height : 200}}/>
    </View>
  )
}

export default Logo;