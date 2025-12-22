
import { ScrollView, View } from 'react-native';
import { Title } from '../../components/ui/Title';
import { MenuItem } from '../../components/ui/MenuItem';
import { IoniconsIconName } from '@react-native-vector-icons/ionicons';
import { CustomView } from '../../components/ui/CustomView';

interface Props {
    name: string;
    icon: IoniconsIconName;
    component: string;
}

const animationsMenuItems: Props[] = [
    {
        name: 'Animation 101',
        icon: 'cube-outline',
        component: 'Animation101Screen',
    },
    {
        name: 'Animation 102',
        icon: 'albums-outline',
        component: 'Animation102Screen',
    }
];

export const menuItems: Props[] = [
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
];

const uiMenuItem: Props[] = [
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
    }
];

export const HomeScreen = () => {
    return (
        <CustomView margin>
            <ScrollView>
                <Title text='Opciones del menú' safe />

                {
                    animationsMenuItems.map((item, index) => (
                        <MenuItem
                            key={item.component}
                            {...item}
                            isFirst={index === 0}
                            isLast={index === animationsMenuItems.length - 1}
                        />
                    ))
                }

                <View style={{ marginTop: 30 }} />

                {
                    uiMenuItem.map((item, index) => (
                        <MenuItem
                            key={item.component}
                            {...item}
                            isFirst={index === 0}
                            isLast={index === uiMenuItem.length - 1}
                        />
                    ))
                }

                <View style={{ marginTop: 30 }} />

                {
                    menuItems.map((item, index) => (
                        <MenuItem
                            key={item.component}
                            {...item}
                            isFirst={index === 0}
                            isLast={index === menuItems.length - 1}
                        />
                    ))
                }



            </ScrollView>
        </CustomView>
    );
};