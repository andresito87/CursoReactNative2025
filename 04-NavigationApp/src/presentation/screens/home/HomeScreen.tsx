import React, { useEffect } from 'react'
import { useWindowDimensions, View } from 'react-native'
import { globalStyles } from '../../theme/theme'
import { type NavigationProp, useNavigation } from '@react-navigation/native'
import { PrimaryButton } from '../../components/shared/PrimaryButton'
import type { RootStackParams } from '../../routes/StackNavigator'
import { HamburgerMenu } from '../../components/shared/HamburgerMenu'

export const HomeScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>()
    const dimensions = useWindowDimensions()

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                (dimensions.width < 758) ?
                    <HamburgerMenu />
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
