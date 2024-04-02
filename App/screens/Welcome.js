import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, Dimensions } from 'react-native';
import { useTheme } from '../Themes/ThemeProvider'; 
import CustomButton from '../Components/InternalComponents/CustomButton';
import WelcomeSection from '../Components/WelcomeSection';
import PaginationDots from '../Components/PaginationDots';

const WelcomeScreen = ({ navigation }) => {
    const { backgroundImage, colors } = useTheme(); 
    const [currentPage, setCurrentPage] = useState(0);

    const scrollViewRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        // Automatically scroll to the next page every 5 seconds
        timerRef.current = setInterval(() => {
            if (currentPage < 4) {
                scrollViewRef.current.scrollTo({
                    x: (currentPage + 1) * Dimensions.get('window').width,
                    animated: true,
                });
                setCurrentPage(prevPage => prevPage + 1);
            } else {
                // Scroll back to the first page when reaching the last page
                scrollViewRef.current.scrollTo({
                    x: 0,
                    animated: true,
                });
                setCurrentPage(0);
            }
        }, 5000);

        // Clean up timer on component unmount
        return () => clearInterval(timerRef.current);
    }, [currentPage]);

    const handleScroll = (event) => {
        const page = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
        setCurrentPage(page);
    };

    const handleGetStarted = () => {
        navigation.navigate('Login');
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.scrollViewContent}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                onMomentumScrollEnd={(event) => {
                    const page = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
                    setCurrentPage(page);
                }}
            >
                <WelcomeSection
                    title="Welcome to Our Company"
                    description="We're delighted to offer you seamless support using our app, connecting you with our support team seamlessly. Our support team can effortlessly chat with you, resolving any issues you encounter."
                    image={require('../Assets/images/intro.png')}
                />
                <WelcomeSection
                    title="24/7 IT Support"
                    description="Access round-the-clock IT support to resolve issues anytime, anywhere."
                    image={require('../Assets/images/support.png')}
                />
                <WelcomeSection
                    title="Enhanced Security"
                    description="Ensure your data's security with our state-of-the-art protection measures."
                    image={require('../Assets/images/security.png')}
                />
                <WelcomeSection
                    title="Effortless Collaboration"
                    description="Seamlessly collaborate with our support."
                    image={require('../Assets/images/collaboration.png')}
                />
                <WelcomeSection
                    title="Personalized Solutions"
                    description="Get personalized IT solutions tailored to your specific needs and preferences."
                    image={require('../Assets/images/solutions.png')}
                />
            </ScrollView>
            <PaginationDots totalPages={5} currentPage={currentPage} />
            <View style={styles.getStartedButton}>
                <CustomButton
                    title="Get Started"
                    onPress={() => navigation.navigate('Login')}
                    buttonStyle={{ borderColor: colors.secondary }} 
                    textColor={colors.text}
                />
            </View>   
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    getStartedButton: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
});

export default WelcomeScreen;