import { useRouter } from "next/router"

import ShoesOverview from "@/components/sections/shoes-overview"
import AddShoe from "@/components/sections/add-shoe"

// Map Strapi sections to section components
const sectionComponents = {
  "sections.shoes-overview": ShoesOverview,
  "sections.add-shoe": AddShoe,
}

// Display a section individually
const Section = ({ sectionData, shoes, user }) => {
  // Prepare the component
  const SectionComponent = sectionComponents[sectionData.__component]

  if (!SectionComponent) {
    return null
  }

  // Display the section
  return <SectionComponent data={sectionData} shoes={shoes} user={user} />
}

const PreviewModeBanner = () => {
  const router = useRouter()
  const exitURL = `/api/exit-preview?redirect=${encodeURIComponent(
    router.asPath
  )}`

  return (
    <div className="py-4 bg-red-600 text-red-100 font-semibold uppercase tracking-wide">
      <div className="container">
        Preview mode is on.{" "}
        <a
          className="underline"
          href={`/api/exit-preview?redirect=${router.asPath}`}
        >
          Turn off
        </a>
      </div>
    </div>
  )
}

// Display the list of sections
const Sections = ({ sections, preview, shoes, user }) => {
  return (
    <div className="flex flex-col">
      {/* Show a banner if preview mode is on */}
      {preview && <PreviewModeBanner />}
      {/* Show the actual sections */}
      {sections.map((section) => (
        <Section
          shoes={shoes}
          sectionData={section}
          key={`${section.__component}${section.id}`}
          user={user}
        />
      ))}
    </div>
  )
}

export default Sections
