import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import useState from 'react';

export default function App() {
  // Function that generates the secret number.
  const generateSeretNumber: () => number = () => Math.floor(Math.random() * 100);
  // currentNumber: the number the user inputs.
  const [currentNumber, setCurrentNumber] = useState.useState<number>(0);
  // secretNumber: the secret number.
  const [secretNumber, setSecretNumber] = useState.useState<number>(generateSeretNumber());
  // message: the message displayed to the user on screen.
  const [message, setMessage] = useState.useState<String>("Guess the number!");
  // Callback called when a number button is pressed.
  const onNumberPressed = (n: number): void => setCurrentNumber(currentNumber * 10 + n);
  // Callback called when the clear button is pressed.
  const onClearPressed: () => void = () => setCurrentNumber(0);
  // Callback called when the restart button is pressed.
  const onRestartPressed: () => void = () => {
    // Generate a new secret number and clear the user input.
    setSecretNumber(generateSeretNumber());
    onClearPressed();
  };
  // Function that outputs a message that concludes the user input.
  const concludeAnswer: (n: number) => String =
    (n: number) =>
      n === secretNumber ? "You found the number!" :
        n > secretNumber ? "Too large." : "Too small.";
  // Callback called when an enter button is pressed.
  const onEnterPressed: () => void = () => {
    setMessage(concludeAnswer(currentNumber));
    if (currentNumber != secretNumber)
      setCurrentNumber(0);
  };
  // Array of JSX elements that represent the number, clear, and restart buttons.
  const gameButtons: JSX.Element[] = Array.from(Array(10).keys()).reverse().map((number) =>
    <TouchableOpacity key={number} style={styles.button} onPress={() => onNumberPressed(number)}>
      <Text style={styles.buttonText}>{number}</Text>
    </TouchableOpacity >
  ).concat(
    <TouchableOpacity key="clearButton" style={styles.button} onPress={onClearPressed}>
      <Text style={styles.buttonText}>Clear</Text>
    </TouchableOpacity >,
    <TouchableOpacity key="restartButton" style={styles.button} onPress={onRestartPressed}>
      <Text style={styles.buttonText}>Restart</Text>
    </TouchableOpacity >
  );

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{message}</Text>
        <Text style={styles.displayText}>{currentNumber}</Text>
        <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={onEnterPressed}>
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.numberKeyboard}>{gameButtons}</View>
    </View>
  );
}

// Style Sheet
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "green",
  },
  display: {
    flex: 2,
  },
  displayText: {
    flex: 1,
    fontSize: 28,
    textAlign: "center",
  },
  numberKeyboard: {
    flex: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "blue",
  },
  button: {
    justifyContent: "center",
    minWidth: "25%",
    minHeight: "25%",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
});
