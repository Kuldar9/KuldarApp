import React, { useState, useContext, useRef, useEffect } from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    StyleSheet, 
    KeyboardAvoidingView, 
    Platform 
} from 'react-native';
import { ThemeContext } from '../components/utils/themeProvider';
import TextInput from '../components/common/textInput';
import IconButton from '../components/common/iconButton';
import socketService from '../services/socketService';

const ConsoleScreen = () => {
    const colors = useContext(ThemeContext);
    const [command, setCommand] = useState('');
    const [logs, setLogs] = useState([
        { id: 1, message: "System initialized. Waiting for commands...", type: 'system' }
    ]);
    
    const scrollViewRef = useRef();

        useEffect(() => {
        socketService.connect((newLog) => {
        const displayMessage = newLog.content || newLog.message || JSON.stringify(newLog);

        setLogs(prevLogs => [...prevLogs, {
            id: Date.now() + Math.random(),
            message: displayMessage,
            type: newLog.category === 'Service' ? 'server' : 'system'
        }]);
    });

        return () => socketService.disconnect();
    }, []);

    const handleSendCommand = () => {
        if (command.trim().length === 0) return;

        socketService.sendCommand(command);

        setCommand('');
    };

    

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: colors.consoleBackground }]}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
                <Text style={{ color: colors.accent, fontWeight: 'bold' }}>SERVER TERMINAL</Text>
            </View>
            
            <ScrollView 
                style={styles.logContainer}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                {logs.map((log) => (
                    <View key={log.id} style={styles.logRow}>
                        <Text style={{ color: colors.consoleTime, fontSize: 11 }}>
                            [{new Date().toLocaleTimeString()}]
                        </Text>
                        <Text style={[
                            styles.logText, 
                            { color: log.type === 'user' ? colors.accent : colors.consoleText }
                        ]}>
                            {` ${log.type === 'user' ? '>' : '#'} ${log.message}`}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            <View style={[styles.inputWrapper, { 
                borderTopColor: colors.border, 
                backgroundColor: colors.secondaryBackground 
            }]}>
                <View style={{ flex: 1 }}>
                    <TextInput 
                        placeholder="Type a command..." 
                        value={command}
                        onChangeText={setCommand}
                        onSubmitEditing={handleSendCommand}
                    />
                </View>
                <View style={styles.sendButton}>
                    <IconButton 
                        iconName="chevron-forward-circle-outline" 
                        onPress={handleSendCommand} 
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { padding: 15, borderBottomWidth: 1 },
    logContainer: { flex: 1, paddingHorizontal: 15, paddingTop: 10 },
    logRow: { marginBottom: 4 },
    logText: { fontFamily: 'monospace', fontSize: 13 },
    inputWrapper: { 
        flexDirection: 'row', 
        paddingHorizontal: 10, 
        paddingVertical: 8,
        alignItems: 'center',
        borderTopWidth: 1
    },
    sendButton: {
        marginLeft: 5,
        justifyContent: 'center',
        paddingBottom: 2 
    }
});

export default ConsoleScreen;