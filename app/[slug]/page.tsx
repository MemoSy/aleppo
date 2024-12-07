import { Metadata } from 'next'
import MinistryProfile from './components/MinistryProfile'
import MinistryPosts from './components/MinistryPosts'

export const metadata: Metadata = {
  title: 'Ministry of Technology | Official Profile',
  description: 'Official profile page of the Ministry of Technology',
}

export default function MinistryProfilePage({ params }: { params: any }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <MinistryProfile ministry={params.slug} />
      <MinistryPosts ministry={params.slug} />
    </div>
  )
}
