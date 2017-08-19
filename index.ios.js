import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Image,
  ScrollView,
  Text
} from 'react-native'
import Trump from './trump3.jpg'

export default class reactNativeParalax extends Component {
  constructor () {
    super()
    this.state = {
      open: false
    }

    this.toggleCard = this.toggleCard.bind(this)
  }

  componentWillMount () {
    this.animated = new Animated.Value(0)
  }

  toggleCard () {
    this.setState(state => ({
      open: !state.open
    }), () => {
      const toValue = this.state.open ? 1 : 0
      Animated.timing(this.animated, {
        toValue,
        duration: 500
      }).start()
    })
  }

  render () {
    const offsetInterpolate = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [191, 0]
    })

    const arrowRotate = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '0deg']
    })

    const offsetStyle = {
      transform: [{
        translateY: offsetInterpolate
      }]
    }

    const arrowStyle = {
      transform: [{
        rotate: arrowRotate
      }]
    }

    const opacityStyle = {
      opacity: this.animated
    }
    return (
      <View style={styles.container}>
        <Image
          source={Trump}
          resizeMode='cover'
          style={styles.background}
        >
          <Animated.View style={[styles.card, offsetStyle]}>
            <TouchableOpacity onPress={this.toggleCard}>
              <View style={styles.header}>
                <View>
                  <Text style={styles.title}>Portland, Oregon</Text>
                  <Text style={styles.date}>June 24th</Text>
                </View>
                <View style={styles.arrowContainer}>
                  <Animated.Text style={[styles.arrow, arrowStyle]}>↓</Animated.Text>
                </View>
              </View>
            </TouchableOpacity>
            <Animated.View style={[styles.scrollViewWrap, opacityStyle]}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc congue rutrum tortor eu luctus. Pellentesque ut libero a lacus ullamcorper pellentesque non sollicitudin ipsum. Vestibulum faucibus odio eget libero mollis, non pharetra justo luctus. Phasellus sagittis vel nunc at venenatis. Integer feugiat, risus sit amet tempus hendrerit, risus neque ullamcorper lacus, sit amet molestie ante purus sit amet metus. Vivamus at diam maximus, ornare mauris eget, iaculis libero. Nullam non eros lacus. Nunc lorem leo, posuere in tincidunt eu, luctus ut metus. Nam eu tellus et elit dignissim dignissim. Sed sollicitudin turpis nec arcu tincidunt elementum. Aenean ex felis, mattis eget dictum et, pharetra rutrum nibh. Nulla lobortis leo erat, non eleifend mi vulputate sed.
                </Text>
              </ScrollView>
            </Animated.View>
          </Animated.View>
        </Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#152536'
  },
  background: {
    width: 300,
    height: 250,
    borderRadius: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)'
  },
  scrollViewWrap: {
    flex: 1
  },
  card: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 4,
    transform: [{
      translateY: 191
    }]
  },
  scrollView: {
    marginTop: 15
  },
  header: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 24,
    color: '#333'
  },
  date: {
    fontSize: 18,
    color: '#333'
  },
  arrowContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  arrow: {
    fontSize: 30,
    color: '#333'
  }
})

AppRegistry.registerComponent('reactNativeParalax', () => reactNativeParalax)
