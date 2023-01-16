import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

export default function Marquee({ files }) {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }, [])

  if (width === 0) return

  return (
    <div className="absolute w-full h-full top-0 left-0 saturate-0 brightness-[1000] -z-20 opacity-5 overflow-hidden flex flex-col marquee-wrapper">
      {files.map((name) => {
        const offset = Math.random() * width
        return (
          <motion.div
            key={name}
            className="absolute"
            initial={{ x: offset, y: height * Math.random() }}
            animate={{
              x: width,
              // y: Math.cos(Math.random() * Math.PI) * 10, // TODO: circle animation
            }}
            transition={{
              repeat: Infinity,
              duration: Math.abs(clamp(Math.random() * 200, 100, 120) - (offset / width)), // TODO: reduce duration when offset is small(er)
              ease: "linear",
            }}
          >
            <motion.img
              src={`/img/providers/${name}`}
              alt={name}
              className="relative"
              initial={{ opacity: 0, scale: 0.5 }}
              height="64"
              width="64"
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: Math.random() * 10,
                duration: 1,
                type: "spring",
                stiffness: 150,
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
