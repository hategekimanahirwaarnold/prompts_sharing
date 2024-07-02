'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'


function Nav() {
  const { data : session } = useSession()
  const [ providers, setProviders ] = useState(null);
  const [ toggleDropDown, setToggleDropDown ] = useState(false);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response)
    }
    setProvider()
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="promptopia logo"
          width={30}
          height={30}
          className="object-contain"
         /> 
      </Link>
      {/* Desktop navigation */}
      <div className="flex max-sm:hidden">
        {session?.user ? 
          (
            <div className="flex gap-3 mx-md:gap-5">
              <Link href="/create-prompt" className="black_btn">
                Create Post
              </Link>
              <button type="button" onClick={signOut}
                className="outline_btn"
              >
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  src = {session?.user ? session?.user.image : "/assets/images/logo.svg"}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                />
              </Link>
            </div>
          ) : 
            <>
              {providers && Object.values(providers).map(prov => (
                <button
                type="button"
                key={providers.id}
                onClick={() => signIn(prov.id)}
                className="black_btn"
                >
                    Sign In
                </button>
              ))}
            </>
        }
      </div>
      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user && <div className="flex">
          <Image
            src = {session?.user ? session?.user.image : "/assets/images/logo.svg"}
             width={37}
             height={37}
             className="rounded-full"
             alt="profile"
             onClick={() => {setToggleDropDown((prev) => !prev) }}
          />
          {toggleDropDown && 
             <div className="dropdown">
              <Link 
                href="/profile"
                className="dropdown_link"  
                onClick={() => setToggleDropDown(false)}
              >
                My profile
              </Link>
              <Link 
                href="/create_prompt"
                className="dropdown_link"  
                onClick={() => setToggleDropDown(false)}
              >
                Create Prompt
              </Link>
              <button
                 type="button"
                 onClick={() => {
                  setToggleDropDown(false);
                  signOut;
                 }}
                 className="mt-5 w-full black_btn"
              >
                  Sign Out  
              </button>
             </div>
          }
        </div> }
        {!session?.user && providers && Object.values(providers).map(prov => (
                <button
                type="button"
                key={providers.name}
                onClick={() => signIn(prov.id)}
                className="black_btn"
                >
                    Sign In
                </button>
              ))}

      </div>
    </nav>
  )
}

export default Nav