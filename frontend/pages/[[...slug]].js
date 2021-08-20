import ErrorPage from "next/error"
import { getPageData, fetchAPI, getGlobalData } from "utils/api"
import Sections from "@/components/sections"
import Seo from "@/components/elements/seo"
import { useRouter } from "next/router"
import Layout from "@/components/layout"
import { getLocalizedPaths } from "utils/localize"
import { useSession, signIn, signOut } from "next-auth/client"

// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

const DynamicPage = ({
  sections,
  metadata,
  preview,
  global,
  pageContext,
  shoes,
}) => {
  const router = useRouter()
  const [session, loading] = useSession()

  const handleSignin = (e) => {
    e.preventDefault()
    signIn()
  }
  const handleSignout = (e) => {
    e.preventDefault()
    signOut()
  }

  // Check if the required data was provided
  // if (!router.isFallback && !sections?.length) {
  //   console.log(router)
  //   console.log(sections)
  //   return <p>yo</p>
  //   // return <ErrorPage statusCode={404} />
  // }

  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className="container">Loading...</div>
  }

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />
      {/* Display content sections */}
      <div>
        {loading && <div>Loading...</div>}
        {session && (
          <>
            <div className="flex justify-between mt-4 border-b border-black">
              <p className="font-montreal font-bold uppercase text-sm">
                Sneakers . Collection . 2021
              </p>
              <div className="flex">
                <p className="font-montreal font-bold uppercase text-sm mr-4">
                  Welcome, {session.user.name ?? session.user.email}
                </p>
                <a
                  className="font-montreal font-bold uppercase text-sm"
                  href="#"
                  onClick={handleSignout}
                >
                  Sign out
                </a>
              </div>
            </div>
            <Sections
              sections={sections}
              preview={preview}
              shoes={shoes}
              user={session.user}
            />
          </>
        )}
        {!session && (
          <>
            <div className="flex justify-between mt-4 border-b border-black">
              <p className="font-montreal font-bold uppercase text-sm">
                Sneakers . Collection . 2021
              </p>
              <a
                className="font-montreal font-bold uppercase text-sm"
                href="#"
                onClick={handleSignin}
              >
                Sign in
              </a>
            </div>
            <p
              className="font-montreal font-bold uppercase text-center cursor-pointer mt-32"
              onClick={handleSignin}
            >
              Sign in to see the collection
            </p>
          </>
        )}
      </div>
    </Layout>
  )
}

export async function getStaticPaths(context) {
  // Get all pages from Strapi
  const allPages = context.locales.map(async (locale) => {
    const localePages = await fetchAPI(`/pages?_locale=${locale}`)
    return localePages
  })

  const pages = await (await Promise.all(allPages)).flat()

  const paths = pages.map((page) => {
    // Decompose the slug that was saved in Strapi
    const slugArray = !page.slug ? false : page.slug.split("/")

    return {
      params: { slug: slugArray },
      // Specify the locale to render
      locale: page.locale,
    }
  })
  return { paths, fallback: true }
}

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/shoes`)
  const shoes = await res.json()

  const { params, locale, locales, defaultLocale, preview = null } = context

  const globalLocale = await getGlobalData(locale)
  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getPageData(
    { slug: !params.slug ? [""] : params.slug },
    locale,
    preview
  )

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} }
  }

  // We have the required page data, pass it to the page component
  const { contentSections, metadata, localizations, slug } = pageData

  const pageContext = {
    locale: pageData.locale,
    locales,
    defaultLocale,
    slug,
    localizations,
  }

  const localizedPaths = getLocalizedPaths(pageContext)

  return {
    props: {
      shoes: shoes,
      preview,
      sections: contentSections,
      metadata,
      global: globalLocale,
      pageContext: {
        ...pageContext,
        localizedPaths,
      },
    },
  }
}

export default DynamicPage
