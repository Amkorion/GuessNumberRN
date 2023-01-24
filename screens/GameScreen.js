import { Alert, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import MyText from "../components/UI/MyText";
import NumberContainer from "../components/UI/NumberContainer";
import PrimaryButton from "../components/UI/PrimaryButton";
import Title from "../components/UI/Title";
import Card from "../components/UI/Card";
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

  return (
    <View style={styles.screen}>
      <Title>Ваше число:</Title>
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
  },
  buttonsContainer: {
    flexDirection: "row",
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
