import React from 'react'
import { useParams } from 'react-router-dom'
import client from '../api'
import { useQuery } from 'react-query'
import { Truc } from '../types'

function DetailTruc() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery<Truc>(['trucs', id], () =>
    client.get(`/api/v1/trucs/${id}`).then((response) => response.data)
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const truc = data as Truc

  return (
    <div>
      <label>{truc.name}</label>
      <br />
    </div>
  )
}

export default DetailTruc
