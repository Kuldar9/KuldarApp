import React, { useContext, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ThemeContext } from '../utils/themeProvider';

const MessageButton = ({ buttonText, additionalInfo, onPress }) => {
  console.log('Const MessageButton, file: messageButton.js');
  const { secondaryBackground, primaryText, secondaryText, border } = useContext(ThemeContext);

  const [expanded, setExpanded] = useState(false);

  const handleToggleExpansion = () => {
    setExpanded(!expanded);
  };

  console.log('previous done, loading view, file: messageButton.js');

  return (
    <View style={[styles.container, { backgroundColor: secondaryBackground, borderColor: border }]}>
      <Pressable onPress={() => { onPress(); handleToggleExpansion(); }}>
        <Text style={[styles.buttonText, { color: primaryText }]}>{buttonText}</Text>
      </Pressable>
      {expanded && (
        <View>
          <Text style={[styles.additionalInfo, { color: secondaryText }]}>{additionalInfo}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: '70%',
    marginTop: 15,
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
  },
  additionalInfo: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default MessageButton;