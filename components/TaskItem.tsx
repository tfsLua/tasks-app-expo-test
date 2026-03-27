import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

export default function TaskItem({ task, onDelete, onEdit }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);

  return (
    <View style={styles.container}>
      {isEditing ? (
        <TextInput
          value={text}
          onChangeText={setText}
          onSubmitEditing={() => {
            onEdit(task._id, text);
            setIsEditing(false);
          }}
          style={styles.input}
        />
      ) : (
        <Text style={styles.text}>{task.text}</Text>
      )}

      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Text>✏️</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(task._id)}>
          <Text>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    borderBottomWidth: 1,
    flex: 1,
  },
});
