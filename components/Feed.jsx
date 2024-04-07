'use client'

import { useState, useEffect} from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key = {post._id}
          post = {post}
          handleClick  = {handleClick}
        />
      ))}
    </div>
  )
}

function Feed() {
  const [searchText, setSearchText ] = useState('');
  const [posts, setPosts ] = useState([]);

  const handleSearch = (e) => {
  
  }

  useEffect(() => {
    const fetchResp = async () => {
      const resp = await fetch('/api/prompt');
      const data = await resp.json();
      setPosts(data);
    }
    fetchResp()
  }, [])
  return (
    <section
      className="feed"
    >
      <form
        className="relative w-full flex-center"
      >
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={ handleSearch }
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
      data={posts} 
      handleClick={() => {}}
      />
    </section>
  )
}

export default Feed