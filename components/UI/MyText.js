import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

const MyText = ({ children, style }) => {
  return (
    <View>
      <Text style={[styles.text, style]}>{children}</Text>
    </View>
  );
};

export default MyText;

const styles = StyleSheet.create({
  text: {
    color: Colors.secondary500,
    fontSize: 24,
  },
});
