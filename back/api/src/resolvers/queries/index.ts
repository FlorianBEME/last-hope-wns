import { list, nonNull, nullable, queryField } from "nexus"
import { ProjectWhereUniqueInput } from "../inputs"
import { Project } from "../models/Project"

export const projects = queryField("projects", 
{
    type: nullable(list(nonNull(Project))),
    resolve: async (_root, args, ctx) => {
        return ctx.prisma.project.findMany({})
    }
})

export const project = queryField("project", 
{
    type: nullable(Project),
    args: {
        where: nonNull(ProjectWhereUniqueInput)
    },
    resolve: async (_root, args, ctx) => {
        return ctx.prisma.project.findUnique({
            where: {
                id: args.where.id
            }
        })
    }
})