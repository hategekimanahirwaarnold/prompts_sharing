"use client"
import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

function PromptCard({ post, handleTagClick, handleEdig, handleDelete }) {
  return (
    <div>
      <Image
         src={post.creator.image}
         alt="user_image"
         width={40}
         height={40}
         className = "rounded-full object-contain"
      />
      <div className="flex flex-col">
        <h3 className="font-satoshi font-semibold text-gray-900">
          {post.creator.username}
        </h3>
      </div>
    </div>
  )
}

export default PromptCard