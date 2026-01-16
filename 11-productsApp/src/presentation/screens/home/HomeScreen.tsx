import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { ProductList } from '../../components/products/ProductList';
import { FAB } from '../../components/ui/FAB';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNativeNavigator';

export const HomeScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    // Recupera y almacena en caché los productos
    // const { isLoading, data: products = [] } = useQuery({
    //     queryKey: ['products', 'infinite'],
    //     staleTime: 1000 * 60 * 60, // 1 hour
    //     queryFn: () => getProductsByPage(0)
    // });

    // Recupera y almacena en caché los productos de manera infinita, siempre va a devolver productos basados en paginación
    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['products', 'infinite'],
        staleTime: 1000 * 60 * 60, // 1 hour
        initialPageParam: 0,
        queryFn: async (params) => {
            console.log({ params });
            return await getProductsByPage(params.pageParam);
        },
        getNextPageParam: (_lastPage, allPages) => allPages.length // IMPORTANTE: desestructurar lastPage, sino no funciona correctamente

    });

    return (
        <>
            <MainLayout
                title='TesloShop - Products'
                subtitle='Aplicación administrativa'
            >
                {isLoading ?
                    <FullScreenLoader />
                    : (
                        <ProductList
                            products={data?.pages.flat() ?? []}
                            fetchNextPage={fetchNextPage}
                        />
                    )
                }
            </MainLayout>

            <FAB
                iconName='save-outline'
                onPress={() => navigation.navigate('ProductScreen', { productId: 'new' })}
                style={{
                    position: 'absolute',
                    bottom: 30,
                    right: 20
                }}
            />
        </>
    );
};