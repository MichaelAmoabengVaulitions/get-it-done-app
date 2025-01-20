import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {Filters} from "../hooks/useTasks";

interface FilterBarProps {
    filter: Filters;
    onSetFilter: (filter: Filters) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filter, onSetFilter }) => {
    return (
        <View style={styles.container}>
            {Object.values(Filters).map((item) => (
                <TouchableOpacity
                    key={item}
                    style={[styles.button, filter === item && styles.activeButton]}
                    onPress={() => onSetFilter(item as Filters)}
                >
                    <Text style={styles.buttonText}>{item.toUpperCase()}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 26
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#ddd'
    },
    activeButton: {
        backgroundColor: '#4CAF50'
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff'
    },
});

export default FilterBar;
