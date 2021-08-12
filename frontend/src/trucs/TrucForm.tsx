import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { Truc } from '../types'

type CreateProps = {
  truc?: Truc
  onSubmit: (values: Truc, helpers: FormikHelpers<Truc>) => void
}

function TrucForm({ truc, onSubmit }: CreateProps) {
  const initialValues: Truc = {
    name: truc ? truc.name : '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={() => {
        return {}
      }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type='text' name='name' placeholder='Name' />

          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default TrucForm
