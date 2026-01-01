import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Welder Management System</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Form 1</CardTitle>
            <CardDescription>WPQ Certificate</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Open Form 1</Button>
          </CardContent>
        </Card>

        <Card className="opacity-50">
          <CardHeader>
            <CardTitle>Form 2</CardTitle>
            <CardDescription>Coming Soon</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled>Open Form 2</Button>
          </CardContent>
        </Card>

        <Card className="opacity-50">
          <CardHeader>
            <CardTitle>Form 3</CardTitle>
            <CardDescription>Coming Soon</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled>Open Form 3</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="opacity-50">
          <CardHeader>
            <CardTitle>Form 4</CardTitle>
            <CardDescription>Coming Soon</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled>Open Form 4</Button>
          </CardContent>
        </Card>

        <Card className="opacity-50">
          <CardHeader>
            <CardTitle>Form 5</CardTitle>
            <CardDescription>Coming Soon</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled>Open Form 5</Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded">
        <p className="text-green-800 text-center">✅ Phase 1 Complete: Routing & UI Working!</p>
      </div>
    </div>
  )
}