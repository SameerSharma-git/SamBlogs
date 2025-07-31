"use server"
import { dbConnect } from "@/db/dbConnect";
import PostSchema from "@/db/Schemas/postSchema";


async function fetchBlogs(params) {
    await dbConnect(); // Connect to the database
    try {
        let blogList = await PostSchema.find(params)
        if (blogList) {
            return blogList
        }
        return null
    } catch (error) {
        console.log("An error occured while fetching blogs", error)
        return null
    }
}

export async function fetchBlogById(id) {
    await dbConnect(); // Connect to the database
    try{
        const blog = await PostSchema.findById(id)
        if (blog) {
            return JSON.parse(JSON.stringify(blog))
        }
        return null
    } catch (error) {
        console.log("An error occured while fetching blog by ID", error)
        return null
    }
}

export async function fetchAllBlogs() {
    await dbConnect(); // Connect to the database
    try {
        let blogList = await PostSchema.find({})
        if (blogList) {
            return JSON.parse(JSON.stringify(blogList))
        }
    } catch (error) {
        console.log("An error occured while fetching blogs", error)
        return null
    }
}

export default fetchBlogs