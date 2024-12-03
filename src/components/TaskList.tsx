import React from 'react';
import { useSelector } from 'react-redux';
import { TaskItem } from './TaskItem';
import { selectFilteredTasks } from '../store/taskSlice';
import { RootState } from '../store/store';

export function TaskList() {
  const tasks = useSelector((state: RootState) => selectFilteredTasks(state));

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks found. Start by adding a new task!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}