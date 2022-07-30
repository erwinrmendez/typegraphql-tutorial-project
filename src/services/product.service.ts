import {
  CreateProductInput,
  GetProductInput,
  ProductModel,
} from "../schemas/product.schema";
import { User } from "../schemas/user.schema";

class ProductService {
  async createProduct(input: CreateProductInput & { user: User["_id"] }) {
    return ProductModel.create(input);
  }

  async findProducts() {
    return ProductModel.find().lean();
  }

  async findSingleProduct(input: GetProductInput) {
    return ProductModel.findOne(input).lean();
  }
}

export default ProductService;
