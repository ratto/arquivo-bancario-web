import { NavLink } from 'react-router-dom';
import './style.scss';

export const Erro = () => {
  return (
    <div id="pagina-erro" className="page-layout">
      <div className="mensagem-box">
        <h1>Oops! Algo deu errado...</h1>
        <p>
          Não sei bem o que aconteceu, mas tente <NavLink to="/">voltar para o início</NavLink>.
        </p>
      </div>
    </div>
  );
};
