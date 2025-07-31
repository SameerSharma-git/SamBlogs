"use server"
import { dbConnect } from "@/db/dbConnect";
import User from "@/db/Schemas/userSchema";

export default async function updateUser(id, update) {
    await dbConnect()
    User.findByIdAndUpdate(id, { $set: update }, { new: true, runValidators: true })
        .then(updatedUser => {
            console.log('User Updated Successfully')
            return updatedUser
        }).catch(error => {
            console.log("An error occured while updating User!!!: ", error)
        })
}

export async function deleteUserById(id) {
    await dbConnect()
    User.findByIdAndDelete(id)
        .then(() => {
            console.log('User Deleted Successfully')
        }).catch(error => {
            console.log("An error occured while Deleting User!!!: ", error)
        })
}