import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IniciarSesion from './Layout/IniciarSesion'
import Layout from './Layout/Layout'
import Inicio from './Paginas/Inicio'
import LoginForm from './Paginas/LoginForm'
import NuevoCliente from './Paginas/NuevoCliente'
import EditarCliente from './Paginas/EditarCliente'
import VerCliente from './Paginas/VerCliente'







const App = () => {

  console.log(import.meta.env);
  console.log(import.meta.env.VITE_API_URL);

  return (
   <BrowserRouter>
   <Routes>
      <Route path="/" element={<IniciarSesion/>}>
        <Route index element={<LoginForm/>} />
      </Route>
      <Route path="/clientes" element={<Layout/>}>
        <Route index element={<Inicio/>} />
        <Route path="nuevo" element={<NuevoCliente/>} />
        <Route path="editar/:id" element={<EditarCliente/>} />
        <Route path=":id" element={<VerCliente/>} />

      </Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
