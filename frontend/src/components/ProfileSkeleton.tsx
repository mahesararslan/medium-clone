"use client"

import { motion } from "framer-motion"
import { Skeleton } from "../components/ui/skeleton"
import { Card, CardContent } from "../components/ui/card"

export default function ProfileSkeleton() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Header Skeleton */}
      <motion.div className="max-w-2xl mx-auto text-center mb-16" variants={itemVariants}>
        <Skeleton className="w-32 h-32 rounded-full mx-auto mb-6" />
        <Skeleton className="h-10 w-48 mx-auto mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-64 mx-auto" />
          <div className="flex items-center justify-center gap-6">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <Skeleton className="h-10 w-32 rounded-full mx-auto mt-6" />
      </motion.div>

      {/* Blog Posts Skeleton */}
      <motion.div variants={itemVariants}>
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="space-y-6">
          {[1, 2, 3].map((index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

