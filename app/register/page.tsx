"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import SignUpForm from "@/components/form/signup-form"

interface Tile {
  id: number
  content: React.ReactNode
  color: string
}

export default function loginPage() {
  const [tiles, setTiles] = useState<Tile[]>([
    {
      id: 1,
      content: (
        <h2 className="text-2xl font-semibold text-white">
          Total Care.
          <br />
          Total Different.
        </h2>
      ),
      color: "bg-muted/50",
    },
    {
      id: 2,
      content: null,
      color: "bg-muted/50",
    },
    {
      id: 3,
      content: (
        <>
          <div className="flex justify-end mb-2">
            <span className="text-2xl">+</span>
          </div>
          <p className="text-xl text-white">Monitor transactions</p>
        </>
      ),
      color: "bg-red-300/90",
    },
    {
      id: 4,
      content: <div className="w-12 h-12 border-4 border-black transform rotate-45" />,
      color: "bg-[#033430]",
    },
    {
      id: 5,
      content: null,
      color: "bg-white",
    },
    {
      id: 6,
      content: (
        <>
          <div className="flex justify-end mb-2">
            <span className="text-2xl">+</span>
          </div>
          <p className="text-xl text-black">
            Own
            <br />
            your power
          </p>
        </>
      ),
      color: "bg-yellow-100/90",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setTiles((currentTiles) => {
        const newTiles = [...currentTiles]
        const randomIndex1 = Math.floor(Math.random() * newTiles.length)
        let randomIndex2 = Math.floor(Math.random() * newTiles.length)

        // Ensure we get different indices
        while (randomIndex2 === randomIndex1) {
          randomIndex2 = Math.floor(Math.random() * newTiles.length)
        }

        // Swap tiles
        const temp = newTiles[randomIndex1]
        newTiles[randomIndex1] = newTiles[randomIndex2]
        newTiles[randomIndex2] = temp

        return newTiles
      })
    }, 3000) // Swap every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black">
    <div className="grid lg:grid-cols-2 min-h-screen">
      <div
        className="relative hidden lg:block p-8"
        style={{
          backgroundImage: `url(${encodeURI("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-27%20at%2003.10.27-jcxImhqEiMaObhbtyfxk3vcoZzrlbg.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="grid grid-cols-2 gap-4 h-full max-w-xl mx-auto">
          <AnimatePresence>
            {tiles.map((tile) => (
              <motion.div
                key={tile.id}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className={`${tile.color} rounded-3xl p-6 backdrop-blur-sm flex items-center justify-center`}
              >
                {tile.content}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex items-center justify-center p-8 border-l">
        <div className="w-full max-w-md space-y-8 shadow-lg bg-muted/50 p-10">
          <div className="">
            <h2 className="text-4xl font-bold text-white">Sign Up</h2>
            <p className="mt-2 text-gray-400">Proceed to create your account</p>
          </div>
          <SignUpForm />
          <div className="text-center">
            Have an account? <Link href={'/login'} className="text-emerald-400">sign in</Link>
          </div>
        </div>
      </div>
    </div>
   </div>
  )
}

