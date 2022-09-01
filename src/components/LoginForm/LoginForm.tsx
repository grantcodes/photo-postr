import React, { useState } from 'react'
import { Button, Input, Label } from '@grantcodes/ui'

// interface LoginFormProps {
//   onSubmit: Function
//   loading?: boolean
// }

const LoginForm: React.FC<any> = ({ onSubmit, loading = false }) => {
  const [domain, setDomain] = useState('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (loading) {
      return
    }
    let completeDomain = domain
    if (!domain.startsWith('http')) {
      completeDomain = 'https://' + domain
      setDomain(completeDomain)
    }
    onSubmit(completeDomain)
    return false
  }

  return (
    <form onSubmit={handleSubmit} className='login__form'>
      <Label>
        Your Domain
        <Input
          type='url'
          placeholder='https://yoursite.com'
          autoComplete='url'
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setDomain(e.currentTarget.value)
          }
        />
      </Label>
      <Button type='submit' disabled={loading}>
        {loading ? 'Logging In...' : 'Login'}
      </Button>
    </form>
  )
}

export { LoginForm }
