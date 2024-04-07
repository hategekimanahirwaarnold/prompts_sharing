"use client"

import { useState, useEffect, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

function MyProfile() {
    const { data: session } = useSession();
    const [ posts, setPosts ] = useState([]);
    const router = useRouter();


    useEffect(() => {
        const fetchResp = async () => {
          const resp = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await resp.json();
          setPosts(data);
        }
        
        if (session?.user.id) fetchResp()
      }, [])
    const handleEdit = async (post) => {
      router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {
      const hasConfirmed = confirm("Are you sure you want to delete this item?");
      if (hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: 'DELETE'
          });

          const filteredPosts = posts.filter((p) => p._id !== post._id)
          setPosts(filteredPosts)
        } catch (error) {
          console.log(error);
        }
      }
    }
  return (
    <Suspense>
      <Profile
        name="My"
        description="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Suspense>
  )
}

export default MyProfile
