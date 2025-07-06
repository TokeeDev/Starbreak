"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { getCalApi } from "@calcom/embed-react"

interface CalModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CalModal = ({ isOpen, onClose }: CalModalProps) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      initializeCal()
    }
  }, [isOpen])

  const initializeCal = async () => {
    try {
      const cal = await getCalApi()
      setIsLoading(false)

      // Listen for successful booking Come back to add confetti
      

      // Configure inline embed
      cal("ui", {
        theme: "light",
        styles: {
          branding: {
            brandColor: "#000000"
          }
        },
        hideEventTypeDetails: false,
        layout: "month_view"
      })

    } catch (error) {
      console.error("Error initializing Cal.com:", error)
      setIsLoading(false)
    }
  }

  const triggerConfetti = () => {
    console.log("🎉 CONFETTI TIME! Meeting scheduled successfully!")
    // Add your confetti library here
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(6px)",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="relative w-full max-w-4xl mx-auto rounded-2xl p-6 bg-white"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
              onClick={onClose}
              aria-label="Close"
              type="button"
            >
              <X size={24} />
            </button>

            <div className="w-full h-[600px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-lg">Loading Cal.com...</div>
                </div>
              ) : (
                <div 
                  data-cal-link="christian-fztuyy/30min"
                  data-cal-config='{"layout":"month_view","theme":"light"}'
                  className="h-full"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
