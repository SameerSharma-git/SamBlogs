"use client"
import { followUser, unfollowUser } from '@/lib/actions/followActions'
import { findUserById } from '@/lib/actions/findUser'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const ButtonDiv = ({ fromUserID, toUserID, setTitle, handleOpenModal }) => {
    const router = useRouter()

    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [IsFollowing, setIsFollowing] = useState(false)

    useEffect(() => { fromUserID ? setIsLoggedIn(true) : setIsLoggedIn(false) }, [])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fromUser = await findUserById(fromUserID);
                if (fromUser?.following?.includes(toUserID)) {
                    setIsFollowing(true);
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };
        if (fromUserID && toUserID) {
            fetchUser();
        }
    }, [IsFollowing])

    const handleClick = () => {
        if (!isLoggedIn) {
            setTitle("Log in to follow!")
            handleOpenModal()
            return
        }
        if (fromUserID === toUserID){
            setTitle("You Can't Follow Yourself!")
            handleOpenModal()
            return
        } 

        if (IsFollowing) {
            unfollowUser(fromUserID, toUserID).then(() => {
                setIsFollowing(false);
                router.refresh()
            })
        }
        else {
            followUser(fromUserID, toUserID).then(() => {
                setIsFollowing(true);
                router.refresh()
            })
        }
    }

    return (
            <div className="mt-8 flex justify-center md:justify-start gap-4">
                <button onClick={handleClick} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                    {IsFollowing ? "Unfollow" : "Follow"}
                </button>
                <button onClick={() => { setTitle("Feature coming soon!"); handleOpenModal() }} className="px-6 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition duration-300 transform hover:scale-105">
                    Message
                </button>
            </div>
    )
}

export default ButtonDiv