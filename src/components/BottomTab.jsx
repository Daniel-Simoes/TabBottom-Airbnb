import React from "react";
import { 
  Dimensions, 
  SafeAreaView, 
  StyleSheet, 
  View,
  Text,
} from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Icon from 'components/Icon';
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { clamp, onGestureEvent, withSpring} from  "react-native-redash/lib/module/v1";
import Animated from "react-native-reanimated";

const { Value, interpolateNode, Extrapolate } = Animated; 
const { height } = Dimensions.get("window");
const TABBAR_HEIGHT = getBottomSpace() + 100;
const MINIMIZED_PLAYER_HEIGHT = 40;
const SNAP_TOP = 0;
const SNAP_BOTTOM = height - MINIMIZED_PLAYER_HEIGHT;
const config = {
  damping: 60,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1
};

const BottomTab = () => {

  const translationY = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const offset = new Value(SNAP_BOTTOM);
  const usePanGestureHandler = onGestureEvent({
    translationY,
    state,
    velocityY
  });
 
  const translateY = withSpring({
    value: clamp(translationY, SNAP_TOP, SNAP_BOTTOM),
    velocity: velocityY,
    offset,
    state,
    snapPoints: [SNAP_TOP + height/2, SNAP_BOTTOM],
    config
  });

  const opacity = interpolateNode(translateY, {
    inputRange: [SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT, SNAP_BOTTOM],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const translateBottomTab = interpolateNode(translateY, {
    inputRange: [SNAP_TOP, SNAP_BOTTOM],
    outputRange: [0, TABBAR_HEIGHT],
    extrapolate: Extrapolate.CLAMP
  });

  return (
    <>
    <PanGestureHandler {...usePanGestureHandler}>
      <Animated.View style={[styles.playerSheet, { transform: [{ translateY }] }]}>
        <View style={styles.modal} onPress={() => true}>
          <View style={styles.push}/>
          <View style={styles.main}>
            <Text style={styles.text}>Content</Text>
          </View>
        </View>
        <Animated.View
          style={{
            opacity,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: MINIMIZED_PLAYER_HEIGHT
          }}
        >
        <View style={styles.topBar}>
        <View style={styles.push}/>
          <View style={styles.top}>
            <Text style={styles.text}>Top bar Menu</Text>
          </View>
        </View>
        </Animated.View>
      </Animated.View>
      </PanGestureHandler>
      <Animated.View style={{ transform: [{ translateY: translateBottomTab }] }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.tabNav}>
            <Icon name="house" color={"#c2c2c2"} size={28} />
            <Icon name="heart" color={"#c2c2c2"} size={28} />
            <Icon name="search" color={"#c2c2c2"} size={28} />
            <Icon name="message" color={"#c2c2c2"} size={28} />
            <Icon name="person-circle" color={"#c2c2c2"} size={28} />
          </View>
        </SafeAreaView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  playerSheet: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: TABBAR_HEIGHT,
    flexDirection: "row",
    borderTopColor: "#dadada",
    borderWidth: 0.3,
    backgroundColor:"#FFF",
  }, 
  tabNav: {
    flex:1, 
    flexDirection:"row", 
    marginTop:10,
    justifyContent:"space-around",
  },
  push: {
    width:30,
    alignItems:"center",
    backgroundColor:"#c2c2c2",
    height:3,
    marginTop:5,
    borderRadius:10
  },
  modal: { 
    backgroundColor:"#ffffff",
    borderTopRightRadius:15, 
    borderTopLeftRadius:15, 
    flex:1, 
    alignItems:"center",
  },
  main: { 
    flex:1, 
    alignItems:"center",
    justifyContent:"center",
  },
  topBar: {
    flex:1,
    backgroundColor:"#f4f3f3", 
    borderTopRightRadius:15, 
    borderTopLeftRadius:15, 
    alignItems:"center"
  },
  text: {
    fontSize:18,
    fontWeight:"700"
  },
  top: {
    flex:1, 
    alignItems:"center",
    justifyContent:"center",
  }
});

export default BottomTab;
