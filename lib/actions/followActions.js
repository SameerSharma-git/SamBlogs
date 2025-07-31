"use server"
import updateUser from "./updateUser";
import { findUserById } from "./findUser";

async function followUser(fromUser_id, toUser_id) {
    const fromUser = await findUserById(fromUser_id)
    const toUser = await findUserById(toUser_id)

    updateUser(toUser_id, { followers: [...toUser.followers, fromUser_id] })
    updateUser(fromUser_id, { following: [...fromUser.following, toUser_id] })
}

async function unfollowUser(fromUser_id, toUser_id) {
    const fromUser = await findUserById(fromUser_id)
    const toUser = await findUserById(toUser_id)

    updateUser(toUser_id, {
        followers: [...toUser.followers].filter((id) => {
            if (id !== fromUser_id) {
                return id
            }
        })
    })
    updateUser(fromUser_id, {
        following: [...fromUser.following].filter((id) => {
            if (id !== toUser_id) {
                return id
            }
        })
    })
}

export { followUser, unfollowUser }