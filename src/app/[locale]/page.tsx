import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import Specialties from '@/components/sections/Specialties'
import TopDoctors from '@/components/sections/TopDoctors'
import PricingCompare from '@/components/sections/PricingCompare'
import Reviews from '@/components/sections/Reviews'
import HowItWorks from '@/components/sections/HowItWorks'
import PatientManagerCTA from '@/components/sections/PatientManagerCTA'
import QuoteForm from '@/components/sections/QuoteForm'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Specialties />
      <TopDoctors />
      <PricingCompare />
      <Reviews />
      <HowItWorks />
      <PatientManagerCTA />
      <QuoteForm />
    </>
  )
}
