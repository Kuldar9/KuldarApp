// ChatBot.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import axios from 'axios';
import { useTheme } from '../Themes/ThemeProvider';
import { SERVER_URL } from '../Backend/index'; // Import the SERVER_URL

const ChatBot = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { buttonStyle, buttonTextStyle } = useTheme(); // Get button styles from theme

  useEffect(() => {
    fetchAndDisplayMessages();
  }, []);

  const handleMessageSend = async () => {
    if (inputMessage.trim() !== '') {
      try {
        const response = await axios.post(`${SERVER_URL}/api/sendMessage`, { message: inputMessage });
        console.log('Message sent:', response.data);
        setInputMessage('');
        await fetchAndDisplayMessages();
      } catch (error) {
        console.error('Error sending message:', error);
        // Handle error gracefully (e.g., display an error message to the user)
      }
    }
  };

  const fetchAndDisplayMessages = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/fetchMessages`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Handle error gracefully (e.g., display an error message to the user)
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10 }}
        onChangeText={text => setInputMessage(text)}
        value={inputMessage}
      />
      <Button title="Send" onPress={handleMessageSend} style={buttonStyle} textStyle={buttonTextStyle} />
    </View>
  );
};

export default ChatBot;