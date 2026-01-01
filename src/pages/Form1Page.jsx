import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Form1Page() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Form 1 - WPQ Certificate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Form will be implemented in Phase 4</p>
          <p className="text-green-600 mt-4">✅ Routing working!</p>
        </CardContent>
      </Card>
    </div>
  )
}