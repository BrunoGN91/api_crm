
import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../Components/Spinner'

import Formulario from '../Components/Formulario';

const EditarCliente = () => {

  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);

  
  const params = useParams()

  useEffect(() => {
      const fetchApi = async () => {
          setCargando(!cargando)
          try{
              const url = `${import.meta.env.VITE_API_URL}/${params.id}`
              const data = await fetch(url);
              
              const resultado = await data.json();
              console.log(resultado);
              setCliente(resultado)
          }catch(error) {
              console.log(error);
          }
          setTimeout(() => setCargando(false), 2000)
      }
      fetchApi();
  },[])

  return (
    <>
       {cargando ? <Spinner/> : (
        <>
         <h1 className='font-black text-4xl text-blue-900'>Editar cliente</h1>
         {
           cliente?.nombre ? (
             <>
              <p className='mt-3'>Utiliza este formulario para editar el cliente</p>
            <Formulario cliente={cliente}/>
            </>
           ) : <p>No existe el cliente</p>
         }
    
        </>
    )}
    </>
  )
}

export default EditarCliente