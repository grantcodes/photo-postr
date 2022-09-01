import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
// import './styles/base.css'
import { App } from './components/App'
import Store from './store'
import registerServiceWorker from './registerServiceWorker'
import { Provider as ThemeProvider } from '@grantcodes/ui'
// import '@grantcodes/styleguide/assets/fonts/greycliff.css'

console.log(ThemeProvider)

const StoreInstance = Store()

const AppWrapper = () => (
  <Provider store={StoreInstance}>
    <ThemeProvider theme="default">
      <App />
    </ThemeProvider>
  </Provider>
)

ReactDOM.render(<AppWrapper />, document.getElementById('root'))

registerServiceWorker()
