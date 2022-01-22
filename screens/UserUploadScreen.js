import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  SafeAreaView,
  Modal,
  Alert,
  TextInput,
} from "react-native";
import { getAPI } from "../services/http-delegate.service";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { RadioButton } from "react-native-paper";
import httpDelegateService from "../services/http-delegate.service";

let SCREEN_WIDTH = Dimensions.get("window").width;
let SCREEN_HEIGHT = Dimensions.get("window").height;

export default class UserUploadScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      rejectModalVisible: false,
      activeImage: null,
      userUploads: [],
      value: "",
      checked: false,
    };
    this.allImages = {};
    this.oldPosition = {};
    this.position = new Animated.ValueXY();
    this.dimensions = new Animated.ValueXY();
    this.animation = new Animated.Value(0);
    this.activeImageStyle = null;
  }

  async componentDidMount() {
    const result = await getAPI(
      "https://statuspe.herokuapp.com/user/user-uploads?client_id=" +
      this.props.route.params.clientId.toString()
    );
    this.setState({ userUploads: JSON.parse(result.user_uploads).images });
  }

  setModalVisible = (visible, modalName, action) => {
    this.setState({ value: "" });
    this.setState({ checked: false });
    if (modalName === "accept") {
      this.setState({ modalVisible: visible });
    } else {
      this.setState({ rejectModalVisible: visible });
    }
    if (action === "save") {
      if (modalName === "accept") {
        let body = {
          client_id: this.props.route.params.clientId.toString(),
          user_id: this.state.activeImage.user_id,
          is_approved: true,
          views: this.state.value,
        };
        httpDelegateService(
          "https://statuspe.herokuapp.com/user/approve-image",
          body
        ).then((result) => {
          if (result.Status.toLowerCase() === "success") {
            console.log("Success");
            Alert.alert("Success");
            this.closeImage();
          } else {
            Alert.alert("Failed!");
          }
        });
      } else {
        let body = {
          client_id: this.props.route.params.clientId.toString(),
          user_id: this.state.activeImage.user_id,
          is_approved: false,
          reason: this.state.checked,
        };
        console.log(body);
        httpDelegateService(
          "https://statuspe.herokuapp.com/user/approve-image",
          body
        ).then((result) => {
          if (result.Status.toLowerCase() === "success") {
            console.log("Success");
            Alert.alert("Success");
            this.closeImage();
          } else {
            Alert.alert("Failed!");
          }
        });
      }
    }
  };

  checkForValidNumber = (value) => {
    value = value.replace(".", "");
    value = value.replace(",", "");
    value = value.replace(" ", "");
    if (value.split("").length > 4) {
      value = value.slice(0, -1);
      this.setState({ value });
    } else {
      this.setState({ value });
    }
  };

  setModalValue = (value) => {
    this.state.checked(value);
  };

  openImage = (index) => {
    this.allImages[index].measure((x, y, width, height, pageX, pageY) => {
      this.oldPosition.x = pageX;
      this.oldPosition.y = pageY;
      this.oldPosition.width = width;
      this.oldPosition.height = height;

      this.position.setValue({
        x: pageX,
        y: pageY,
      });

      this.dimensions.setValue({
        x: width,
        y: height,
      });

      this.setState(
        {
          activeImage: this.state.userUploads[index],
        },
        () => {
          this.viewImage.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {
            Animated.parallel([
              Animated.timing(this.position.x, {
                toValue: dPageX,
                duration: 300,
              }),
              Animated.timing(this.position.y, {
                toValue: dPageY,
                duration: 300,
              }),
              Animated.timing(this.dimensions.x, {
                toValue: dWidth,
                duration: 300,
              }),
              Animated.timing(this.dimensions.y, {
                toValue: dHeight,
                duration: 300,
              }),
              Animated.timing(this.animation, {
                toValue: 1,
                duration: 300,
              }),
            ]).start();
          });
        }
      );
    });
  };
  closeImage = () => {
    Animated.parallel([
      Animated.timing(this.position.x, {
        toValue: this.oldPosition.x,
        duration: 300,
      }),
      Animated.timing(this.position.y, {
        toValue: this.oldPosition.y,
        duration: 250,
      }),
      Animated.timing(this.dimensions.x, {
        toValue: this.oldPosition.width,
        duration: 250,
      }),
      Animated.timing(this.dimensions.y, {
        toValue: this.oldPosition.height,
        duration: 250,
      }),
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 250,
      }),
    ]).start(() => {
      this.setState({
        activeImage: null,
      });
    });
  };

  render() {
    const activeImageStyle = {
      width: this.dimensions.x,
      height: this.dimensions.y,
      left: this.position.x,
      top: this.position.y,
    };

    const animatedContentY = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 0],
    });

    const animatedContentOpacity = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1],
    });

    const animatedContentStyle = {
      opacity: animatedContentOpacity,
      transform: [
        {
          translateY: animatedContentY,
        },
      ],
    };

    const animatedCrossOpacity = {
      opacity: this.animation,
    };
    const { modalVisible, rejectModalVisible, userUploads, value, checked } =
      this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible, "accept");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Input Total View Count</Text>
              <View style={styles.textInputBox}>
                <TextInput
                  style={styles.text}
                  placeholder="Views"
                  keyboardType="number-pad"
                  maxLength={3}
                  value={value}
                  onChangeText={(value) => this.checkForValidNumber(value)}
                />
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  this.setModalVisible(!modalVisible, "accept", "save")
                }
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={rejectModalVisible}
          onRequestClose={() => {
            this.setModalVisible(!rejectModalVisible, "reject");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Select Rejection Reason</Text>
              <RadioButton.Group
                onValueChange={(value) => this.setState({ checked: value })}
                value={checked}
              >
                <RadioButton.Item label="Fraud" value="Fraud" />
                <RadioButton.Item label="Wrong Client" value="Wrong Client" />
                <RadioButton.Item label="Wrong User" value="Wrong User" />
                <RadioButton.Item label="Wrong Image" value="Wrong Image" />
              </RadioButton.Group>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  this.setModalVisible(!rejectModalVisible, "reject", "save")
                }
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <ScrollView style={{ flex: 1 }}>
          {userUploads &&
          userUploads.map((image, index) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => this.openImage(index)}
                key={index}
              >
                <Animated.View
                  style={{
                    height: SCREEN_HEIGHT - 150,
                    width: SCREEN_WIDTH,
                    padding: 15,
                  }}
                >
                  <Image
                    ref={(image) => (this.allImages[index] = image)}
                    source={{ uri: image.image_path }}
                    style={{
                      flex: 1,
                      height: null,
                      width: null,
                      resizeMode: "cover",
                      borderRadius: 20,
                    }}
                  />
                </Animated.View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
        <View
          style={StyleSheet.absoluteFill}
          pointerEvents={this.state.activeImage ? "auto" : "none"}
        >
          <View
            style={{ flex: 2, zIndex: 1001 }}
            ref={(view) => (this.viewImage = view)}
          >
            <Animated.Image
              source={{
                uri: this.state.activeImage
                  ? this.state.activeImage.image_path
                  : null,
              }}
              style={[
                {
                  resizeMode: "cover",
                  top: 0,
                  left: 0,
                  height: null,
                  width: null,
                },
                activeImageStyle,
              ]}
            ></Animated.Image>
            <TouchableWithoutFeedback onPress={() => this.closeImage()}>
              <Animated.View
                style={[
                  { position: "absolute", top: 30, right: 30 },
                  animatedCrossOpacity,
                ]}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "black",
                    borderRadius: 5,
                  }}
                >
                  X
                </Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
          <Animated.View
            style={[
              {
                flex: 1,
                zIndex: 1000,
                backgroundColor: "white",
                padding: 20,
                paddingTop: 50,
              },
              animatedContentStyle,
            ]}
          >
            <Text style={{ fontSize: 24, paddingBottom: 10 }}>
              Nanded, Maharashtra
            </Text>
            <TouchableWithoutFeedback
              onPress={() => this.setModalVisible(true, "accept")}
            >
              <Animated.View
                style={[
                  {
                    position: "absolute",
                    top: 100,
                    right: 30,
                    backgroundColor: "green",
                    borderRadius: 10,
                    padding: 10,
                  },
                  animatedCrossOpacity,
                ]}
              >
                <Text
                  style={{ fontSize: 24, fontWeight: "bold", color: "black" }}
                >
                  Accept
                </Text>
              </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.setModalVisible(true, "reject")}
            >
              <Animated.View
                style={[
                  {
                    position: "absolute",
                    top: 100,
                    left: 30,
                    backgroundColor: "red",
                    borderRadius: 10,
                    padding: 10,
                  },
                  animatedCrossOpacity,
                ]}
              >
                <Text
                  style={{ fontSize: 24, fontWeight: "bold", color: "black" }}
                >
                  Reject
                </Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  text: {
    color: "#0c0c0c",
    fontSize: 20,
    fontFamily: "Roboto",
    width: "100%",
    fontWeight: "bold",
  },
  textInputBox: {
    backgroundColor: "azure",
    borderRadius: 14,
    flexDirection: "row",
    width: "80%",
    padding: 15,
    marginVertical: 15,
    textAlign: "center",
    shadowColor: "#6e6969",
    shadowOffset: {
      width: 3,
      height: 7,
    },
    shadowOpacity: 10.2,
    shadowRadius: 10.41,
    elevation: 2,
  },
});
