import React, { useState, useCallback, useLayoutEffect } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { TouchableOpacity, View, Text, Image } from "react-native";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../colors";
import { auth, database } from "../../config/firebase";

const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const { recipient } = route.params;
  const imageUrl = recipient?.avatar;

  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: recipient?.email,
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={onSignOut}>
          <AntDesign
            name="logout"
            size={24}
            color={colors.gray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, recipient]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "messages");
    const q = query(
      collectionRef,
      orderBy("createdAt", "desc"),
      where("user._id", "in", [auth?.currentUser?.email, recipient?.email])
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return unsubscribe;
  }, [recipient]);

  const onSend = useCallback(
    (messages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );

      const { _id, createdAt, text, user } = messages[0];
      addDoc(collection(database, "messages"), {
        _id,
        createdAt,
        text,
        user,
        recipient: recipient,
      });
    },
    [recipient]
  );

  const renderMessage = (props) => {
    const { currentMessage } = props;

    return (
      <View style={{ margin: 10 }}>
        {currentMessage.user._id !== auth?.currentUser?.email && (
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: currentMessage.user.avatar }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
              }}
            />
            <Text>{currentMessage.user._id}</Text>
          </View>
        )}
        <Bubble {...props} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={(messages) => onSend(messages)}
        messagesContainerStyle={{
          backgroundColor: "#fff",
        }}
        textInputStyle={{
          backgroundColor: "#fff",
          borderRadius: 20,
        }}
        user={{
          _id: auth?.currentUser?.email,
          avatar: imageUrl,
          email: auth?.currentUser?.email,
        }}
        renderMessage={renderMessage}
      />
    </View>
  );
};

export default Chat;
