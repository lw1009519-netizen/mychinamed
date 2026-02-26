import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import Specialties from '@/components/sections/Specialties'
import FeaturedHospitals from '@/components/sections/FeaturedHospitals'
import PopularTreatments from '@/components/sections/PopularTreatments'
import TopDoctors from '@/components/sections/TopDoctors'
import PricingCompare from '@/components/sections/PricingCompare'
import Reviews from '@/components/sections/Reviews'
import HowItWorks from '@/components/sections/HowItWorks'
import PatientManagerCTA from '@/components/sections/PatientManagerCTA'
import QuoteForm from '@/components/sections/QuoteForm'
import { getFeaturedHospitals, getPopularTreatments } from '@/lib/supabase/queries'

export default async function HomePage({ params }: { params: { locale: string } }) {
  const [hospitals, treatments] = await Promise.all([
    getFeaturedHospitals(6),
    getPopularTreatments(8),
  ])

  return (
    <>
      <Hero />
      <TrustBar />
      <Specialties />
      <FeaturedHospitals hospitals={hospitals} locale={params.locale} />
      <PopularTreatments treatments={treatments} locale={params.locale} />
      <TopDoctors />
      <PricingCompare />
      <Reviews />
      <HowItWorks />
      <PatientManagerCTA />
      <QuoteForm />
    </>
  )
}
