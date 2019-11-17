import React, { useState } from 'react';
import firebase from '../../config/firebase';
import 'firebase/auth';
import './usuario-novo.css';
import NavBar from '../../components/navbar';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function NovoUsuario(){

  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [senhaConfirmation, setSenhaConfirmation] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [msg, setMsg] = useState();
  const [carregando, setCarregando] = useState();


  // Teste
  function cadastrar(){

    setCarregando(1);

    setMsgTipo(null);

    if (senha != senhaConfirmation){
      setCarregando(0);
      setMsgTipo('erro')
      setMsg('As duas senhas precisam ser idênticas!')
    }

    else if(senha === senhaConfirmation){

    if(!email || !senha){
        setCarregando(0);
        setMsgTipo('erro');
        setMsg('Você precisa informar o e-mail e a senha para fazer o cadastro!');
        return
    };

    firebase.auth().createUserWithEmailAndPassword(email, senha)

    .then(resultado => {
          setCarregando(0);
          setMsgTipo('sucesso');
    }

    ).catch(erro => {
          setCarregando(0);
          setMsgTipo('erro');
          setMsg(erro.message)
    });
  }
  }


  return (

    <>
    <NavBar />

    {
        useSelector( state => state.usuarioLogado) > 0 ?
       <Redirect to='/'/> : null
    }
    <div className="form-cadastro cadastro-form">
      <form className="text-center form-login mx-auto mt-1">
          <i class="far fa-smile-wink text-white fa-5x my-2"></i>
          <h1 className="h3 mb-3 text-white font-weight-bold"> Cadastro </h1>

          <input onChange={(e) => setEmail(e.target.value) } type="email" className="form-control my-2" placeholder="E-mail"></input>
          <input onChange={(e) => setSenha(e.target.value) } type="password" className="form-control my-2" placeholder="Password"></input>

          <input onChange={(e) => setSenhaConfirmation(e.target.value) } type="password" className="form-control my-2" placeholder="Confirm Your Password"></input>

      {
        carregando ? <div className="spinner-border text-danger" role="status"><span className="sr-only"></span></div>
        :

        <button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastrar"> Cadastrar </button>

      }
    </form>

  <div className="msg-login text-black text-center my-5">


  {
    msgTipo === 'sucesso' &&
    <span><strong>WoW!</strong> Usuário cadastrado com sucesso &#128526;</span>
    }


  {
    msgTipo === 'erro' &&
  <span><strong>Ops!</strong> {msg} &#128546;</span>

  }


  </div>
  </div>
  </>
  )
};

export default NovoUsuario
