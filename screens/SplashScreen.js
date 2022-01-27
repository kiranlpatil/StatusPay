import React, { useRef, useEffect } from "react";
import {
  SafeAreaView,
  Image,
  Text,
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

const SwipeUnlock = (props) => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(moveAnim, {
        duration: 2000,
        toValue: Dimensions.get("window").width / 1.6,
        delay: 0,
        useNativeDriver: false,
      }),
      Animated.timing(moveAnim, {
        duration: 2000,
        toValue: 0,
        delay: 0,
        useNativeDriver: false,
      }),
    ]).start();
    Animated.timing(fadeAnim, {
      duration: 2000,
      toValue: 1,
      delay: 2000,
      useNativeDriver: false,
    }).start(() => {
      props.navigation.navigate("Dashboard");
    });
  }, [moveAnim, fadeAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Animated.Image
          style={[styles.image, { opacity: fadeAnim }]}
          source={require("../assets/logo.png")}
        />
        <Animated.View style={[styles.logoContainer, { marginLeft: moveAnim }]}>
          <Text style={[styles.logoText]}>S</Text>
          <Animated.Text style={[styles.logoText, { opacity: fadeAnim }]}>
            tatusPe
          </Animated.Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default SwipeUnlock;

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#00BFFF",
  },
  logoText: {
    fontSize: 35,
    marginTop: 20,
    color: "white",
    fontWeight: "700",
  },
  contentContainer: {
    top: "30%",
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").height / 4,
  },
  logoContainer: {
    flexDirection: "row",
  },
});
