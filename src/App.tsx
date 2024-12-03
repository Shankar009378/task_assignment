import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskFilters } from './components/TaskFilters';
import { ClipboardList } from 'lucide-react';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="flex items-center gap-4 mb-8">
            <ClipboardList className="text-blue-500" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Task Management Dashboard</h1>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <TaskForm />
            </div>

            <TaskFilters />

            <TaskList />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;