// PaginationDots.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const PaginationDots = ({ totalPages, currentPage }) => {
    const dots = Array.from({ length: totalPages }, (_, index) => index);

    return (
        <View style={styles.pagination}>
            {dots.map((index) => (
                <View key={index} style={[styles.dot, index === currentPage ? styles.activeDot : null]} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#333',
    },
});

export default PaginationDots;