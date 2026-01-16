import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/StackNativeNavigator";
import { Alert, ScrollView } from "react-native";
import { Button, ButtonGroup, Input, Layout, useTheme } from "@ui-kitten/components";
import { Formik } from "formik";
import { updateCreateProduct, getProductById } from "../../../actions/products";
import { MainLayout } from "../../layouts/MainLayout";
import { MyIcon } from "../../components/ui/MyIcon";
import { Product } from "../../../domain/entities/product";
import { ProductSlideImages } from "../../components/products/ProductSlideImages";
import { GENDERS, SIZES } from "../../../config/constants/constants";

interface Props extends NativeStackScreenProps<RootStackParams, 'ProductScreen'> { } // Para poder leer y acceder al parámetro en la ruta

export const ProductScreen = ({ route, navigation }: Props) => {

    // Usamos referencia del id para evitar rerenders cuando el id cambie con otro producto
    const productId = route.params.productId;

    const theme = useTheme();
    const queryClient = useQueryClient();

    const { data: product } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProductById(productId)
    });

    // mutación de la data del caché de tanstack query para modificarla o actualizar la información de un producto
    const mutation = useMutation({
        mutationFn: ({ values, productId }: { values: Product; productId: string; }) =>
            updateCreateProduct({ ...values, id: productId }),

        onMutate: ({ productId }) => ({ isEdit: productId !== 'new' }),

        onSuccess: (data, _vars, ctx) => {
            queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
            queryClient.setQueryData(['product', data.id], data);

            // Si era creación, actualiza la ruta a su nuevo id
            if (!ctx?.isEdit) {
                navigation.setParams({ productId: data.id });
            }

            Alert.alert(
                'Éxito',
                ctx?.isEdit ? 'Producto actualizado correctamente' : 'Producto creado correctamente'
            );
        },
    });

    if (!product) {
        return (<MainLayout title="Cargando..." />);
    }

    return (
        <Formik
            initialValues={product}
            validate={() => { }} // para colocar funciones de validación
            onSubmit={(values) => mutation.mutate({ values, productId })} // los datos del formulario van a caché para que sean creados o modificados
        >
            {
                ({
                    handleChange,
                    handleSubmit,
                    values,
                    setFieldValue
                }) => (
                    <MainLayout
                        title={values.title.substring(0, 30)}
                        subtitle={`Precio: ${values.price} €`}

                    >
                        <ScrollView style={{ flex: 1 }}>

                            {/* Imágenes del producto */}
                            <Layout
                                style={{
                                    marginVertical: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <ProductSlideImages images={values.images} />
                            </Layout>

                            {/* Formulario */}
                            <Layout style={{ marginHorizontal: 10 }}>
                                <Input
                                    label='Título'
                                    value={values.title}
                                    onChangeText={handleChange('title')}
                                    style={{ marginVertical: 5 }}
                                />
                                <Input
                                    label='Slug'
                                    value={values.slug}
                                    onChangeText={handleChange('slug')}
                                    style={{ marginVertical: 5 }}
                                />
                                <Input
                                    label='Descripción'
                                    value={values.description}
                                    onChangeText={handleChange('description')}
                                    multiline
                                    numberOfLines={5}
                                    style={{ marginVertical: 5 }}
                                />
                            </Layout>

                            {/* Precio e Inventario */}
                            <Layout style={{ marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', gap: 10 }}>
                                <Input
                                    label='Precio'
                                    value={values.price.toString()}
                                    onChangeText={handleChange('price')}
                                    style={{ flex: 1 }}
                                    keyboardType="numeric"
                                />
                                <Input
                                    label='Inventario'
                                    value={values.stock.toString()}
                                    onChangeText={handleChange('stock')}
                                    style={{ flex: 1 }}
                                    keyboardType="numeric"
                                />
                            </Layout>

                            {/* Selectores */}
                            <ButtonGroup
                                style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}
                                size="small"
                                appearance="outline"
                            >
                                {SIZES.map((size) => (
                                    <Button
                                        key={size}
                                        style={{
                                            flex: 1,
                                            backgroundColor: values.sizes.includes(size)
                                                ? theme['color-primary-200']
                                                : undefined
                                        }}
                                        onPress={() => {
                                            setFieldValue('sizes',
                                                values.sizes.includes(size)
                                                    ? values.sizes.filter(s => s !== size)
                                                    : [...values.sizes, size]
                                            );
                                        }}
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </ButtonGroup>

                            <ButtonGroup
                                style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}
                                size="small"
                                appearance="outline"
                            >
                                {GENDERS.map((gender) => (
                                    <Button
                                        key={gender}
                                        style={{
                                            flex: 1,
                                            backgroundColor: values.gender.startsWith(gender)
                                                ? theme['color-primary-200']
                                                : undefined
                                        }}
                                        onPress={() => {
                                            setFieldValue('gender', gender);
                                        }}
                                    >
                                        {gender}
                                    </Button>
                                ))}
                            </ButtonGroup>

                            {/* Botón de guardar */}
                            <Button
                                accessoryLeft={<MyIcon name="save-outline" white />}
                                onPress={() => handleSubmit()}
                                style={{ margin: 15 }}
                            >
                                Guardar
                            </Button>
                            <Layout style={{ height: 150 }} />
                        </ScrollView>
                    </MainLayout>
                )
            }
        </Formik>
    );
};