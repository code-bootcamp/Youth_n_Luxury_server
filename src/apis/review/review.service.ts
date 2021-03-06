import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CurrentUser } from "src/common/auth/gql-user.param";
import { getRepository, Repository } from "typeorm";
import { Product } from "../product/entities/product.entity";
import { SellerInfo } from "../sellerInfo/sellerInfo.entities.ts/sellerInfo.entity";
import { User } from "../user/entities/user.entity";
import { Review } from "./entities/review.entity";




@Injectable()
export class ReviewService{
   constructor(

    @InjectRepository(SellerInfo)
    private readonly sellerInfoRepository:Repository<SellerInfo>,

    @InjectRepository(Review)
    private readonly reviewRepository:Repository<Review>,

    @InjectRepository(Product)
    private readonly productRepository:Repository<Product>,

    @InjectRepository(User)
    private readonly userRepository:Repository<User>
   ){}
    async create({content,ratings,img,productId,userId,currentUser}){
        
        const buyer = await this.userRepository.findOne({where:{user_id:currentUser.id}})
        const product = await this.productRepository.findOne({where:{product_id:productId},relations:['user']})
    

        const review = await  this.reviewRepository.find({where:{user_id:userId},relations:['user']})
    //    const product = await getRepository(User)
    //     .createQueryBuilder('user')
    //     .leftJoinAndSelect('user.product','product')
    //     .leftJoinAndSelect('product.user','seller')
    //     .leftJoinAndSelect('user.review','review')
    //     .where('product.id= :id',{id : productId})
    //     .getOne()
        
    console.log('123123321',review)
        

      
        
        return await this.reviewRepository.save({content,ratings,img,user:buyer, product})
    }
    async findReview({userId}){
        
        const result = await this.userRepository.find({where:{user_id:userId},relations:['product']})
        const numReview = await this.userRepository.find({where:{user_id:userId},relations:['review']}) 
        
        console.log('this is result', result)
        console.log('this is numReview', numReview)

        if(numReview[0].review.length === 0){
            throw new UnprocessableEntityException('????????? ???????????? ?????? ??????????????????')
        }
        let ratingArr = []
        let rateCounting = 0
        for(let i = 0; i < numReview[0].review.length; i++){
            ratingArr.push(numReview[0].review[i].ratings)
        }
        for(let i = 0; i < ratingArr.length; i++){
            rateCounting += ratingArr[i]
        }
        let ratingAvg = Math.round(rateCounting/ratingArr.length)
        
        let urlArr = []
        for(let i = 0; i < result[0].product.length; i++){
            
            urlArr.push(result[0].product[i].urls)
        }
        
        let imgs = JSON.stringify(urlArr)
      
        const aaa = {
            reviewNum:numReview[0].review.length,
            ratings:ratingAvg,
            nickname:numReview[0].nickname,
            productNum:result[0].product.length,
            profilePic:result[0].profilePic,
            img:imgs
        }
        const {reviewNum, ratings, nickname, productNum, profilePic, img} = aaa
       
        const sellerInfo = await this.sellerInfoRepository.save({reviewNum,seller:numReview,uaer:result, ratings, nickname, productNum, profilePic, img})
        
        return sellerInfo

    }
    
}