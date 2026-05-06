// Profile.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../Themes/theme';

const ProfileScreen = ({ navigation }) => { // Add navigation prop here
  const { colors } = useTheme();

  return (
    <View style={styles.container(colors)}>
      <View style={styles.profileHeader}>
        <Image 
          source={require('../Assets/icons/profile-icon.gif')} // Replace with actual path to the profile image
          style={styles.profileImage}
        />
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>johndoe@example.com</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.editButton} 
        onPress={() => navigation.navigate('ProfileEdit')} // Navigate to ProfileEdit screen
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.infoText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Interests</Text>
        <Text style={styles.infoText}>• Traveling</Text>
        <Text style={styles.infoText}>• Photography</Text>
        <Text style={styles.infoText}>• Technology</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: (colors) => ({
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  }),
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: '#777',
  },
  editButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoSection: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;