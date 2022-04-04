import { Field, ObjectType } from "@nestjs/graphql";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
@ObjectType()
export class Brand{
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    brand_id:string

    @Column()
    @Field(() => String)
    name:string

    @DeleteDateColumn()
    deltedAt:Date
}