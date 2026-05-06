// SettingsScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '../Themes/theme';

const SettingsScreen = () => {
  const { colors, toggleTheme, themeMode } = useTheme();
  const [expandedSection, setExpandedSection] = useState(null);
  const translateYAnim = useState(new Animated.Value(-100))[0];
  
  // State to manage notification setting
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const sections = [
    { id: 'account', title: 'Account Settings' },
    { id: 'notifications', title: 'Notification Settings' },
    { id: 'privacy', title: 'Privacy Settings' },
  ];

  const handleToggleSection = (sectionId) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionId);
    }

    Animated.timing(translateYAnim, {
      toValue: expandedSection === sectionId ? -100 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Settings</Text>

      {/* Light/Dark Mode Toggle */}
      <View style={styles.settingItem}>
        <Text style={[styles.settingTitle, { color: colors.text }]}>Dark Mode</Text>
        <Switch
          value={themeMode === 'dark'}
          onValueChange={toggleTheme}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={themeMode === 'dark' ? colors.secondary : colors.card}
        />
      </View>

      {/* Notifications Toggle */}
      <View style={styles.settingItem}>
        <Text style={[styles.settingTitle, { color: colors.text }]}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={notificationsEnabled ? colors.secondary : colors.card}
        />
      </View>

      {/* Expandable Sections */}
      {sections.map((section) => (
        <View key={section.id} style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => handleToggleSection(section.id)}
          >
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
            <Text style={[styles.plusSign, { color: colors.text }]}>
              {expandedSection === section.id ? '-' : '+'}
            </Text>
          </TouchableOpacity>
          {expandedSection === section.id && (
            <Animated.View style={[styles.sectionContent, { transform: [{ translateY: translateYAnim }] }]}>
              <Text style={[styles.sectionText, { color: colors.subText }]}>
                Here are some detailed settings for {section.title.toLowerCase()}.
              </Text>
              {/* Example of additional settings */}
              {section.id === 'account' && (
                <>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>Username</Text>
                  <Text style={[styles.sectionText, { color: colors.subText }]}>john_doe_123</Text>
                </>
              )}
              {section.id === 'notifications' && (
                <>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>Receive Email Notifications</Text>
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={notificationsEnabled ? colors.secondary : colors.card}
                  />
                </>
              )}
              {section.id === 'privacy' && (
                <>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>Data Sharing</Text>
                  <Text style={[styles.sectionText, { color: colors.subText }]}>You can control data sharing settings here.</Text>
                </>
              )}
            </Animated.View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  sectionContainer: {
    marginVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  plusSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    paddingVertical: 10,
  },
  sectionText: {
    fontSize: 16,
  },
});

export default SettingsScreen;