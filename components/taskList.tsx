import React from "react";
import { FlatList } from "react-native";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onEdit }: any) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TaskItem task={item} onDelete={onDelete} onEdit={onEdit} />
      )}
    />
  );
}
