// pages/profile/[userId].jsx

import UserProfilePage from '@/components/UserProfilePage';
import { decodeJWT } from '@/lib/actions/jwt_token';
import { findUserById } from '@/lib/actions/findUser';
import { fetchBlogById } from '@/lib/actions/fetchBlogs';

// Mock user data
export default async function UserProfileRoutePage({ params }) {
  const resolvedParams = await params;
  const { userID } = resolvedParams;

  const fromUserPayload = await decodeJWT()
  let userData;
  const mongoUser = JSON.parse(JSON.stringify(await findUserById(userID)))
  let userBlogs = [];
  for (let i = 0; i < mongoUser.posts.length; i++) {
    const postId = mongoUser.posts[i];
    userBlogs.push(await fetchBlogById(postId))
  }

  userData = JSON.parse(JSON.stringify({ ...mongoUser, posts: userBlogs }))

  const user = userData;

  return <UserProfilePage user={user} fromUserPayload={fromUserPayload} />;
}