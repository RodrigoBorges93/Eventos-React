import React, { useState } from 'react';
import './login.css';
import firebase from '../../config/firebase';
import 'firebase/auth';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../../components/navbar';
import { useSelector, useDispatch } from 'react-redux';

function Login (){

  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();

  const dispatch = useDispatch();

  function logar(){

    firebase.auth().signInWithEmailAndPassword(email, senha)

    .then(resultado => {
          setMsgTipo('sucesso');
          setTimeout(() => {dispatch({type: 'LOG_IN', usuarioEmail: email})}, 1000)
    }

    ).catch(erro => {
          setMsgTipo('erro');
    });
  }


  return(
    <>
    {
       useSelector( state => state.usuarioLogado) === 0 ?
       <NavBar /> : null
    }
  <div className="login-content d-flex align-items-center">

    {
      useSelector( state => state.usuarioLogado) > 0 ? <Redirect to='/'/> : null
    }

  <form className="form-signin mx-auto">
  <div className="text-center mb-4">
  <i class="far fa-smile-wink text-white fa-5x my-2"></i>
    <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold">Login</h1>
  </div>

    <input onChange={(e) => setEmail(e.target.value) } id="inputEmail" className="form-control my-2" placeholder="Email" required="" autofocus="" type="email"/>

    <input onChange={(e) => setSenha(e.target.value) }  id="inputPassword" className="form-control my-2" placeholder="Password" required="" type="password"/>

    <button onClick={logar} className="btn btn-lg btn-login btn-block" type="button">Sign in</button>


  <div className="msg-login text-white text-center my-5">


  {
    msgTipo === 'sucesso' &&
    <span><strong>WoW!</strong> Você está conectado! &#128526;</span>
    }


  {
    msgTipo === 'erro' &&
  <span><strong>Ops!</strong> Verifique se a senha ou o usuário estão corretos &#128546;</span>

  }


  </div>


  <div className="opcoes-login mt-3 text-center">
  <a href = "recuperar-senha" className="mx-2"> Recuperar Senha</a>
  <span className="text-white"> &#9733; </span>
  <Link to="cadastro" href = "#" className="mx-2"> Cadastrar</Link>
  </div>
</form>
</div>
</>
)
};

export default Login
