import { Gender } from "../../domain/entities/product";
import { Size } from "../../infrastructure/interfaces/teslo-products.response";

export const SIZES: Size[] = [Size.S, Size.Xs, Size.M, Size.L, Size.Xl, Size.Xxl];
export const GENDERS: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex,];