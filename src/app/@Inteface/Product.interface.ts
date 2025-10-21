import { int } from 'three/src/nodes/TSL.js';

export interface Product {
  generatedID: number;
  imageURL: string;
  modelColor: string;
  modelName: string;
  modelType: string;
  modelDesc: string;
}

export interface ImageProduct {
  productID: number;
  productThumbnailImage: string;
  productName: string;
}
export interface ImageProductDetails {
  productID: number;
  productImages: string[];
  productThumbnailImage: string;
  defaultPrice: number;
  productDescription: string;
  productName: string;
}
