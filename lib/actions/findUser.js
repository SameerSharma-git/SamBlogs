"use server"
import { dbConnect } from "@/db/dbConnect";
import User from "@/db/Schemas/userSchema";

async function findUser(params) {
  try {
    await dbConnect(); // Connect to the database
    let foundUser = JSON.parse(JSON.stringify(await User.findOne(params)))
    if (foundUser) {
      return foundUser
    }

    return null
  } catch (error) {
    console.error('Error occurred while fetching user from the database:', error);
  }
}

async function findUserById(id) {
  try {
    await dbConnect(); // Connect to the database
    let foundUser = JSON.parse(JSON.stringify(await User.findById(id)))
    if (foundUser) {
      return JSON.parse(JSON.stringify(foundUser))
    }

    return null
  } catch (error) {
    console.error('Error occurred while fetching user from the database:', error);
  }
}

async function findAllUsers() {
  try {
    await dbConnect(); // Connect to the database
    const allUsers = await User.find({})

    return JSON.parse(JSON.stringify(allUsers))
  } catch (error) {
    console.error('Error occurred while fetching all users from the database:', error);
  }
}

export { findUser, findUserById, findAllUsers };