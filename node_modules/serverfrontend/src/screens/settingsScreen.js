import React, { useState, useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ThemeContext } from '../components/utils/themeProvider';
import Button from '../components/common/button'; 
import { getColorInfo, generatePalette } from '../components/utils/colorGen'; 
import ColorWheel from '../components/common/colorWheel'; 

const SettingScreen = () => {
  console.log('const SettingScreen, file: settingsScreen.js');
  const colors = useContext(ThemeContext);
  const [selectedColor, setSelectedColor] = useState('FFFFFF');
  const [darkPalette, setDarkPalette] = useState([]);
  const [lightPalette, setLightPalette] = useState([]);

  const handleGeneratePalettes = async () => {
    console.log('const handleGeneratePalettes, file: settingsScreen.js');
    try {
      const colorInfo = await getColorInfo(selectedColor);
      const generatedDarkPalette = generatePalette(colorInfo, 'dark');
      const generatedLightPalette = generatePalette(colorInfo, 'light');
      if (generatedDarkPalette.length > 0) {
        setDarkPalette(generatedDarkPalette);
        setLightPalette([]); // Clear light palette if dark palette is generated
      } else if (generatedLightPalette.length > 0) {
        setLightPalette(generatedLightPalette);
        setDarkPalette([]); // Clear dark palette if light palette is generated
      }
    } catch (error) {
      console.error('Error generating palettes:', error);
    }
  };

  const handleApplyAndSave = () => {
    // Implement apply and save functionality here
  };
  console.log('previous done, loading view, file: settingsScreen.js');
  console.log('Dark Palette:', darkPalette);
  console.log('Light Palette:', lightPalette);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <ColorWheel selectedColor={selectedColor} onColorChange={setSelectedColor} /> {/* Pass setSelectedColor function */}
        </View>
        <View style={{ marginBottom: 20 }}>
          <Button title="Generate Palettes" onPress={handleGeneratePalettes} />
        </View>
        <View style={{ width: '100%', marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button title="Apply & Save" onPress={handleApplyAndSave} />
          </View>
        </View>
        {darkPalette.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: colors.accent }}>Dark Theme Palette:</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {darkPalette.map((color, index) => (
                <View key={index} style={{ width: 80, height: 80, backgroundColor: color, margin: 5 }} />
              ))}
            </View>
          </View>
        )}
        {lightPalette.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: colors.accent }}>Light Theme Palette:</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {lightPalette.map((color, index) => (
                <View key={index} style={{ width: 80, height: 80, backgroundColor: color, margin: 5 }} />
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SettingScreen;