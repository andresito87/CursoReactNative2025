import { Product } from '../../../domain/entities/product';
import { Layout, List } from '@ui-kitten/components';
import { ProductCard } from './ProductCard';
import { useState } from 'react';
import { RefreshControl } from 'react-native';

interface Props {
    products: Product[],
    fetchNextPage: () => void;
}

export const ProductList = ({ products, fetchNextPage }: Props) => {

    const [isRefreshing, setIsRefreshing] = useState(false);

    const onPullToRefresh = async () => {
        setIsRefreshing(true);

        await new Promise<void>((resolve) => setTimeout(resolve, 1500));

        setIsRefreshing(false);
    };

    return (
        <List
            data={products}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            numColumns={2}
            renderItem={({ item }) => (
                <ProductCard product={item} />
            )}
            ListFooterComponent={() => <Layout style={{ height: 150 }} />}
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.8}

            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onPullToRefresh}
                />
            }
        />
    );
};