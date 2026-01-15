import { Layout, Spinner } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const FullScreenLoader = () => {

    const { top, bottom } = useSafeAreaInsets();
    const height = 100 - (top + bottom) / 10;

    return (
        <Layout
            style={{
                flex: 1,
                paddingBottom: height + bottom + top,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Spinner size="giant" />
        </Layout>
    );
};