import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import { collection, getDocs } from "firebase/firestore";
import ContactsList from "../contact/ContactList";
import { database, auth, storage } from "../../../config/firebase";
import { ref, getDownloadURL } from "firebase/storage";

const Home = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleContactPress = (contact) => {
    navigation.navigate("Chat", {
      recipient: contact,
      imageUrl: contact.avatar,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome
          name="search"
          size={24}
          color="black"
          style={{ marginLeft: 20 }}
        />
      ),
      headerRight: () => {
        return (
          <Image
            source={{
              uri: avatarUrl,
            }}
            style={{ width: 30, height: 30, borderRadius: 15, marginRight: 20 }}
          />
        );
      },
    });
  }, [navigation, avatarUrl]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, "users"));
        const userData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userData);
        console.log();
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchAvatarUrl = async () => {
      try {
        const storageRef = ref(storage, `avatar/${auth.currentUser.uid}`);
        await getDownloadURL(storageRef).then((url) => {
          setAvatarUrl(url);
        });
      } catch (error) {
        console.error("Error fetching avatar URL:", error);
      }
    };
    fetchAvatarUrl();
  }, []);

  const filteredUsers = users.filter(
    (user) => user.email !== auth?.currentUser?.email
  );

  return (
    <View style={styles.container}>
      <ContactsList contacts={filteredUsers} onPress={handleContactPress} />
    </View>
  );
};

export default Home;
