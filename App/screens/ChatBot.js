import React from 'react';
import { View, StyleSheet, FlatList, Image, Text } from 'react-native';
import CustomButton from '../Components/InternalComponents/CustomButton'; // Adjust the path as needed
import CustomTextInput from '../Components/InternalComponents/CustomTextInput'; // Adjust the path as needed
import { useTheme } from '../Themes/theme';
import profileIcon from '../Assets/icons/profile-icon.gif'; // Adjust the path as needed

const ChatBot = ({ navigation }) => {
  const { colors } = useTheme();

  const messages = [
    { id: '1', text: 'Hello! How can I help you today?', sender: 'bot' },
    { id: '2', text: 'I need some information about your services.', sender: 'user' },
    // Add more messages here
  ];

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer, 
      item.sender === 'user' ? 
      { ...styles.userMessage, backgroundColor: colors.primary } : 
      { ...styles.botMessage, backgroundColor: colors.subText }
    ]}>
      <Image source={profileIcon} style={styles.profileImage} />
      <Text style={[styles.messageText, { color: colors.text }]}>{item.text}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
      />
      <View style={[styles.inputArea, { borderTopColor: colors.border }]}>
        <CustomTextInput
          title="Type your message..."
          buttonStyle={[styles.textInput, { backgroundColor: colors.inputBackground }]}
        />
        <CustomButton
          title="Send"
          buttonStyle={[styles.sendButton, { backgroundColor: colors.primary }]}
          textColor={colors.buttonText}
          onPress={() => console.log('Send button pressed')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  messageList: {
    flexGrow: 1,
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 10,
    borderRadius: 15,
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  botMessage: {
    alignSelf: 'flex-start',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  messageText: {
    maxWidth: '80%',
    fontSize: 16,
  },
  inputArea: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    borderTopWidth: 1,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: '#C7C7CC',
  },
  sendButton: {
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});

export default ChatBot;