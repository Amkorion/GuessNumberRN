import { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import Card from "../components/UI/Card";
import MyText from "../components/UI/MyText";
import PrimaryButton from "../components/UI/PrimaryButton";
import Title from "../components/UI/Title";
import Colors from "../constants/colors";

const StartGameScreen = (props) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  const resetEnteredNumber = () => {
    setEnteredNumber("");
  };

  const enteredNumberHandler = (enteredValue) => {
    setEnteredNumber(enteredValue);
  };

  const confirmNumberHandler = () => {
    //!parseInt - convet string into number
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Ви ввели некоррекну цифру",
        "Введіть будь ласка цифру від 1 до 99",
        [
          {
            text: "Зрозуміло",
            style: "destructive",
            onPress: resetEnteredNumber,
          },
        ]
      );
      return;
    }
    props.onGameStart(enteredNumber);
  };

  return (
    <View style={styles.rootContainer}>
      <Title>Вгадай мою цифру</Title>
      <Card>
        <MyText>Введіть цифру</MyText>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          maxLength={2}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={enteredNumberHandler}
          value={enteredNumber}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetEnteredNumber}>Скинути</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmNumberHandler}>
              Прийняти
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  input: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.secondary500,
    borderBottomWidth: 2,
    color: Colors.secondary500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  buttonContainer: {
    flex: 1,
  },
});
