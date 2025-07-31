"use server"

import { dbConnect } from "@/db/dbConnect"
import PostSchema from "@/db/Schemas/postSchema"

export default async function deleteBlogById(id) {
    await dbConnect()
    try{
        await PostSchema.findByIdAndDelete(id)
    } catch(error) {
        console.log("Error occured while deleting blog", error)
    }
}