import React from 'react'
import { useParams } from 'react-router-dom'
import EditUserForm from '../components/usersComponents/EditUserForm'

const EditUserPage = () => {
 const params = useParams()
 return (
  <>
   <EditUserForm userId={params.id} />
  </>
 )
}

export default EditUserPage