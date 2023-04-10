import Mail from './mail.svg'
import Github from './github.svg'
import Facebook from './facebook.svg'
import Youtube from './youtube.svg'
import Linkedin from './linkedin.svg'
import Twitter from './twitter.svg'

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
}

const PostIcon = ({ kind, size = 8 }) => {
  const SocialSvg = components[kind]

  return (
    <div className="text-sm text-gray-500 transition hover:text-gray-600">
      <span className="sr-only">{kind}</span>
      <SocialSvg className={`fill-current text-white dark:text-gray-200 h-${size} w-${size}`} />
    </div>
  )
}

export default PostIcon
