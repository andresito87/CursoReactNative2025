
import React, { useState } from 'react'
import { Text, View } from 'react-native'
// import Icon from '@react-native-vector-icons/ionicons';
// import { PrimaryButton } from '../components'
import { FAB } from 'react-native-paper';
import { globalStyles } from '../theme/global.styles'

export const CounterM3Screen = () => {

    const [count, setCount] = useState(10)

    return (
        <View style={globalStyles.centerContainer}>
            <Text style={globalStyles.title}>
                {count}
            </Text>

            {/* <Icon name={"accessibility-outline"} size={35} /> */}

            <FAB
                // label='+1'
                onPress={() => setCount(count + 1)}
                onLongPress={() => setCount(0)}
                style={globalStyles.fab}
                icon="add"
            />

        </View>
    )
}