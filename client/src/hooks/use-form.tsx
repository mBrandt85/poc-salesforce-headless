import { InputProps } from '@mui/material'
import { useState } from 'react'

type SetValue<T> = (path: keyof T, value: unknown) => void
type SetError<T> = (path: keyof T, value: unknown) => void
type GetProps<T> = (path: keyof T) => {
  value: T[keyof T]
  error: boolean
  helperText: T[keyof T]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

interface UseForm<T> {
  values: T
  errors: T
  setValue: SetValue<T>
  setError: SetError<T>
  clearErrors: () => void
  getProps: GetProps<T>
}

export default function useForm<T>(_values: T): UseForm<T> {
  const [values, setValues] = useState(_values)
  const [errors, setErrors] = useState({} as T)

  const setValue: SetValue<T> = (path, value) => setValues(
    current => ({ ...current, [path]: value })
  )

  const setError: SetError<T> = (path, value) => setErrors(
    current => ({ ...current, [path]: value })
  )

  const clearErrors = () => setErrors({} as T)

  const getProps: GetProps<T> = path => ({
    value: values[path],
    error: !!errors[path],
    helperText: errors[path],
    onChange: e => setValue(path, e.target.value)
  })
  
  return {
    values,
    errors,
    setValue,
    setError,
    clearErrors,
    getProps
  }
}