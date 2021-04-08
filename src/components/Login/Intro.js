import React from 'react'
import * as codeExamples from './code-examples'

const LoginIntro = () => (
  <div>
    <h3>WTF is this thing?</h3>
    <p>
      This is a <a href="https://indieweb.org/micropub">micropub</a> client for
      posting photo galleries / albums to your{' '}
      <a href="https://indieweb.org">indieweb</a> website
    </p>
    <h4>Nerdy Stuff</h4>
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
    <div dangerouslySetInnerHTML={{ __html: codeExamples.photo }} />
    <p>
      Then the gallery request is sent with the collection of photo urls as
      children:
    </p>
    <div dangerouslySetInnerHTML={{ __html: codeExamples.gallery }} />
  </div>
)

export default LoginIntro
