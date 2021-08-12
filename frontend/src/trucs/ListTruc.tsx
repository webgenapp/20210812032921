import React from 'react'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import client from '../api'
import { Truc } from '../types'
import { useHistory } from 'react-router-dom'

type TrucPreviewProps = {
  truc: Truc
  handleEdit: (truc: Truc) => void
  handleDelete: (truc: Truc) => void
  handleDetail: (truc: Truc) => void
}

function TrucPreview({
  truc,
  handleEdit,
  handleDelete,
  handleDetail,
}: TrucPreviewProps) {
  return (
    <>
      {truc.name}
      <br />
      <button type='button' onClick={() => handleDetail(truc)}>
        detail
      </button>
      <button type='button' onClick={() => handleEdit(truc)}>
        edit
      </button>
      <button type='button' onClick={() => handleDelete(truc)}>
        delete
      </button>
    </>
  )
}

function ListTrucs() {
  const history = useHistory()
  const queryClient = useQueryClient() // eslint-disable-line no-unused-vars
  const trucsQuery = useQuery<Truc[]>('trucs', () => {
    return client
      .get('/api/v1/trucs')
      .then((response) => response.data) as Promise<Truc[]>
  })

  const deleteTruc = useMutation<any, any, Partial<Truc>>(
    ({ id }) => {
      return client.delete(`/api/v1/trucs/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('trucs')
      },
    }
  )

  const handleEdit = ({ id }: Truc) => {
    history.push(`/trucs/update/${id}`)
  }

  const handleDelete = ({ id }: Truc) => {
    deleteTruc.mutate({ id })
  }

  const handleDetail = ({ id }: Truc) => {
    history.push(`/trucs/detail/${id}`)
  }

  return (
    <>
      <p>{trucsQuery.data?.length} trucs</p>
      <ul>
        {trucsQuery.data?.map((truc) => (
          <li key={truc.id}>
            <TrucPreview
              truc={truc}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDetail={handleDetail}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListTrucs
