// import { UseGuards } from "@nestjs/common";
// import { Args, Mutation, Resolver,Query } from "@nestjs/graphql";
// import { GqlAuthAccessGuard } from "src/common/auth/gql-auth.guard";
// import { RolesGuard } from "src/common/auth/gql-role.guard";
// import { Roles } from "src/common/auth/gql-role.param";
// import { CurrentUser, ICurrentUser } from "src/common/auth/gql-user.param";
// import { Role } from "../user/entities/user.entity";
// import { UserService } from "../user/user.service";

// import { AdminQueryService } from "./adminQuery.service";
// import { UpdateAdminQueryInput } from "./dto/updateAdminQueryInput";
// import { AdminQuery } from "./entities/adminQuery.entity";

// @Roles(Role.ADMIN)
// @UseGuards(GqlAuthAccessGuard,RolesGuard)
// @Mutation(() => )
// async replayAdminQuery(){

// }
// //이건어케하냐??(유저랑 어드민카테고리 못봄)
// @Roles(Role.ADMIN)
// @UseGuards(GqlAuthAccessGuard, RolesGuard)
// @Query(() => [AdminQuery])
// async fetchAdminQuerys(){
//     return this.adminQueryService.findAll()
// }

// //이건 성공
// @Roles(Role.ADMIN)
// @UseGuards(GqlAuthAccessGuard,RolesGuard)
// @Query(() => AdminQuery)
// async fetchAdminQuery(
//     @Args('adminQueryId') adminQueryId:string,
//     @Args('adminCategoryId') adminCategoryId:string,
//     @Args('userId') userId:string
// ){
//     return this.adminQueryService.findOne({adminQueryId,adminCategoryId,userId})
// }

// @Roles(Role.ADMIN)
// @UseGuards(GqlAuthAccessGuard, RolesGuard)
// @Mutation(() => Boolean)
// async deleteAdminQuery(
//     @Args('adminQueryId') adminQueryId:string
// ){
//     return await this.adminQueryService.delete({adminQueryId})
// }


// @UseGuards(GqlAuthAccessGuard)
// @Mutation(() =>  AdminQuery)
// async updateAdminQuery(
//     @Args('adminQueryId') adminQueryId:string,
//     @Args('updatedAdminQueryInput') updateAdminQueryInput: UpdateAdminQueryInput
// ){
//     //cannot null for non-nullable떠서 adminCategory랑 user다시 설정해줘야됨...
//     return await this.adminQueryService.update({adminQueryId,updateAdminQueryInput})
// }