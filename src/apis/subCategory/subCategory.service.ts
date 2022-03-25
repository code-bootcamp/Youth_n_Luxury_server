import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, getRepository, Repository } from "typeorm";
import { MainCategory } from "../mainCategory/entities/mainCategory.entity";
import { Product } from "../product/entities/product.entity";
import { SubCategory } from "./entities/subCategory.entity";


@Injectable()
export class SubCategoryService{
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository:Repository<SubCategory>

    

    async create({name,category}){
     
        return await this.subCategoryRepository.save({name,mainCategory:category})
    }

    async delete({subCategoryId}){
        const result = await this.subCategoryRepository.softDelete({id:subCategoryId})
        return result.affected ? true: false
    }

    async findAll(){
        return await this.subCategoryRepository.find()
    }

    async findOne({mainCategoryId}){
        // const result1 = await getConnection()
        // .createQueryBuilder()
        // .select('sub_category')
        // .from(SubCategory,'sub_category')
        // .where('sub_category.mainCategory = :id',{id:mainCategory})
        // .getMany()
        
        const result1 = await getRepository(Product)
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.subCategory','subCategory')
            .leftJoinAndSelect('subCategory.mainCategory','mainCategory')
            .where('mainCategory.id = :id', {id:mainCategoryId})
            .getMany()

        console.log('123123',result1)
        const result = await this.subCategoryRepository.findOne({where:{mainCategory:mainCategoryId},relations:["mainCategory"]})
        
       
        return result
    }

    // async findSub({CurrentUser}){
    //     const subcategory = await getRepository(SubCategory)
    //         .createQueryBuilder('subCateogry')
    //         .leftJoinAndSelect()
    //         .where('subCategory')
    // }
}