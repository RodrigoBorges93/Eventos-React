import React from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';
import { useSelector, useDispatch } from 'react-redux';

function NavBar(){

  const dispatch = useDispatch()

  return (


  <nav className="navbar navbar-expand-lg">
  <i class="far fa-smile-wink text-white fa-2x"></i>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Alterna navegação">
    <i class="fas fa-bars text-white"></i>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item ml-2">
        <Link to="/" className="nav-link" >Home</Link></li>
    {

      useSelector( state => state.usuarioLogado) > 0 ?

      <>

      <li className="nav-item">
      <Link to="/eventos/meus" className="nav-link" >Meus eventos</Link></li>
    <li className="nav-item">
      <Link to="/cadastrar-evento" className="nav-link" >Publicar eventos</Link></li>

      <li className="nav-item"><Link className="nav-link"> Bem vindo, {useSelector( state => state.usuarioEmail)}!</Link></li>

        <li className="nav-item">
          <Link className="nav-link" onClick = {() => dispatch({type: 'LOG_OUT'})} >Logout</Link></li>

      </>
      :
        <>

        <li className="nav-item">
          <Link to="/cadastro" className="nav-link" >Cadastrar</Link></li>
        <li className="nav-item">
          <Link to="/login" className="nav-link" >Login</Link></li>

        </>


    }
    </ul>

  </div>
</nav>
  )

}

export default NavBar;
