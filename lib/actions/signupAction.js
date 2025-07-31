import { dbConnect } from "@/db/dbConnect";
import User from "@/db/Schemas/userSchema";

async function addUser({name, email, password, createdAt, updatedAt}) {
  try {
    await dbConnect(); // Connect to the database
    let newUser = new User({name, email, password, createdAt, updatedAt, following:[], followers:[]}) 
    await newUser.save()
    console.log('User added', newUser)
    
    return newUser
  } catch (error) {
    console.error('Error occurred while adding user to the database:', error);
  }
}

export {addUser};