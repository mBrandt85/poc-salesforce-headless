import { TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import useForm from "../hooks/use-form"
import { useAuth } from "../providers"

export default function Login() {
  const { loading, login } = useAuth()
  const form = useForm({
    username: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.clearErrors()

    if (!form.values.username.length) {
      form.setError('username', 'Username is required')
      return
    }

    if (!form.values.password.length) {
      form.setError('password', 'Password is required')
      return
    }

    login(form.values.username, form.values.password)
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: 380,
      margin: '0 auto',
      padding: 32
    }}>
      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 16
        }}>
          <TextField 
            label="Email" 
            type="email"
            variant="outlined"
            disabled={loading}
            {...form.getProps('username') as any}
          />

          <TextField 
            label="Password"
            type="password" 
            variant="outlined"
            disabled={loading}
            {...form.getProps('password') as any}
          />

        <LoadingButton
          type="submit"
          size="large"
          loading={loading}
          loadingPosition="center"
          variant="contained"
        >Login</LoadingButton>
        </div>
      </form>
    </div>
  )
}