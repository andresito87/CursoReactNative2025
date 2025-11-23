import React, { useEffect } from 'react'
import { Pressable, Text, useWindowDimensions, View } from 'react-native'
import { globalStyles } from '../../theme/theme'
import { DrawerActions, type NavigationProp, useNavigation } from '@react-navigation/native'
import { PrimaryButton } from '../../components/shared/PrimaryButton'
import type { RootStackParams } from '../../routes/StackNavigator'

export const HomeScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>()
    const dimensions = useWindowDimensions()

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                (dimensions.width < 758) ?
                    < Pressable onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
                        <Text>Menu</Text>
                    </Pressable >
                    : <></>
            )
        })
    })


    return (
        <View style={globalStyles.container}>
            <PrimaryButton
                onPress={() => navigation.navigate('Products')}
                label="Productos"
            />
            <PrimaryButton
                onPress={() => navigation.navigate('Settings')}
                label="Settings"
            />
        </View>
    )
}
