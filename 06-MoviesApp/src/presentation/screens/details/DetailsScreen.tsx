import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const DetailsScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
            <Text>DetailsScreen</Text>
        </SafeAreaView>
    )
}