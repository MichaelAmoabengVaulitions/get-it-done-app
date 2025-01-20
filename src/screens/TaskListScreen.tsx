import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text } from 'react-native';

import TaskItem from '../components/TaskItem';
import FilterBar from '../components/FilterBar';
import useTasks, {Filters, TaskActionType} from '../hooks/useTasks';
import {GRAY, WHITE} from "../consts/Colors";
import {RADIUS_LARGE, SPACE_LARGE, SPACE_MEDIUM, SPACE_SMALL} from "../components/Dimensions";

const TaskListScreen: React.FC = () => {
    const [state, dispatch] = useTasks();
    const [newTask, setNewTask] = useState('');

    const filteredTasks =
        state.filter === Filters.ALL
            ? state.tasks
            : state.tasks.filter((task) =>
                state.filter === Filters.COMPLETED ? task.completed : !task.completed
            );

    const addTask = () => {
        if (newTask.trim()) {
            dispatch({
                type: TaskActionType.ADD_TASK,
                payload: { id: Date.now().toString(), title: newTask, completed: false },
            });
            setNewTask('');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Get it Done</Text>
            <TextInput
                style={styles.input}
                placeholder="Add a new task..."
                value={newTask}
                onChangeText={setNewTask}
                onSubmitEditing={addTask}
            />
            <FilterBar
                filter={state.filter}
                onSetFilter={(filter: Filters) => dispatch({ type: TaskActionType.SET_FILTER, payload: filter })}
            />
            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onToggle={() => dispatch({ type: TaskActionType.TOGGLE_TASK, payload: item.id })}
                        onDelete={() => dispatch({ type: TaskActionType.DELETE_TASK, payload: item.id })}
                        onUpdate={(title) => dispatch({ type: TaskActionType.UPDATE_TASK, payload: { id: item.id, title } })}
                    />
                )}
                contentContainerStyle={styles.taskList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACE_MEDIUM,
        backgroundColor: WHITE,
    },
    title: {
        fontSize: SPACE_LARGE,
        fontWeight: 'bold',
        marginBottom: 26,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: GRAY,
        padding: SPACE_SMALL,
        borderRadius: RADIUS_LARGE,
        marginBottom: SPACE_MEDIUM,
        height: 40
    },
    taskList: {
        paddingBottom: SPACE_MEDIUM
    },
});

export default TaskListScreen;
