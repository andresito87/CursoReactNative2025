
import { ScrollView, Text, View } from 'react-native'
import { globalStyles } from '../theme/theme';
import { Title } from '../../components/ui/Title';

export const menuItems = [
    // 01-animationMenuItems
    {
        name: 'Animation 101',
        icon: 'cube-outline',
        component: 'Animation101Screen',
    },
    {
        name: 'Animation 102',
        icon: 'albums-outline',
        component: 'Animation102Screen',
    },


    // 02-menuItems
    {
        name: 'Pull to refresh',
        icon: 'refresh-outline',
        component: 'PullToRefreshScreen',
    },
    {
        name: 'Section List',
        icon: 'list-outline',
        component: 'CustomSectionListScreen',
    },
    {
        name: 'Modal',
        icon: 'copy-outline',
        component: 'ModalScreen',
    },
    {
        name: 'InfiniteScroll',
        icon: 'download-outline',
        component: 'InfiniteScrollScreen',
    },
    {
        name: 'Slides',
        icon: 'flower-outline',
        component: 'SlidesScreen',
    },
    {
        name: 'Themes',
        icon: 'flask-outline',
        component: 'ChangeThemeScreen',
    },

    // 03- uiMenuItems
    {
        name: 'Switches',
        icon: 'toggle-outline',
        component: 'SwitchScreen',
    },
    {
        name: 'Alerts',
        icon: 'alert-circle-outline',
        component: 'AlertScreen',
    },
    {
        name: 'TextInputs',
        icon: 'document-text-outline',
        component: 'TextInputScreen',
    },
];

export const HomeScreen = () => {
    return (
        <View style={globalStyles.mainContainer}>
            <View style={globalStyles.globalMargin}>
                <ScrollView>
                    <Title text='Opciones del menú' safe />

                    {
                        menuItems.map(item => (
                            <Text key={item.component}>{item.name}</Text>
                        ))
                    }

                </ScrollView>
            </View>
        </View>
    )
}