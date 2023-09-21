import React from "react";
import { FlatList, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";

const ContactItem = ({ contact, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => onPress(contact)}
    >
      <Image source={{ uri: contact.avatar }} style={styles.avatar} />
      <Text style={styles.contactName}>{contact.email}</Text>
    </TouchableOpacity>
  );
};

const ContactsList = ({ contacts, onPress }) => {
  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ContactItem contact={item} onPress={onPress} />
      )}
      style={styles.contactsList}
    />
  );
};

export default ContactsList;
