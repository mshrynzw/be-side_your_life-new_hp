import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'

import NewsletterForm from '@/components/NewsletterForm'
import PostIcon from '@/components/post-icons'

const MAX_DISPLAY = 3

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-[#AE0B11] sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            const hash_title =
              'vol' + title.replace('石川・ホンマ・ぶるんのBe-SIDE Your Life! vol.', '')
            const search_href =
              'https://twitter.com/hashtag/%E3%83%93%E3%83%BC%E3%82%B5%E3%82%A4?src=hashtag_click&f=live'
            const post_href = `https://twitter.com/intent/tweet?hashtags=ビーサイ,${hash_title}`

            return (
              <li key={slug} className="pb-4 pt-2">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more...
                        </Link>
                      </div>
                      <div className="pb-6 pt-4 text-sm text-gray-700 dark:text-gray-300">
                        <div className="flex flex-row justify-center space-x-8">
                          <Link href={search_href} rel="nofollow">
                            <div className="flex w-32 flex-row items-center justify-around rounded-md bg-blue-500 px-6 py-1 text-white shadow-md shadow-blue-500/50 hover:bg-blue-500/80">
                              <PostIcon kind="twitter" size="6" />
                              <div className="font-extrabold">Search</div>
                            </div>
                          </Link>
                          <Link href={post_href} rel="nofollow">
                            <div className="flex w-32 flex-row items-center justify-around rounded-md bg-blue-500 px-6 py-1 text-white shadow-md shadow-blue-500/50 hover:bg-blue-500/80">
                              <PostIcon kind="twitter" size="6" />
                              <div className="font-extrabold">Post</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/podcast"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            Podcast &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
