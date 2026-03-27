import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Platform, StatusBar as RNStatusBar, Button, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { addTask, deleteTask, getAllTasks, updateTask, TaskItem } from './src/utils/handle-api';
import TaskList from './src/components/TaskList';
import { Feather, AntDesign } from '@expo/vector-icons';

export default function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [text, setText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [taskId, setTaskId] = useState('');

  useEffect(() => {
    getAllTasks(setTasks);
  }, []);

  const updateMode = (_id: string, text: string) => {
    setIsUpdating(true);
    setText(text);
    setTaskId(_id);
  };

  const deleteAllTasks = async () => {
    for (const task of tasks) {
      await deleteTask(task._id, setTasks);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('./tasks/images/image.png')}
          style={styles.logo}
        />
        <Text style={styles.header}>Tarefas</Text>
        <View style={styles.top}>
          <TextInput
            style={styles.input}
            placeholder="Adicione uma tarefa..."
            value={text}
            onChangeText={(val) => setText(val)}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={
              isUpdating
                ? () => updateTask(taskId, text, setTasks, setText, setIsUpdating)
                : () => addTask(text, setText, setTasks)
            }
          >
            <AntDesign name="save" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.addButtonText}>
              {isUpdating ? 'Atualizar' : 'Adicionar'}
            </Text>
          </TouchableOpacity>
        </View>
        <Button title="Excluir todas as tarefas" onPress={deleteAllTasks} color="#c0392b"/>
        <TaskList
          tasks={tasks}
          onUpdate={updateMode}
          onDelete={(id) => deleteTask(id, setTasks)}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
        maxWidth: 600,
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginBottom: 8,
        marginTop: 16,
    },
    header: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    counter: {
        textAlign: 'center',
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    top: {
        marginTop: 16,
        gap: 12,
    },
    input: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    addButton: {
        backgroundColor: '#9354f7fb',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        justifyContent: 'space-between',
        gap: 5,
        alignItems: 'center',
        flexDirection: 'row-reverse',
        marginBottom: 10,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    icon: {
        padding: 2,
  },
});