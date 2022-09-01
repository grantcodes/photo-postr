import { Container } from '@grantcodes/ui'

const AppFooter: React.FC<any> = () => {
  return (
    <footer className='app-footer'>
      <Container align='wide' className='app-footer__inner'>
        <p>
          By <a href='https://grant.codes'>grant.codes</a>
        </p>
        <p>
          Part of the <a href='https://postrchild.com'>PostrChild suite</a>
        </p>
        <p>
          Source code available on{' '}
          <a href='https://github.com/grantcodes/photo-postr'>GitHub</a>
        </p>
      </Container>
    </footer>
  )
}

export { AppFooter }
