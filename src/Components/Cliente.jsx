import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cliente = ({ cliente, handleDelete }) => {

  const navigate = useNavigate()

  const { nombre, empresa, telefono, notas, email, id } = cliente
  return (
    <tr className='border-b hover:bg-gray-50'>
        <td className='p-3'>{nombre}</td>
        <td className='p-3'>
          <p><span className='text-gray-800 uppercase font-bold'>Email: </span>{email}</p>
          <p><span className='text-gray-800 uppercase font-bold'>Telefono: </span>{telefono}</p>

        </td>
        <td className='p-3'>{empresa}</td>
        <td className='p-3'>
        <button 
        onClick={() => navigate(`/clientes/${id}`)}
          className='bg-yellow-500  hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs'
          type='button'>
            Ver
          </button>
          <button 
          onClick={() => navigate(`/clientes/editar/${id}`)}
          className='bg-blue-600 mt-3 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs'
          type='button'>
            Editar
          </button>
          <button 
          onClick={() => handleDelete(cliente.id)}
                    className='bg-red-600 mt-3 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs'
          type='button'>
            Eliminar
          </button>
        </td>

    </tr>
  )
}

export default Cliente