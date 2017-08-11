import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native'
import Heart from './heart'

const { width, height } = Dimensions.get('window')

class Page extends Component {
  constructor () {
    super()
    this.state = {
      scale: new Animated.Value(1),
      liked: false,
      heartScale: new Animated.Value(0),
      heartAnimations: [
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0)
      ]
    }
    this.handlePress = this.handlePress.bind(this)
    this.triggerLike = this.triggerLike.bind(this)
  }

  triggerLike () {
    this.setState({
      liked: !this.state.liked
    })
    Animated.spring(this.state.heartScale, {
      toValue: 2,
      friction: 3
    }).start(() => {
      this.state.heartScale.setValue(0)
    })
  }

  componentWillMount () {
    this.bgFadeInterpolate = this.state.scale.interpolate({
      inputRange: [0.9, 1],
      outputRange: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0)']
    })
    this.textFade = this.state.scale.interpolate({
      inputRange: [0.9, 1],
      outputRange: [0, 1]
    })

    this.calloutTranslate = this.state.scale.interpolate({
      inputRange: [0.9, 1],
      outputRange: [0, 150]
    })
  }

  handlePress () {
    if (this.props.focused) {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300
      }).start(() => this.props.onFocus(false))
      return
    }
    Animated.timing(this.state.scale, {
      toValue: 0.9,
      duration: 300
    }).start(() => this.props.onFocus(true))
  }

  render () {
    const animatedStyle = {
      transform: [
        { translateX: this.props.translateX },
        { scale: this.state.scale }
      ]
    }

    const bgFadeStyle = {
      backgroundColor: this.bgFadeInterpolate
    }

    const textFadeStyle = {
      opacity: this.textFade
    }

    const calloutStyle = {
      transform: [{ translateY: this.calloutTranslate }]
    }

    const bouncyHeart = this.state.heartScale.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, 0.8, 1]
    })
    const heartButtonStyle = {
      transform: [
        { scale: bouncyHeart }
      ]
    }
    return (
      <View style={styles.container}>
        <Animated.Image
          source={this.props.image}
          style={[styles.image, animatedStyle]}
          resizeMode='cover'
        />
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <Animated.View style={[StyleSheet.absoluteFill, styles.center, bgFadeStyle]}>
            <Animated.View style={[styles.textWrap, textFadeStyle]}>
              <Text style={styles.title}>{this.props.title}</Text>
            </Animated.View>
          </Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.callout, calloutStyle]}>
          <View>
            <TouchableWithoutFeedback onPress={this.triggerLike}>
              <Animated.View style={heartButtonStyle}>
                <Heart style={{alignSelf: 'center'}} filled={this.state.liked} />
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    overflow: 'hidden'
  },
  image: {
    flex: 1,
    width: null,
    height: null
  },
  center: {
    justifyContent: 'center'
  },
  textWrap: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 10
  },
  title: {
    backgroundColor: 'transparent',
    fontSize: 30,
    color: '#FFF',
    textAlign: 'center'
  },
  callout: {
    height: 150,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
})

export default Page
