import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import { ThemeContext } from '../components/utils/themeProvider'; // Adjust the path as necessary
import Button from '../components/common/button'; // Path to the custom Button component
import TextInput from '../components/common/textInput'; // Path to the custom TextInput component
import { getColorInfo, generatePalette } from '../components/utils/colorGen'; // Adjust path as necessary

let ColorPicker;
if (Platform.OS !== 'web') {
  ColorPicker = require('react-native-color-picker').default;
}

const SettingScreen = () => {
  const colors = useContext(ThemeContext); // Access theme colors from ThemeContext
  const [selectedColor, setSelectedColor] = useState(colors.background); // Default to lightest theme color
  const [darkPalette, setDarkPalette] = useState([]);
  const [lightPalette, setLightPalette] = useState([]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const generatePalettes = async () => {
    try {
      const colorInfo = await getColorInfo(selectedColor);
      setDarkPalette(generatePalette(colorInfo, 'dark'));
      setLightPalette(generatePalette(colorInfo, 'light'));
    } catch (error) {
      console.error('Error generating palettes:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        {ColorPicker && (
          <ColorPicker
            color={selectedColor}
            onColorChange={handleColorChange}
            style={{ width: 200, height: 200, marginBottom: 20 }}
          />
        )}
        <TextInput
          onChangeText={setSelectedColor}
          placeholder="Enter hex color"
        />
        <Button
          title="Generate Palettes"
          onPress={generatePalettes}
        />
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: colors.accent }}>Dark Theme Palette:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {darkPalette.map((color, index) => (
              <View key={index} style={{ width: 80, height: 80, backgroundColor: color, margin: 5 }} />
            ))}
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: colors.accent }}>Light Theme Palette:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {lightPalette.map((color, index) => (
              <View key={index} style={{ width: 80, height: 80, backgroundColor: color, margin: 5 }} />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingScreen;