import React from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { AuthenticatedUserProvider } from "./src/navigation/AuthenticatedUserProvider";
import "react-native-gesture-handler";

const App = () => {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
};

export default App;
