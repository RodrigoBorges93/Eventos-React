import React, { useState } from 'react';
import './evento-detalhes.css';
import firebase from '../../config/firebase';
import { Link } from 'react-router-dom';
import NavBar from '../../components/navbar';
import { useSelector } from 'react-redux';


function EventoDetalhes(){
  return (
    <>
    <NavBar />
        <div className="container">
              <div className="row">
                    <img src="https://trilliumgiving.ca/wp-content/uploads/2015/12/placeholder-150x150.png" className="img-banner" alt="Banner evento"/>
              </div>
        </div>
    </>
  )
}

export default EventoDetalhes;
