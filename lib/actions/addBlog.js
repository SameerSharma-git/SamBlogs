"use server"
import { dbConnect } from "@/db/dbConnect";
import PostSchema from "@/db/Schemas/postSchema";

export default async function addBlog(newBlog) {
    await dbConnect()
    try{
        let addedBlog = JSON.parse(JSON.stringify(await PostSchema.create(newBlog)))
        console.log("New Blog added successfully!", newBlog)
        return addedBlog
    } catch(error) {
        console.log("error occured whle adding new blog: ", error)
    }
}