import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
@ObjectType()
export class File{
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    file_id:string

    @Column()
    @Field(() => String)
    urls:string
}