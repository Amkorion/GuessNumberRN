import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import PrimaryButton from "../components/UI/PrimaryButton";
import Title from "../components/UI/Title";
import Colors from "../constants/colors";

const GameOverScreen = ({ playerNumber, onGameRestart, rounds }) => {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;

  if (width < 380) {
    imageSize = 150;
  }
  if (height < 400) {
    imageSize = 80;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };
  return (
    <View style={styles.rootContainer}>
      <Title>Гру Скінчено!</Title>
      <View style={[styles.imageContainer, imageStyle]}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={styles.text}>
        Вашому телефону знадобилося <Text style={styles.numbers}>{rounds}</Text>{" "}
        раундів, щоб вгадати число{" "}
        <Text style={styles.numbers}>{playerNumber}</Text>
      </Text>
      <PrimaryButton onPress={onGameRestart}>Грати Ще</PrimaryButton>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    // width: deviseWidth < 380 ? 150 : 300,
    // height: deviseWidth < 380 ? 150 : 300,
    // borderRadius: deviseWidth < 380 ? 75 : 150,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: Colors.primary800,
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 24,
  },
  numbers: {
    fontWeight: "bold",
    color: Colors.primary500,
  },
});
