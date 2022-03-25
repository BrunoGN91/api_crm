
import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../Components/Spinner'

const VerCliente = () => {

    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(false);

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

    const params = useParams()

  return (    
      <>
       {cargando ? <Spinner/> : Object.keys(cliente).length === 0 ? <p>No hay Resultados</p> : (

    <div>
      
       <>
        <h1 className='font-black text-4xl text-blue-900'>Ver cliente: {cliente.nombre}</h1>
        <p className='mt-3 mb-10'>Ver información del cliente</p>
        
       <p className='text-xl text-gray-500'>
           <span className='text-gray-800 font-bold uppercase'>Cliente: </span>
           {cliente.nombre}</p>
           <p className='text-xl text-gray-500'>
           <span className='text-gray-800 font-bold uppercase'>Email: </span>
           {cliente.email}</p>
          {cliente.telefono && (
               <p className='text-xl text-gray-500'>
               <span className='text-gray-800 font-bold uppercase'>Telefono: </span>
               {cliente.telefono}</p>
          )}
           <p className='text-xl text-gray-500'>
           <span className='text-gray-800 font-bold uppercase'>Empresa: </span>
           {cliente.empresa}</p>
           {cliente.notas && (
               <p className='text-xl text-gray-500'>
               <span className='text-gray-800 font-bold uppercase'>Notas: </span>
               {cliente.notas}</p>
           )}
           </>
        
    </div>

    )}
    </>
  )
}

export default VerCliente