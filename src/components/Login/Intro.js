import { CodePreview } from '@grantcodes/ui'
import { gallery as galleryCode, photo as photoCode } from './code-examples'

const LoginIntro = () => (
  <div>
    <h2>WTF is this thing?</h2>
    <p>
      This is a <a href="https://indieweb.org/micropub">micropub</a> client for
      posting photo galleries / albums to your{' '}
      <a href="https://indieweb.org">indieweb</a> website
    </p>
    <h3>Nerdy Stuff</h3>
    <p>For this to work on your site you need to support a few things:</p>
    <ul>
      <li>A micropub endpoint that supports json posts</li>
      <li>A media endpoint</li>
      <li>
        <a href="https://indieweb.org/collection">Collection</a> support
      </li>
      <li>Visibility=unlisted support</li>
    </ul>
    <p>Each photo is sent individually:</p>
    <CodePreview language="json">{photoCode}</CodePreview>
    <p>
      Then the gallery request is sent with the collection of photo urls as
      children:
    </p>
    <CodePreview language="json">{galleryCode}</CodePreview>
  </div>
)

export default LoginIntro
