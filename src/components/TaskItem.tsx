import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Task } from '../types/task';
import { deleteTask, editTask, toggleTaskCompletion } from '../store/taskSlice';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    dispatch(editTask(editedTask));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="datetime-local"
          value={editedTask.dueDate}
          onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 text-gray-600 hover:text-gray-800"
          >
            <X size={20} />
          </button>
          <button onClick={handleSave} className="p-2 text-green-600 hover:text-green-800">
            <Check size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${task.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch(toggleTaskCompletion(task.id))}
            className="mt-1.5"
          />
          <div>
            <h3
              className={`text-lg font-medium ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}
            >
              {task.title}
            </h3>
            <p className="text-gray-600 mt-1">{task.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Due: {format(parseISO(task.dueDate), 'PPp')}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-600 hover:text-blue-800"
          >
            <Pencil size={20} />
          </button>
          <button onClick={handleDelete} className="p-2 text-red-600 hover:text-red-800">
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}