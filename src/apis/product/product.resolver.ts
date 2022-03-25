
import { UseGuards } from "@nestjs/common";
import { Resolver,Query, Mutation, Args  } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/common/auth/gql-auth.guard";
import { CurrentUser, ICurrentUser } from "src/common/auth/gql-user.param";
import { MainCategory } from "../mainCategory/entities/mainCategory.entity";

import { CreateProductInput } from "./dto/createProductInput";
import { UpdateProductInput } from "./dto/updateProductIntput";
import { Product } from "./entities/product.entity";
import { ProductService } from "./product.service";


//recentOrder.user.id

@Resolver()
export class ProductResolver{
    constructor(
        private readonly productSerivce:ProductService,
        
    ){}

    @Query(() => [Product])
    async fetchProducts(){
        return await this.productSerivce.findAll()
    }

    @Query(() => Product)
    async fetchProduct(
        @Args('name') name:string
    ){
        return await this.productSerivce.findOne({name})
    }

    @UseGuards(GqlAuthAccessGuard)
    @Mutation(() => Product)
    async createProduct(
        @CurrentUser() currentUser:ICurrentUser,
        @Args('createProductInput')createProductInput:CreateProductInput,
       
    ){
        console.log(currentUser)
        return await this.productSerivce.create({createProductInput,currentUser})
    }
    @Query(() => [Product])
    async fetchProductRelateMainCategory(
        @Args('mainCategory') mainCategory:string
    ){
        return await this.productSerivce.findProductRelateMainCategory({mainCategory})
    }

    @Mutation(() => Product)
    async updateProduct(
      @Args(`productId`) productId: string,
      @Args(`updateProductInput`) updateProductInput: UpdateProductInput,
    ) {
      return this.productSerivce.update({ productId, updateProductInput });
    }
}