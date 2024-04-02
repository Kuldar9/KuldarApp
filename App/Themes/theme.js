export const colors = {
  // Primary color (vibrant and matches icons)
  primary: '#3b82f6', // Darker blue

  // Secondary color (for accents and buttons)
  secondary: '#87ceeb', // Lighter blue (less saturated)

  // Background color (consider a tint of the primary for consistency)
  background: '#e6eefa', // Light blue tint

  // Text color (consider a light gray for better readability on dark backgrounds)
  text: '#87ceeb', // Dark gray for better contrast

  button: {
    primary: {
      background: '#c239f4', // Pink (consistent with your current theme)
      text: '#ffffff', // White for readability on pink
    },
    secondary: {
      background: '#3b82f6', // Primary color
      text: '#ffffff', // White for readability on blue
    },
    transparent: {
      background: 'rgba(0, 0, 0, 0.2)', // Adjusted opacity for better visibility
      text: '#ffffff', // White for readability on any background
      borderColor: '#3b82f6', // Primary color border for transparency
      borderWidth: 1, // Add a thin border
    },
  },
};


export const fonts = {
  heading: 'Roboto, sans-serif', 
  body: 'Roboto, sans-serif',
};

export const buttonStyles = {
  primary: {
    borderRadius: 8, // Rounded corners
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondary: {
    // Similar styles to primary, adjust as needed
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transparent: {
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export const barStyles = {
  topBar: {
    height: 50,
    // Add more top bar styles as needed
  },
  bottomBar: {
    height: 50,
    // Add more bottom bar styles as needed
  },
};

export const textStyles = {
  heading: {
    fontFamily: fonts.heading,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    // Add more text styles as needed
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.text,
    // Add more text styles as needed
  },
};