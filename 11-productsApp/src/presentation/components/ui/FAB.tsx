import { Button } from "@ui-kitten/components";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { MyIcon } from "./MyIcon";

interface Props {
    iconName: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export const FAB = ({ iconName, onPress, style }: Props) => {

    return (
        <Button
            style={[styles.button, style]}
            accessoryLeft={() => (
                <View style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center" }}>
                    <MyIcon name={iconName} white style={{ width: 50, height: 50 }} />
                </View>
            )}
            onPress={onPress}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        height: 80,
        width: 80,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 3,
        borderRadius: 13
    }
});