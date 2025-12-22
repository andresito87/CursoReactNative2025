

import { Animated, Easing, StyleSheet } from 'react-native';
import { useAnimation } from '../../hooks/useAnimation';
import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';
import { CustomView } from '../../components/ui/CustomView';
import { Button } from '../../components/ui/Button';

export const Animation101Screen = () => {

    const { colors } = useContext(ThemeContext);

    const {
        animatedOpacity,
        animatedTop,
        fadeIn,
        fadeOut,
        startMovingPosition
    } = useAnimation();

    return (
        <CustomView style={styles.container}>
            <Animated.View style={[
                styles.purpleBox,
                {
                    backgroundColor: colors.primary
                },
                {
                    opacity: animatedOpacity,
                    transform: [
                        {
                            translateY: animatedTop
                        }
                    ]
                }
            ]} />

            <Button
                text='FadeIn'
                styles={{ marginTop: 10 }}
                onPress={() => {
                    fadeIn({});
                    startMovingPosition({
                        initialPosition: -100,
                        easing: Easing.elastic(1),
                        duration: 750
                    });
                }}
            />

            <Button
                text='FadeOut'
                styles={{ marginTop: 10 }}
                onPress={() => fadeOut({})}
            />
        </CustomView >
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    purpleBox: {
        width: 150,
        height: 150
    }
});