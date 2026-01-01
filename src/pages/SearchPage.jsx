import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SearchPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Search functionality coming soon</p>
          <p className="text-green-600 mt-4">✅ Route accessible!</p>
        </CardContent>
      </Card>
    </div>
  )
}