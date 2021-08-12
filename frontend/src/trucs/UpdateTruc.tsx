import client from '../api'
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import TrucForm from './TrucForm'
import { Truc } from '../types'
import { useQuery, useMutation, useQueryClient } from 'react-query'

function UpdateTruc() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const history = useHistory()

  const { data, isLoading } = useQuery<Truc>(['trucs', id], () =>
    client.get(`/api/v1/trucs/${id}`).then((response) => response.data)
  )

  const updateTruc = useMutation<Truc, any, Truc>(
    (values: Truc) =>
      client
        .put(`/api/v1/trucs/${id}`, values)
        .then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('trucs')
      },
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const truc = data as Truc
  return (
    <TrucForm
      truc={truc}
      onSubmit={(values, { setSubmitting }) => {
        updateTruc.mutate(values)
        setSubmitting?.(false)
        history.push('/trucs')
      }}
    />
  )
}

export default UpdateTruc
