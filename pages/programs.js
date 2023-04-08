import siteMetadata from '@/data/siteMetadata'
import programsData from '@/data/programsData'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'

export default function Programs() {
  return (
    <>
      <PageSEO title={`Programs - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-[#AE0B11] sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Programs
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase your programs with a hero image (16 x 9)
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {programsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
