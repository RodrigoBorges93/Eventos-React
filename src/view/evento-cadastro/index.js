import React, { useState, useEffect } from 'react';
import './evento-cadastro.css';
import firebase from '../../config/firebase';
import 'firebase/auth';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../../components/navbar';
import { useSelector  } from 'react-redux';


function EventoCadastro(props){
  const [carregando, setCarregando] = useState();
  const [titulo, setTitulo] = useState();
  const [tipo, setTipo] = useState();
  const [detalhes, setDetalhes] = useState();
  const [data, setData] = useState();
  const [hora, setHora] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [fotoAtual, setFotoAtual] = useState();
  const [fotoNova, setFotoNova] = useState();
  const usuarioEmail = useSelector(state => state.usuarioEmail);

  const storage = firebase.storage();
  const db = firebase.firestore();

  if (props.match.params.id){

  useEffect(() => {
    firebase.firestore().collection('eventos').doc(props.match.params.id).get().then(resultado => {
      setTitulo(resultado.data().titulo);
      setTipo(resultado.data().tipo);
      setDetalhes(resultado.data().detalhes);
      setData(resultado.data().data);
      setHora(resultado.data().hora);
      setFotoAtual(resultado.data().foto)
      })
  // By putting an empty array after the useEffect function, the page just go through all of it 1 time, instead of keeping updating.
  }, [])
}

  function cadastrar(){

    setCarregando(1);
    setMsgTipo(null);

    storage.ref(`imagens/${fotoNova.name}`).put(fotoNova).then(() =>{

      db.collection('eventos').add({
        titulo: titulo,
        tipo: tipo,
        detalhes: detalhes,
        data: data,
        hora: hora,
        usuario: usuarioEmail,
        visualizacoes:0,
        foto: fotoNova.name,
        publico:1,
        criacao: new Date()
      }).then(() => {
        setMsgTipo('sucesso');
        setCarregando(0);
      }).catch(erro => {
      setMsgTipo('erro');
      setCarregando(0);
    });
  });
}

function atualizar(){

  setCarregando(1);
  setMsgTipo(null);

  if(fotoNova){

    storage.ref(`imagens/${fotoNova.name}`).put(fotoNova);}

    db.collection('eventos').doc(props.match.params.id).update({
      titulo: titulo,
      tipo: tipo,
      detalhes: detalhes,
      data: data,
      hora: hora,
      foto: fotoNova ? fotoNova.name : fotoAtual
    }).then(() => {
      setMsgTipo('sucesso');
      setCarregando(0);
    }).catch(erro => {
    setMsgTipo('erro');
    setCarregando(0);
  });
};


  return (
    <>
    <NavBar />
    { useSelector(state => state.usuarioLogado) > 0 ?
      <div className="col-12 mt-3 ">
        <div className="row">
          <h3 className="mx-auto font-weight-bold">{props.match.params.id ? 'Atualizar evento' : 'Novo evento'}</h3>
        </div>
        <form>
            <div className="form-group">
                <label>Título:</label>
                <input onChange={(e) => setTitulo(e.target.value) } type="text" className="form-control" value={titulo && titulo}/>
            </div>

            <div className="form-group">
                <label>Tipo do evento:</label>
                <select onChange={(e) => setTipo(e.target.value) } className="form-control" value={tipo && tipo}>
                <option disabled selected value> -- Selecione um tipo --  </option>
                <option> Festa </option>
                <option> Teatro </option>
                <option> Show </option>
                <option> Evento </option>
                </select>
            </div>

            <div className="form-group">
                <label>Descrição do evento: </label>
                <textarea onChange={(e) => setDetalhes(e.target.value) } className="form-control" rows="2" value={detalhes && detalhes}/>
            </div>

            <div className="form-group row">
                <div className="col-6">
                    <label>Data:</label>
                    <input onChange={(e) => setData(e.target.value) } type="date" className="form-control" value={data && data}/>
                </div>
                <div className="col-6">
                    <label>Hora:</label>
                    <input onChange={(e) => setHora(e.target.value) }  type="time" className="form-control" value={hora && hora}/>
                </div>
            </div>


            <div className="form-group">
                <label>Upload imagem: {props.match.params.id ? 'Apenas se quiser mudar a foto atual' : null}</label>
                <input onChange={(e) => setFotoNova(e.target.files[0]) } type="file" className="form-control"/>
            </div>

          <div className="row">
          { carregando > 0 ?
          <div className="spinner-border text-danger mx-auto" role="status"><span className="sr-only">Loading ... </span></div>
          :
          <button onClick={props.match.params.id ? atualizar : cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-2 btn-cadastro"> {props.match.params.id ? 'Editar evento' : 'Publicar evento'}</button>
        }
          </div>
        </form>
        <div className="msg-login text-center">


        {
          msgTipo === 'sucesso' &&
          <span><strong>Parabéns!</strong> Seu evento foi publicado &#128526;</span>
          }


        {
          msgTipo === 'erro' &&
        <span><strong>Desculpe!</strong> Ocorreu algum erro no cadastro deste evento! &#128546;</span>

        }


        </div>
      </div>
      :
       <Redirect to='login'/> }
     }
      </>
  )
}

export default EventoCadastro;
