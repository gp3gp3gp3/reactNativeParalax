import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  Dimensions,
  Animated
} from 'react-native'
import Page from './Page'

const Images = [
  { image: require('./trump1.jpg'), title: 'Yuh Fihred' },
  { image: require('./trump2.jpg'), title: 'Yuh Fihred' },
  { image: require('./trump3.jpg'), title: 'Yuh Fihred' }
]

const getInterpolate = (animatedScroll, i, imageLength) => {
  const inputRange = [
    (i - 1) * width,
    i * width,
    (i + 1) * width
  ]
  const outputRange = i === 0 ? [0, 0, 150] : [-300, 0, 150]
  return animatedScroll.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp'
  })
}

const { width, height } = Dimensions.get('window')

const getSeparator = i => (
  <View
    key={i}
    style={[styles.seperator, { left: (i - 1) * width - 2.5 }]}
  />
)
export default class reactNativeParalax extends Component {
  constructor () {
    super()
    this.state = {
      animatedScroll: new Animated.Value(0)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView
          pagingEnabled
          horizontal
          scrollEventThrottle={16}
          onScroll={
            Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.state.animatedScroll
                  }
                }
              }
            ])
          }
        >
          {Images.map((image, i) => (
            <Page
              key={i}
              {...image}
              translateX={getInterpolate(this.state.animatedScroll, i, Images.length)}
            />
          ))}
          {Array.apply(null, { length: Images.length + 1 }).map((_, i) => getSeparator(i))}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333'
  },
  seperator: {
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 5
  }
})

AppRegistry.registerComponent('reactNativeParalax', () => reactNativeParalax)
