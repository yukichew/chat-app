import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/home/Home";
import Chat from "../screens/Chat";

const Stack = createStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator defaultScreenOptions={Home}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default ChatStack;
