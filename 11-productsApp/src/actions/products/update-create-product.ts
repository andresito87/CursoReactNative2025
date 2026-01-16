import { isAxiosError } from "axios";
import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";

export const updateCreateProduct = (product: Partial<Product>) => {

    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

    if (product.id && product.id !== 'new') { // viene un id que me dice que quiere crear o modificar un producto
        return updateProduct(product);
    }

    return createProduct(product);

};

// modifica las url de las images para que las podamos almacenar en el backend
const prepareImages = (images: string[]) => {

    return images.map(
        image => image.split('/').pop()
    );

};

const updateProduct = async (product: Partial<Product>) => {

    const { id, images = [], ...rest } = product; // extraigo el id porque el backend no lo tiene que recibir al actualizar

    try {
        const checkedImages = prepareImages(images);

        const { data } = await tesloApi.patch(`/products/${id}`, {
            images: checkedImages,
            ...rest
        });

        return data;

    } catch (error) {

        if (isAxiosError(error)) { // solo revisamos si es un error de Axios, el resto no interesa
            console.log(error.response?.data);
        }

        throw new Error(`Error updating product id: ${id}`);
    }
};

const createProduct = async (product: Partial<Product>) => {

    const { id, images = [], ...rest } = product; // extraigo el id porque el backend no lo tiene que recibir al actualizar

    try {
        const checkedImages = prepareImages(images);

        const { data } = await tesloApi.post('/products', {
            images: checkedImages,
            ...rest
        });

        return data;

    } catch (error) {

        if (isAxiosError(error)) { // solo revisamos si es un error de Axios, el resto no interesa
            console.log(error.response?.data);
        }

        throw new Error(`Error updating product id: ${id}`);
    }

};