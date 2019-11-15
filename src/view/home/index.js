import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './home.css';
import NavBar from '../../components/navbar';
import EventoCard from '../../components/evento-card';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase'

function Home({match}){

      if(match.params.parametro){


      }
      const [eventos, setEventos] = useState([]);
      const [pesquisa, setPesquisa] = useState('');
      let listaEventos = [];
      const usuario = useSelector(state => state.usuarioEmail);

      if(match.params.parametro){

              useEffect(() =>{
                  firebase.firestore().collection('eventos').where('usuario','==',usuario).get().then(async (resultado) => {
                      await resultado.docs.forEach(doc => {
                        if(doc.data().titulo.indexOf(pesquisa) >= 0){
                        listaEventos.push({
                          id: doc.id,
                          ...doc.data()
                        })
                      }

                      })
                      setEventos(listaEventos);
                  })
              });

      }
      else{

      useEffect(() =>{
          firebase.firestore().collection('eventos').get().then(async (resultado) => {
              await resultado.docs.forEach(doc => {
                if(doc.data().titulo.indexOf(pesquisa) >= 0){
                listaEventos.push({
                  id: doc.id,
                  ...doc.data()
                })
              }

              })
              setEventos(listaEventos);
          })
      });
    }

  return (
    <>
    <NavBar/>
    <div className="row p-3">
      <h3 className="mx-auto font-weight-bold pb-3"> Eventos Publicados </h3>

    <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control text-center" placeholder="Pesquisar evento pelo título..."/>
    </div>

    <div className="row p-2">
        {eventos.map(item => <EventoCard  key={item.id} id={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes}/>) }
    </div>


    </>
  );
}

export default Home
