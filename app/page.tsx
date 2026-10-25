import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Work } from '@/components/work'
import { Contact, Education, Experience, Footer, Profile, Recognition, Skills } from '@/components/sections'

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Profile />
        <Work />
        <Experience />
        <Education />
        <Skills />
        <Recognition />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
