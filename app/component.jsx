'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'

const classifyReview = async (review) => {
  // In a real scenario, this would be an API call to your ML model
  await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API delay
  return Math.random() < 0.5 // Randomly classify as fake or not for demonstration
}

export default function Component() {
  const [review, setReview] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      const isFake = await classifyReview(review)
      setResult(isFake ? 'This review appears to be fake.' : 'This review appears to be genuine.')
    } catch (error) {
      setResult('An error occurred while classifying the review.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Review Classifier</CardTitle>
        <CardDescription>Enter a review to check if it's fake or genuine.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Textarea
            placeholder="Enter your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            className="w-full"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <Button type="submit" className="w-full" disabled={isLoading || review.trim() === ''}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Classifying...
              </>
            ) : (
              'Classify Review'
            )}
          </Button>
          {result && (
            <div className={`text-center font-semibold ${result.includes('genuine') ? 'text-green-600' : 'text-red-600'}`}>
              {result}
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}