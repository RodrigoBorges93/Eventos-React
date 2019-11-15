import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './evento-card.css';
import firebase from '../../config/firebase';

function EventoCard({id, img, titulo, detalhes, visualizacoes}){

    const [urlImagem, setUrlImagem] = useState();


    // urlImagem depois dos termos em array faz com que a função chame por padrão este termo depois de ter buscado uma única
    // vez no storage.
    useEffect(() =>{
      firebase.storage().ref(`imagens/${img}`).getDownloadURL().then(url => setUrlImagem(url));
    },[urlImagem]);


  return (
    <div className="col-md-3 col-sm-12 mt-3">
        <img id="banner-evento" src={urlImagem} className="card-img-top img-cartao" alt="Imagem do evento"/>
        <div className="card-body">
            <h5>{titulo}</h5>
            <p className="card-text text-justify"> {detalhes} </p>
                <div className="row rodape-card d-flex align-items-center">
                  <div className="col-6">
                    <Link to={"/eventodetalhes/" + id} className="btn btn-sm btn-detalhes"> Mais detalhes </Link>
                  </div>


                <div className="col-6 text-right">
                  <i class="fas fa-eye"></i> <span>{visualizacoes}</span>
                  </div>

                  </div>

        </div>
    </div>
  )
}

export default EventoCard;
