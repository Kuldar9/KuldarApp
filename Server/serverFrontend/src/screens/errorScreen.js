// ErrorScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
import ErrorButton from '../components/common/errorButton';

const ErrorScreen = ({ error, errorInfo, onDismiss, showErrorInfo, onToggleErrorInfo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorHeaderText}>Oops! Something went wrong.</Text>
      <View style={styles.errorContent}>
        {showErrorInfo && (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.errorInfoContainer}>
              <Text style={styles.errorInfoText}>Error: {error.toString()}</Text>
              <Text style={styles.errorInfoText}>Error Info: {JSON.stringify(errorInfo)}</Text>
            </View>
          </ScrollView>
        )}
        <View style={styles.buttonContainer}>
          <ErrorButton title={showErrorInfo ? 'Hide Error Info' : 'Show Error Info'} onPress={onToggleErrorInfo} />
          <ErrorButton title="Dismiss" onPress={onDismiss} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffcccc',
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
  },
  errorHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6666',
    marginBottom: 10,
  },
  errorContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  errorInfoContainer: {
    backgroundColor: '#ffe6e6',
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    // adjust dimensions for phones
    maxWidth: Dimensions.get('window').width * 0.8,
  },
  errorInfoText: {
    color: '#cc0000',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default ErrorScreen;