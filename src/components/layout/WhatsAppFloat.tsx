'use client'

import { useEffect, useState } from 'react'

export default function WhatsAppFloat() {
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setBounce(true)
      setTimeout(() => setBounce(false), 1000)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <a
      href="https://wa.me/1234567890?text=Hi,%20I'd%20like%20to%20get%20a%20free%20quote"
      target="_blank"
      rel="noopener noreferrer"
      className={`group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl ${
        bounce ? 'animate-bounce' : ''
      }`}
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.052 31.2l6.012-1.93A15.89 15.89 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.312 22.594c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.95.324-5.67-1.218-4.762-1.972-7.828-6.81-8.066-7.126-.228-.316-1.916-2.55-1.916-4.864 0-2.314 1.212-3.452 1.642-3.924.39-.428 1.026-.618 1.632-.618.198 0 .374.01.534.018.468.02.704.048 1.012.786.39.924 1.338 3.264 1.454 3.502.118.238.236.556.076.874-.15.326-.282.47-.52.742-.238.272-.464.48-.702.774-.218.258-.464.534-.198.99.266.45 1.182 1.948 2.538 3.156 1.742 1.552 3.208 2.032 3.666 2.256.39.192.698.16.962-.098.272-.266 1.152-1.34 1.46-1.8.3-.46.604-.38.998-.228.4.152 2.52 1.19 2.952 1.406.432.218.72.326.826.506.104.178.104 1.04-.286 2.14z" />
      </svg>
      <span className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  )
}
