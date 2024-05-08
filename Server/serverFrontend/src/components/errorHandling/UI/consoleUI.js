console.log('Executing file: consoleUI.js');
import React, { useContext } from 'react';
import { Modal, ScrollView, View, StyleSheet } from 'react-native';
import Header from './consoleHeader';
import MessageButton from '../../common/messageButton';
import { ThemeContext } from '../../utils/themeProvider';

const ConsoleUI = ({ isVisible, logs = [], onClose }) => {
  console.log('const ConsoleUI, file: consoleUI.js');
  const { background } = useContext(ThemeContext);
  console.log('previous done, loading view, file: consoleUI.js');
  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <View style={[styles.container, { backgroundColor: background }]}>
        <Header onClose={onClose} />
        <ScrollView style={styles.scrollView}>
          {logs.map((log, index) => (
            <View key={index} style={styles.messageButton}> {/* Added View here */}
              <MessageButton
                buttonText={log.error.message}
                additionalInfo={log.error.stack}
                onPress={() => {}}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  messageButton: {
    paddingLeft: 10,
  },
});

export default ConsoleUI;