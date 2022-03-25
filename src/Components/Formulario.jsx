import React from 'react'
import {Formik, Form, Field, ErrorMessage}from 'formik'
import * as Yup from 'yup'
import { useNavigate} from 'react-router-dom'
import Alerta from '../Components/Alerta'




const Formulario = ({cliente}) => {


    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
        .required('El Nombre del cliente es obligatorio')
        .min(3, "El nombre es muy corto")
        .max(20, "El nombre es muy largo"),

        empresa: Yup.string()
            .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
            .required("El email es obligatorio")
            
            .email("Tiene que ser un email valido"),
        telefono: Yup.number()
            .integer("Numero no valido")
            .positive("Numero no valido")
            .typeError("El numero no es válido"),
        notas: ''
    })


const handleValidations = async (values) => {

   try {
    if(cliente.id) {

        const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;
        const respuestaId = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(respuestaId);
        const resultado = await respuestaId.json();
        console.log(resultado);

    } else {
        const url = import.meta.env.VITE_API_URL;
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(respuesta);
        const resultado = await respuesta.json();
        console.log(resultado);
    }
   } catch(error) {
       console.log("error");
   }
}


  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? `Editar Cliente ${cliente.nombre}` : 'Agregar Cliente'}</h1>

    <Formik
    initialValues={{
        nombre: cliente?.nombre ?? '',
        empresa: cliente?.empresa ?? '',
        email: cliente?.email ?? '',
        telefono: cliente?.telefono ?? '',
        notas: cliente?.notas ?? ''
    }}
    enableReinitialize={true}
    onSubmit={(values, {resetForm}) => {
    handleValidations(values)
    resetForm()
    navigate("/clientes")
}
}
    validationSchema={nuevoClienteSchema}
    >
        {({errors, touched}) => {
            
       return  (
        <Form className='mt-10'>
            <div className='mb-4'>
                <label 
                className='text-gray-800 '
                htmlFor="nombre">Nombre: </label>
            <Field 
            id="nombre"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Nombre del cliente"
            name="nombre"
            />

            {errors.nombre && touched.nombre ? (
               <Alerta>{errors.nombre}</Alerta>
            ) : null }
            </div>
            <div className='mb-4'>
                <label 
                className='text-gray-800 '
                htmlFor="empresa">Empresa: </label>
            <Field 
            id="empresa"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Empresa del cliente"
            name="empresa"
            />
            
            {errors.empresa && touched.empresa ? (
               <Alerta>{errors.empresa}</Alerta>
            ) : null }
            </div>
            <div className='mb-4'>
                <label 
                className='text-gray-800 '
                htmlFor="email">E-mail:</label>
            <Field 
            id="email"
            type="email"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Email del cliente"
            name="email"
            />
            {errors.email && touched.email ? (
               <Alerta>{errors.email}</Alerta>
            ) : null }
            </div>
            <div className='mb-4'>
                <label 
                className='text-gray-800 '
                htmlFor="telefono">Telefono:</label>
            <Field 
            id="telefono"
            type="tel"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Telefono del cliente"
            name="telefono"
            />
             {errors.telefono && touched.telefono ? (
               <Alerta>{errors.telefono}</Alerta>
            ) : null }
            </div>
            <div className='mb-4'>
                <label 
                className='text-gray-800 '
                htmlFor="notas">Notas</label>
            <Field 
            as="textarea"
            id="notas"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50 h-40"
            placeholder="Notas del cliente"
            name="notas"
            />
            </div>
            <input type="submit" value={cliente?.nombre ? 'Guardar Cambios' : 'Agregar Cliente'} className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'/>
        </Form>

            )}}
    </Formik>
    </div>
  )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario