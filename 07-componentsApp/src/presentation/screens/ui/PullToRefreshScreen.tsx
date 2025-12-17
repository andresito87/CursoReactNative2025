import { Title } from '../../components/ui/Title';
import { RefreshControl, ScrollView } from 'react-native';
import { useState } from 'react';
import { colors, globalStyles } from '../theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const PullToRefreshScreen = () => {

    const [isRefreshing, setIsRefreshing] = useState(false);

    const { top } = useSafeAreaInsets();

    const onRefresh = () => {
        setIsRefreshing(true);

        setTimeout(() => {
            setIsRefreshing(false);
        }, 3000);
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    progressViewOffset={top + 50}
                    colors={[colors.primary, 'red', 'orange', 'green']}
                    onRefresh={onRefresh}
                />
            }
            style={[globalStyles.mainContainer, globalStyles.globalMargin]}
        >
            <Title text='Pull to refresh' safe />
        </ScrollView>
    );
};