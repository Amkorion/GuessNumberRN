import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ImageBackground, StyleSheet, SafeAreaView } from "react-native";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";

export default function App() {
  const [gameStarted, setGameStarted] = useState();
  const [gameOver, setGameOver] = useState(true);
  const [roundsQuantity, setRoundsQuantity] = useState(0);

  const gameStartHandler = (pickedNumber) => {
    setGameStarted(pickedNumber);
    setGameOver(false);
  };

  function gameOverHandler(rounds) {
    setGameOver(true);
    setRoundsQuantity(rounds);
  }
  function resetGameHandler() {
    setGameStarted(null);
    setRoundsQuantity(0);
  }

  function roundCounter(rounds) {}

  let screen = (
    <StartGameScreen
      onGameStart={gameStartHandler}
      playerNumber={gameStarted}
    />
  );
  if (gameStarted) {
    screen = (
      <GameScreen
        playerNumber={gameStarted}
        onGameOver={gameOverHandler}
        rounds={roundsQuantity}
      />
    );
  }
  if (gameOver && gameStarted) {
    screen = (
      <GameOverScreen
        playerNumber={gameStarted}
        onGameRestart={resetGameHandler}
        rounds={roundsQuantity}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.secondary500]}
      style={styles.mainContainer}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.mainContainer}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.mainContainer}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
