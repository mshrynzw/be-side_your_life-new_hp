/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import AudioPlayer from '@/components/AudioPlayer'

const CustomLink = ({ href, ...rest }) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...rest} />
      </Link>
    )
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  if (href.endsWith('.mp3')) {
    return (
      <div className="flex justify-center">
        <AudioPlayer href={href} />
      </div>
    )
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
}

export default CustomLink
