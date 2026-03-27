import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar as RNStatusBar,
  Button,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import TaskList from "./src/components/taskList";

import {
  addTask,
  deleteTask,
  getAllTasks,
  updateTask,
  TaskItem,
} from "./src/utils/handle-api";

export default function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [taskId, setTaskId] = useState("");

  useEffect(() => {
    getAllTasks(setTasks);
  }, []);

  const updateMode = (_id: string, text: string) => {
    setIsUpdating(true);
    setText(text);
    setTaskId(_id);
  };

  const deleteAll = () => {
    setTasks([]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* ✅ IMAGEM */}
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/906/906334.png",
          }}
          style={styles.image}
        />

        <Text style={styles.header}>Tarefas</Text>

        <Text style={styles.counter}>Total de tarefas: {tasks.length}</Text>

        <View style={styles.top}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua tarefa..."
            value={text}
            maxLength={50}
            onChangeText={setText}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={
              isUpdating
                ? () =>
                    updateTask(taskId, text, setTasks, setText, setIsUpdating)
                : () => addTask(text, setText, setTasks)
            }
          >
            <Text style={styles.addButtonText}>
              {isUpdating ? "Atualizar" : "Adicionar"}
            </Text>
          </TouchableOpacity>
        </View>

        <Button title="Excluir todas" onPress={deleteAll} />

        <TaskList
          tasks={tasks}
          onDelete={(id: string) => deleteTask(id, setTasks)}
          onEdit={(id: string, text: string) =>
            updateTask(id, text, setTasks, setText, setIsUpdating)
          }
        />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  counter: {
    marginTop: 5,
    marginBottom: 10,
  },
  top: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: 200,
    borderRadius: 6,
  },
  addButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 6,
  },
  addButtonText: {
    color: "#fff",
  },
});
