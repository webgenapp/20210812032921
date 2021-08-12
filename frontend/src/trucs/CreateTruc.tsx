import client from '../api'
import { FormikHelpers } from 'formik'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Truc, TrucError } from '../types'
import TrucForm from './TrucForm'
import { useHistory } from 'react-router-dom'

function CreateTruc() {
  const queryClient = useQueryClient()
  const history = useHistory()
  const createTruc = useMutation<Truc, TrucError, Truc>(
    (values) => {
      return client.post('/api/v1/trucs', values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('trucs')
      },
    }
  )

  const handleSubmit = (
    values: Truc,
    { setSubmitting }: FormikHelpers<Truc>
  ) => {
    createTruc.mutate(values)
    setSubmitting?.(false)
    history.push('/trucs')
  }

  return <TrucForm onSubmit={handleSubmit} />
}

export default CreateTruc
