import React, { useState, useEffect } from 'react';
import './evento-detalhes.css';
import firebase from '../../config/firebase';
import { Link } from 'react-router-dom';
import NavBar from '../../components/navbar';
import { useSelector } from 'react-redux';

// Props takes the event id to be part of the function, like a where in SQL.
function EventoDetalhes(props){

    const [evento, setEvento] = useState({});
    const [urlImg, setUrlImg] = useState({});

    const [carregando, setCarregando] = useState(1);

    const usuario = useSelector( state => state.usuarioEmail);

    useEffect(() => {
      if(carregando){
      firebase.firestore().collection('eventos').doc(props.match.params.id).get().then(resultado => {
        setEvento(resultado.data());
        firebase.firestore().collection('eventos').doc(props.match.params.id).update('visualizacoes', resultado.data().visualizacoes + 1)
        firebase.storage().ref(`imagens/${resultado.data().foto}`).getDownloadURL().then(url => {
          setUrlImg(url)
          setCarregando(0);
        });
      });
    }
    else{
      firebase.storage().ref(`imagens/${evento.foto}`).getDownloadURL().then(url => setUrlImg(url));
    }
    // By putting an empty array after the useEffect function, the page just go through all of it 1 time, instead of keeping updating.
    }, [])

  return (
    <>
    <NavBar />
        <div className="container-fluid">

        {

          carregando ?
          <div className="row mt-5">
          <div className="spinner-border text-danger mx-auto" role="status"><span className="sr-only"></span></div>
          </div>


          :
              <div>
              <div className="row">
                    <img src={urlImg} className="img-banner" alt="Banner evento"/>
                    <div className="col-12 text-right mt-1 visualizacoes">

                          <i class="fas fa-eye"></i> <span>{evento.visualizacoes + 1}</span>

                    </div>
                    <h3 className="mx-auto titulo"><strong>{evento.titulo}</strong></h3>
              </div>

                  <div className="row mt-5 d-flex justify-content-around">
                        <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                            <i className="fas fa-ticket-alt fa-2x"></i>
                            <h5> <strong>Tipo</strong></h5>
                            <span className="mt-3">{evento.tipo}</span>
                        </div>

                        <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                            <i className="fas fa-calendar-alt fa-2x"></i>
                            <h5> <strong>Data</strong></h5>
                            <span className="mt-3">{evento.data}</span>
                        </div>

                        <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                            <i className="fas fa-clock fa-2x"></i>
                            <h5> <strong>Hora</strong></h5>
                            <span className="mt-3">{evento.hora}</span>
                        </div>


                  </div>

                  <div className="row box-detalhes mt-5">
                  <div className="col-12 text-center">
                      <h5><strong>Detalhes do evento</strong></h5>
                  </div>
                  <div className="col-12 text-center">
                      <p>{evento.detalhes}</p>
                  </div>

                  </div>
                  {
                    evento.usuario === usuario ?

                  <Link to="" className="btn-editar"><i className="fas fa-pen-square fa-3x"></i></Link>

                  : null

                  }

        </div>
      }
        </div>
    </>
  )
}

export default EventoDetalhes;
