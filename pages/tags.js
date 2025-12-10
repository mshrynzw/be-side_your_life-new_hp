import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'

export async function getStaticProps() {
  const tags = await getAllTags('blog')

  return { props: { tags } }
}

export default function Tags({ tags }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <div className="bg-background-blur my-6 rounded-lg bg-white/10 p-12 backdrop-blur-md dark:bg-gray-900/50">
      <PageSEO title={`Tag - ${siteMetadata.author}`} description="Things I blog about" />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-[#AE0B11] sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Tag
          </h1>
        </div>
        <div className="container">
          <div className="m-4 flex flex-wrap">
            {Object.keys(tags).length === 0 && 'No tags found.'}
            {sortedTags.map((t) => {
              return (
                <div key={t} className="mb-2 mr-5 mt-2">
                  <Tag text={t} />
                  <Link
                    href={`/tags/${kebabCase(t)}`}
                    className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                  >
                    {` (${tags[t]})`}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
