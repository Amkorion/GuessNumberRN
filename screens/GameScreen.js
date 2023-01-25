import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, useWindowDimensions, View } from "react-native";
import Card from "../components/UI/Card";
import MyText from "../components/UI/MyText";
import NumberContainer from "../components/UI/NumberContainer";
import PrimaryButton from "../components/UI/PrimaryButton";
import Title from "../components/UI/Title";
import Colors from "../constants/colors";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ playerNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, playerNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [rounds, setRounds] = useState(1);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess == playerNumber) {
      onGameOver(rounds);
    }
  }, [currentGuess, playerNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const nextGuessHandler = (direcion) => {
    if (
      (direcion === "lower" && currentGuess < playerNumber) ||
      (direcion === "greater" && currentGuess > playerNumber)
    ) {
      Alert.alert("Не обманюйте!", "Давайте будемо чесними один з одним!", [
        {
          text: "Вибачте",
          style: "cancel",
        },
      ]);
      return;
    }
    if (direcion === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setRounds((prevRounds) => prevRounds + 1);
  };

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <MyText style={styles.instructionText}>Більше чи Меньше?</MyText>
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.button}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.btnsContainerWide}>
          <View style={styles.button}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.button}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Ваше число:</Title>
      {content}
      <View>
        <MyText style={styles.text}>{`${rounds} РАУНД`}</MyText>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  btnsContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 12,
  },
  text: {
    paddingTop: 300,
    color: Colors.primary600,
    textAlign: "center",
  },
});
