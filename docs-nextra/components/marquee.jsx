import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export default function Marquee({ files }) {
  const [width, setWidth] = useState()

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  if (!width) return null
  return (
    <div className="absolute w-full h-full top-0 left-0 saturate-0 brightness-[1000] -z-20 opacity-5 overflow-hidden flex flex-col">
      {files.slice(0, 15).map((name) => {
        return (
          <motion.img
            src={`/img/providers/${name}`}
            key={name}
            alt={name}
            height="64"
            width="64"
            animate={{ x: width }}
            transition={{
              repeat: Infinity,
              duration: clamp(Math.random() * 200, 100, 200),
              ease: "linear",
            }}
          />
        )
      })}
    </div>
  )
}
