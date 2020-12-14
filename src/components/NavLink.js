import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";

const NavLink = ({ navigation, text, routeName }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate({ routeName });
      }}
    >
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "blue",
    marginTop: 5,
    alignSelf: "center",
    fontSize: 16,
  },
});

export default withNavigation(NavLink);
