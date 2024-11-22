import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    height: 52,
    width: '100%',
    backgroundColor: colors.green[300],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  title: {
    color: colors.green[900],
    fontSize: 16,
    fontWeight: 600,
  }
});