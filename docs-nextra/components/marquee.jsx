import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

export default function Marquee({ files }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  if (width === 0) return

  return (
    <div className="absolute w-full h-full top-0 left-0 saturate-0 brightness-[1000] -z-20 opacity-5 overflow-hidden flex flex-col marquee-wrapper">
      {files.slice(0, 20).map((name) => {
        return (
          <motion.div
            animate={{
              x: width,
            }}
            transition={{
              repeat: Infinity,
              duration: clamp(Math.random() * 200, 100, 200),
              ease: "linear",
            }}
          >
            <motion.div
              key={name}
              className="relative"
              animate={{
                x: (t) => 50 + Math.sin(t * 2 * Math.PI) * 50,
                y: (t) => 50 + Math.cos(t * 2 * Math.PI) * 50,
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.img
                src={`/img/providers/${name}`}
                alt={name}
                className="relative"
                height="64"
                width="64"
                initial={{ x: Math.random() * width, opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: Math.random(),
                  duration: 1,
                  type: "spring",
                  stiffness: 150,
                }}
              />
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
