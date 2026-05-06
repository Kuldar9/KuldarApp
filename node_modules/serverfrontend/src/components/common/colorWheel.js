import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { ThemeContext } from '../utils/themeProvider';

const ColorWheel = () => {
  console.log('const ColorWheel, file: colorWheel.js');
  const colors = useContext(ThemeContext);
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');

  const debouncedSetSelectedColor = debounce((color) => {
    setSelectedColor(color);
  }, 500);

  const handleColorChange = (color) => {
    debouncedSetSelectedColor(color);
  };
  console.log('previous done, loading view, file: colorWheel.js');
  return (
      <View style={styles.container}>
        <ColorPicker
          color={selectedColor}
          onColorChange={handleColorChange}
          style={styles.colorPicker}
        />
        <Text style={[styles.colorText, { color: colors.primaryText }]}>
          {selectedColor.slice(1).toUpperCase()}
        </Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorPicker: {
    width: 200,
    height: 200,
  },
  colorText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

export default React.memo(ColorWheel);