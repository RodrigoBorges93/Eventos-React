import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from '../src/store/';
import { Provider } from 'react-redux';


/*Páginas*/

import Login from '../src/view/login';
import NovoUsuario from '../src/view/usuario-novo';
import Home from '../src/view/home';
import UsuarioRecuperarSenha from '../src/view/usuario-recuperar-senha';
import EventoCadastro from '../src/view/evento-cadastro';
import EventoDetalhes from '../src/view/evento-detalhes';

const App = () => (
  <Provider store={store}>
    <Router>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/cadastro" component={NovoUsuario}/>
    <Route path="/eventos/:parametro" component={Home}/>
    <Route exact path="/" component={Home}/>
    <Route exact path="/recuperar-senha" component={UsuarioRecuperarSenha}/>
    <Route exact path="/cadastrar-evento" component={EventoCadastro}/>
    <Route exact path="/eventodetalhes" component={EventoDetalhes}/>
    </Router>
  </Provider>
)

//class App extends Component {
  //render() {
    //return (
      //<h6>Teste</h6>
    //);
 // }
//}

export default App;
