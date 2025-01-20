import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import {Filters} from "../hooks/useTasks";
import {GRAY, GREEN, WHITE} from "../consts/Colors";
import {RADIUS_MEDIUM, SPACE_MEDIUM, SPACE_SMALL} from "./Dimensions";

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
        paddingHorizontal: SPACE_MEDIUM,
        paddingVertical: SPACE_SMALL,
        borderRadius: RADIUS_MEDIUM,
        backgroundColor: GRAY
    },
    activeButton: {
        backgroundColor: GREEN
    },
    buttonText: {
        fontWeight: 'bold',
        color: WHITE
    },
});

export default FilterBar;
