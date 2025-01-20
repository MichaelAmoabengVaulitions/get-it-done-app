import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet , Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, { withTiming, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { Task } from '../types';

interface TaskItemProps {
    task: Task;
    onToggle: () => void;
    onDelete: () => void;
    onUpdate: (title: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);

    const opacity = useSharedValue(0);
    const scale = useSharedValue(1);
    const translateY = useSharedValue(20);


    React.useEffect(() => {
        opacity.value = withTiming(1, { duration: 300 });
        translateY.value = withSpring(0, { damping: 15 });
    }, []);

    const handleEdit = () => {
        setIsEditing(false);
        onUpdate(title.trim());
    };

    const handleToggle = () => {
        scale.value = withSpring(1.1, { damping: 15 });
        setTimeout(() => {
            scale.value = withSpring(1, { damping: 15 });
            onToggle();
        }, 100);
    };

    const handleDelete = () => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => deleteTask() },
            ],
            { cancelable: true }
        );
    };

    const deleteTask = () => {
        opacity.value = withTiming(0, { duration: 300 });
        translateY.value = withSpring(-20, { damping: 20 });
        setTimeout(() => {
            onDelete();
        }, 300); // This delay should match the duration of the opacity animation
    };


    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            { translateY: translateY.value },
            { scale: scale.value },
        ],
    }));

    return (
        <Animated.View style={[styles.taskContainer, animatedStyle]}>
            <TouchableOpacity onPress={handleToggle} style={styles.taskTextContainer}>
                {isEditing ? (
                    <TextInput
                        style={styles.editInput}
                        value={title}
                        onChangeText={setTitle}
                        onBlur={handleEdit}
                        onSubmitEditing={handleEdit}
                    />
                ) : (
                    <Text style={[styles.taskText, task.completed && styles.completed]}>
                        {task.title}
                    </Text>
                )}
            </TouchableOpacity>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => setIsEditing(true)}>
                    <Icon name="edit" size={20} color="#4CAF50" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete}>
                    <Icon name="delete" size={20} color="red" />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 8,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',

    },
    taskTextContainer: {
        flex: 1
    },
    taskText: {
        fontSize: 16
    },
    completed: {
        textDecorationLine: 'line-through',
        color: '#aaa'
    },
    editInput: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default TaskItem;
