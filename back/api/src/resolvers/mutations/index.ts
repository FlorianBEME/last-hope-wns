import { mutationField, nonNull, nullable } from "nexus";
import { CreateProjectInput, ProjectWhereUniqueInput } from "../inputs";
import { Project } from "../models/Project";


export const createBoard = mutationField("createProject", {
	type: nullable(Project),
	args: {
		input: nonNull(CreateProjectInput),
	},
	resolve: async (_root, args, ctx) => {
		return ctx.prisma.project.create({
			data: {
				...args.input,
			},
		});
	},
});

export const removeProject = mutationField("removeProject", {
    type: nullable(Project),
    args: {
        where: nonNull(ProjectWhereUniqueInput)
    },
    resolve: async (_root, args, ctx) => {
        return ctx.prisma.project.delete({
			where: args.where,
		});
    }
})
