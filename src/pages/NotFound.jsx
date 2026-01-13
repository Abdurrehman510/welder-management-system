import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, AlertTriangle, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
      {/* Decorative blurred background shapes */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10"
      >
        <Card className="max-w-lg w-full rounded-3xl shadow-2xl border border-gray-100 bg-white/80 backdrop-blur">
          <CardContent className="p-10 text-center space-y-8">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
              className="flex justify-center"
            >
              <div className="h-20 w-20 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                <AlertTriangle size={36} />
              </div>
            </motion.div>

            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                404
              </h1>
              <p className="text-xl font-semibold text-gray-800">Page Not Found</p>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-sm mx-auto">
              The page you’re trying to reach doesn’t exist, may have been removed,
              or the URL might be incorrect. Let’s get you back on track.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                variant="default"
                onClick={() => navigate('/')}
                className="rounded-xl px-6 py-2 text-sm font-medium shadow-md flex items-center gap-2"
              >
                <Home size={16} />
                Go to Home
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="rounded-xl px-6 py-2 text-sm font-medium flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Go Back
              </Button>
            </div>

            {/* Footer hint */}
            <p className="text-xs text-gray-400 pt-6">
              If you believe this is a mistake, please contact support.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
