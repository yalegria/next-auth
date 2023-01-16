import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

export default function Marquee({ files }) {
  const [{ width, height }, setSize] = useState({ height: 0, width: 0 })
  useEffect(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  if (width === 0) return

  return (
    <div className="absolute w-full h-full top-0 left-0 dark:opacity-5 opacity-20 saturate-0 brightness-75 dark:brightness-[1000] -z-20 overflow-hidden flex flex-col marquee-wrapper">
      {files.map((name) => (
        <MarqueeItem key={name} name={name} width={width} height={height} />
      ))}
    </div>
  )
}

function MarqueeItem({ name, width, height }) {
  const [y] = useState(height * Math.random())
  const [reset, setReset] = useState(false)
  const [duration] = useState(clamp(Math.random() * 25, 20, 25))
  useEffect(() => {
    const timeout =
      setTimeout(() => {
        setReset(true)
      }, (1000 * (width - offset)) / duration) - 2000
    return () => clearTimeout(timeout)
  }, [duration, width])
  const offset = Math.random() * width
  return (
    <motion.span
      key={name + reset}
      className="absolute flex items-center justify-center"
      initial={{ x: reset ? 0 : offset, y }}
      animate={{ x: width }}
      transition={{
        repeat: Infinity,
        duration: reset ? duration : (width - offset) / duration,
        ease: "linear",
      }}
    >
      <motion.img
        src={`/img/providers/${name}`}
        alt={name}
        className="relative w-12 drop-shadow-xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: reset ? 0 : Math.random() * 5,
          duration: 1,
          type: "spring",

          stiffness: 150,
        }}
      />
    </motion.span>
  )
}
