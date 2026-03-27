import React from 'react';
import { FlatList } from 'react-native';
import TaskItem from "./TaskItem";
import { TaskItem as TaskItemType } from '../utils/handle-api';

interface TaskListProps {
  tasks: TaskItemType[];
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete }) => {
  return (
    <FlatList
      style={{ marginTop: 16, flex: 1 }}
      contentContainerStyle={{ paddingBottom: 24 }}
      data={tasks}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TaskItem
          text={item.text}
          updateMode={() => onUpdate(item._id, item.text)}
          deleteToDo={() => onDelete(item._id)}
        />
      )}
    />
  );
};

export default TaskList;