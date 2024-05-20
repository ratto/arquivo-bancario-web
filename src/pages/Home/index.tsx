import { Card, CardBody } from 'react-bootstrap';
import './style.scss';

export const Home = () => {
  return (
    <div id="home-page" className="page-layout">
      <section id="cover">
        <div id="cover-caption">
          <Card className="cover-card ms-5">
            <CardBody>
              <h1 className="visually-hidden">Home</h1>
              <div>
                Este aplicativo tem o intuito de ajudar todos os colegas da área de TI a simularem arquivos de texto que
                são trocados por bancos e outras instituições financeiras. Deverá ajudar a todas as áreas, seja no
                desenvolvimento ou nos testes e, talvez, tornar a nossa vidinha mais fácil.
              </div>
              <div>
                É gratuito para usar, mas deixe uma mensagem ou uma contribuição para ajudar este desenvolvedor a
                comprar o seu café, e continuar desenvolvendo doideiras como esta.
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
};
