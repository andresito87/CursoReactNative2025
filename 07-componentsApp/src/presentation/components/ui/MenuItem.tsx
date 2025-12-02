import { Pressable, StyleSheet, View } from 'react-native'
import { colors } from '../../screens/theme/theme'
import Ionicons, { IoniconsIconName } from '@react-native-vector-icons/ionicons'

interface Props {
    name: string,
    icon: IoniconsIconName,
    component: string
}


export const MenuItem = ({ name, icon, component }: Props) => {
    return (
        <Pressable
            onPress={() => { }}
        >
            <View
                style={{
                    ...styles.container,
                    backgroundColor: colors.cardBackground
                }}>
                <Ionicons
                    name={icon}
                    size={25}
                    style={{ marginRight: 10 }}
                    color={colors.primary}
                />

            </View>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5
    }
})