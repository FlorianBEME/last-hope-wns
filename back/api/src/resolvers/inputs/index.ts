import { inputObjectType } from "nexus"

export const ProjectWhereUniqueInput = inputObjectType({
    name: "ProjectWhereUniqueInput", 
    definition(t) {
        t.nonNull.id("id")
    }
})

export const CreateProjectInput = inputObjectType({
	name: "CreateProjectInput",
	definition(t) {
        t.id("id")
        t.string("title")
        t.string('description')
        t.date('start_at')
        t.date('end_at')
        t.date('due_at')
        t.nullable.id('product_owner_id')
        t.int('advancement')
	},
});