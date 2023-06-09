import siteMetadata from '@/data/siteMetadata'
import programData from '@/data/programData'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'

export default function Program() {
  return (
    <>
      <PageSEO title={`Program - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-[#AE0B11] sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Program
          </h1>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {programData.map((d) => (
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
