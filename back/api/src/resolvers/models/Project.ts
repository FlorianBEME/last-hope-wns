import { objectType } from "nexus"

export const Project = objectType({
    name: "Project",
    definition(t) {
        t.id("id", { description: 'Id of the Project' })
        t.string("title")
        t.string('description')
        t.date('start_at')
        t.date('end_at')
        t.date('due_at')
        t.nullable.id('product_owner_id')
        t.int('advancement')
    }
})