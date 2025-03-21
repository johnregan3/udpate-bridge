import { Head } from '@inertiajs/react';

import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { Reviews } from '@/components/Reviews'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'

export default function Home() {
  return (
    <>
      <Head>
        <title>UpdateBridge - Manage Your WordPress Site.</title>
        <meta
          name="description"
          content="By connecting your WordPress site to UpdateBridge, you can manage your site, update plugins, and more from a single dashboard."
        />
      </Head>
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  )
}
