import { Container } from '@grantcodes/ui'

const AppHeader: React.FC<any> = () => {
  return (
    <header className='app-header'>
      <Container align='wide'>
        <h1>
          <a href='/'>
            <img src='https://postrchild.com/static/img/postrchild-icon.svg' />
            PhotoPostr
          </a>
        </h1>
      </Container>
    </header>
  )
}

export { AppHeader }
