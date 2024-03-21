import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { sendMessageToServer, fetchMessagesFromServer } from '../backend/index';

const ChatBot = () => {
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchAndDisplayMessages();
    }, []);

    const handleMessageSend = async () => {
        if (inputMessage.trim() !== '') {
            await sendMessageToServer(inputMessage);
            setInputMessage('');
            await fetchAndDisplayMessages();
        }
    };

    const fetchAndDisplayMessages = async () => {
        const messagesFromServer = await fetchMessagesFromServer();
        setMessages(messagesFromServer);
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <Text>{item}</Text>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10 }}
                onChangeText={text => setInputMessage(text)}
                value={inputMessage}
            />
            <Button title="Send" onPress={handleMessageSend} />
        </View>
    );
};

export default ChatBot;