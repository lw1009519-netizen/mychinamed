'use client'

import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'

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
      href="https://wa.me/8613800000000?text=Hi,%20I'd%20like%20to%20get%20a%20free%20quote"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl ${
        bounce ? 'animate-bounce' : ''
      }`}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
