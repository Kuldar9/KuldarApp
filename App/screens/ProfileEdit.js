import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useTheme } from '../Themes/theme'; // Make sure your theme hook is set up
import * as ImagePicker from 'expo-image-picker'; // Import Expo Image Picker

const ProfileEditScreen = () => {
  const { colors } = useTheme(); // Access your theme colors
  const [name, setName] = useState('John Doe'); // Initial state for name
  const [email, setEmail] = useState('johndoe@example.com'); // Initial state for email
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture

  const handleChoosePhoto = async () => {
    // Ask for permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    // Launch image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Check if the user canceled the picker
    if (result.cancelled) {
      console.log('User cancelled image picker');
      return;
    }

    // Set the selected image
    const source = { uri: result.uri };
    setProfilePicture(source);
  };

  const handleSaveProfile = () => {
    // Show an alert with the current profile information
    Alert.alert('Profile Updated', `Name: ${name}\nEmail: ${email}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Edit Profile</Text>

      <TouchableOpacity onPress={handleChoosePhoto} style={styles.profilePictureContainer}>
        {profilePicture ? (
          <Image source={profilePicture} style={styles.profilePicture} />
        ) : (
          <View style={styles.placeholderPicture}>
            <Text style={{ color: colors.subText }}>Tap to select picture</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholder="Name"
        placeholderTextColor={colors.subText}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholder="Email"
        placeholderTextColor={colors.subText}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: colors.primary }]}
        onPress={handleSaveProfile}
      >
        <Text style={{ color: colors.card }}>Save</Text>
      </TouchableOpacity>
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
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholderPicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  saveButton: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default ProfileEditScreen;