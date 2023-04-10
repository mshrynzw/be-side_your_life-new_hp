import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Image from '@/components/Image'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { useRouter } from 'next/router'

const LayoutWrapper = ({ children }) => {
  const router = useRouter()

  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between pt-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="-mb-2 mr-3">
                  <Image
                    alt="ocean"
                    src="/static/images/logo.png"
                    width={48}
                    height={48}
                    className="h-12 w-12"
                  />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <>
                    <div className="hidden h-6 text-2xl font-semibold sm:block">
                      {siteMetadata.headerTitle}
                    </div>
                    <div className="block h-6 text-xl font-semibold sm:hidden">
                      {siteMetadata.headerTitle}
                    </div>
                  </>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) =>
                router.pathname.match(link.title.toLowerCase()) ? (
                  <span className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4">
                    {link.title}
                  </span>
                ) : (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="p-1 font-medium text-gray-900 underline dark:text-gray-100 sm:p-4"
                  >
                    {link.title}
                  </Link>
                )
              )}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
