import { Injectable, UseGuards } from "@nestjs/common";
import { Mutation } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { GqlAuthAccessGuard } from "src/common/auth/gql-auth.guard";
import { getRepository, Repository } from "typeorm";
import { Product } from "../product/entities/product.entity";
import { User } from "../user/entities/user.entity";
import { Event } from "./entities/event.entity";




@Injectable()
export class EventService{
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository:Repository<Event>,

        @InjectRepository(User)
        private readonly userRepository:Repository<User>,

        @InjectRepository(Product)
        private readonly productRepository:Repository<Product>
        
    ){}

    // async createChat({currentUser,chatLog}){
    //     const user = await this.userRepository.findOne({where:{id:currentUser.id}})
    //     return await this.eventRepository.save({user,chatLog})
    // }

    async fetchChat({roomId}){

        const room = await getRepository(Event)
        .createQueryBuilder('event')
        .leftJoinAndSelect('event.user','user')
        .leftJoinAndSelect('event.product','product')
        .leftJoinAndSelect('prudct.user','seller')
        .where('event.roomId = :roomId',{roomId})
        .getOne()

        // const room = await this.eventRepository.find({where:{roomId:roomId},relations:['user']})
        
        return room
    }

    async createChat({productId,currentUser}){
        const product = await this.productRepository.findOne({where:{product_id:productId},relations:['user']})
        const user = await this.userRepository.findOne({where:{id:currentUser.id}})
        console.log('user email',user)
        const token = String(Math.floor(Math.random()*(10**6))).padStart(6,'0')

        const roomId = token + user.email

        return await this.eventRepository.save({roomId,product,user})

    }

    async updateChat({roomId,currentUser,updateChat}){
        const event = await this.eventRepository.findOne({where:{roomId},relations:['user','product']})
        const chatLog = `${event.chatLog}${currentUser.id}:${updateChat}\n`
        return await this.eventRepository.save({...event,chatLog})
    }

    async joinSeller({currentUser}){
        // const product = await this.productRepository.findOne({where:{user:currentUser.id},relations:['user']})
        // const rooms = await this.eventRepository.find({where:{user:currentUser.id},relations:['user']})

        const room = await getRepository(Event)
        .createQueryBuilder('event')
        .leftJoinAndSelect('event.user','user')
        .leftJoinAndSelect('event.product','product')
        .leftJoinAndSelect('product.user','seller')
        .where('seller.id = :id',{id:currentUser.id})
        .getMany()

        return room
    }

    // async loginUser({currentUser}){
    //     const rooms = await this.eventRepository.find({where:{user:currentUser.id},relations:['user']})
    //     return rooms
    // }

    // async checkChatRoom({currentUser}){
    //     const user = await this.eventRepository.findOne({where:{user:currentUser.id},relations:['user']})
    // }
}