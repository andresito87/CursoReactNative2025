import { API_URL } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";
import { TesloProduct } from "../interfaces/teslo-products.response";

// Permite evitar un efecto dominó, que si el backend cambia, mi aplicación con cambios mínimos aquí
// seguirá funcionando porque nuestro código no depende de formato que nos devuelve el api
// sino de una entidad de nuestro dominio
export class ProductMapper {

    static tesloProductToEntity(tesloProduct: TesloProduct): Product {

        return {
            id: tesloProduct.id,
            title: tesloProduct.title,
            price: tesloProduct.price,
            description: tesloProduct.description,
            slug: tesloProduct.slug,
            stock: tesloProduct.stock,
            sizes: tesloProduct.sizes,
            gender: tesloProduct.gender,
            tags: tesloProduct.tags,
            images: tesloProduct.images.map(
                image => `${API_URL}/files/product/${image}`
            ),
        };

    }

}