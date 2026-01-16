import { useNavigation } from '@react-navigation/native';
import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MyIcon } from '../components/ui/MyIcon';

interface Props {
    title: string;
    subtitle?: string;

    rightAction?: () => void;
    rightActionIcon?: string;

    children?: ReactNode;
}

export const MainLayout = ({
    title,
    subtitle,
    rightAction,
    rightActionIcon,
    children
}: Props) => {

    const { top } = useSafeAreaInsets();
    const { canGoBack, goBack } = useNavigation();

    const RenderRightAction = () => {

        if (rightAction === undefined || rightActionIcon === undefined) return null;

        return (
            <TopNavigationAction
                onPress={rightAction}
                icon={<MyIcon
                    name={rightActionIcon}
                />}
            />
        );
    };

    const renderBackAction = () => (
        <TopNavigationAction
            icon={<MyIcon name='arrow-back-outline' />}
            onPress={goBack}
        />
    );

    return (
        <Layout style={{ paddingTop: top }}>
            <TopNavigation
                title={title}
                subtitle={subtitle}
                alignment='center'
                accessoryLeft={canGoBack() ? renderBackAction : undefined}
                accessoryRight={() => <RenderRightAction />}
            />
            <Divider />
            <Layout style={{ height: '100%' }}>
                {children}
            </Layout>
        </Layout>
    );
};