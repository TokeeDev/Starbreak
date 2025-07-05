"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const questions = [
  { id: "name", label: "What's your name?", type: "text", placeholder: "John Doe" },
  { id: "email", label: "And your email?", type: "email", placeholder: "john.doe@example.com" },
  { id: "company", label: "What's your company's name?", type: "text", placeholder: "Acme Inc." },
  { id: "service", label: "What service are you interested in?", type: "textarea", placeholder: "e.g., Web Development, UI/UX Design..." },
  { id: "budget", label: "What's your estimated budget?", type: "text", placeholder: "$10,000" },
]

interface ConsultationFormProps {
  isVisible: boolean
  onClose: () => void
  calendlyUrl: string
}

export function ConsultationForm({ isVisible, onClose, calendlyUrl }: ConsultationFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAnswers(prev => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await fetch('/api/save-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      })
    } catch (error) {
      console.error("Failed to submit form:", error)
    } finally {
      setIsSubmitting(false)
      window.open(calendlyUrl, '_blank')
      onClose()
    }
  }
  
  const currentQuestion = questions[currentStep]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-black/50 border border-white/10 rounded-2xl w-full max-w-2xl p-8 text-white relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep < questions.length ? (
                  <div>
                    <label htmlFor={currentQuestion.id} className="text-2xl md:text-3xl font-bold mb-8 block text-center">
                      {currentStep + 1}. {currentQuestion.label}
                    </label>
                    {currentQuestion.type === 'textarea' ? (
                      <Textarea
                        id={currentQuestion.id}
                        name={currentQuestion.id}
                        placeholder={currentQuestion.placeholder}
                        onChange={handleInputChange}
                        className="bg-transparent border-0 border-b-2 border-white/30 text-xl text-center rounded-none focus:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 transition-all duration-300"
                      />
                    ) : (
                      <Input
                        id={currentQuestion.id}
                        name={currentQuestion.id}
                        type={currentQuestion.type}
                        placeholder={currentQuestion.placeholder}
                        onChange={handleInputChange}
                        className="bg-transparent border-0 border-b-2 border-white/30 text-xl text-center rounded-none focus:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 transition-all duration-300"
                      />
                    )}
                    <div className="flex justify-center mt-8">
                      <Button onClick={handleNextStep} className="bg-white text-black hover:bg-white/90 font-bold">
                        OK <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Thanks for the info!</h2>
                    <p className="text-lg text-white/80 mb-8">Let's get you on the schedule. Click below to find a time.</p>
                    <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-6">
                      {isSubmitting ? "Saving..." : "Go to Calendly"}
                    </Button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 text-center">
              <button
                onClick={() => window.open(calendlyUrl, '_blank')}
                className="text-white/60 hover:text-white transition text-sm underline"
              >
                Or, skip and schedule directly
              </button>
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 