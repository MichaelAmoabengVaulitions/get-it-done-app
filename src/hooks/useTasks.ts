import { useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types';

export enum Filters {
    ALL = 'all',
    COMPLETED = 'completed',
    UNCOMPLETED = 'uncompleted',
}

export  interface TaskState {
    tasks: Task[];
    filter: Filters;
}

export enum TaskActionType {
    ADD_TASK = 'ADD_TASK',
    UPDATE_TASK = 'UPDATE_TASK',
    TOGGLE_TASK = 'TOGGLE_TASK',
    DELETE_TASK = 'DELETE_TASK',
    SET_FILTER = 'SET_FILTER',
    SET_INITIAL_TASKS = 'SET_INITIAL_TASKS',
}

type TaskAction =
    | { type: TaskActionType.ADD_TASK; payload: Task }
    | { type: TaskActionType.UPDATE_TASK; payload: { id: string; title: string } }
    | { type: TaskActionType.TOGGLE_TASK; payload: string }
    | { type: TaskActionType.DELETE_TASK; payload: string }
    | { type: TaskActionType.SET_FILTER; payload: Filters }
    | { type: TaskActionType.SET_INITIAL_TASKS; payload: Task[] };

const STORAGE_KEY = '@simple-todo-app:tasks';

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
    switch (action.type) {
        case TaskActionType.ADD_TASK:
            return { ...state, tasks: [action.payload, ...state.tasks] };
        case TaskActionType.UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id
                        ? { ...task, title: action.payload.title }
                        : task
                ),
            };
        case TaskActionType.TOGGLE_TASK:
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload
                        ? { ...task, completed: !task.completed }
                        : task
                ),
            };
        case TaskActionType.DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload)
            };
        case TaskActionType.SET_FILTER:
            return {
                ...state,
                filter: action.payload
            };
        case   TaskActionType.SET_INITIAL_TASKS:
            return {
                ...state,
                tasks: action.payload };
        default:
            return state;
    }
};

const useTasks = () => {
    const [state, dispatch] = useReducer(taskReducer, { tasks: [], filter: Filters.ALL });

    // Load tasks from the app starts
    useEffect(() => {
     (async () => {
            try {
                const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
                if (storedTasks) {
                    const parsedTasks: Task[] = JSON.parse(storedTasks);
                    dispatch({ type: TaskActionType.SET_INITIAL_TASKS, payload: parsedTasks });
                }
            } catch (error) {
                console.error('Failed to load tasks:', error);
            }
        })();
    }, []);

    // Persist to device whenever they change
    useEffect(() => {
       (async () => {
            try {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
            } catch (error) {
                console.error('Failed to save tasks:', error);
            }
        })();
    }, [state.tasks]);

    return [state, dispatch] as const;
};

export default useTasks;
