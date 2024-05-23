import { Card, CardBody, Container, Tab, Tabs } from 'react-bootstrap';
import { ArquivoRCB001 } from '../../components/Arquivos/RCB001';
import { ArquivoCNAB240 } from '../../components/Arquivos/CNAB240';
import './style.scss';

export const ArquivosRetorno = () => {
  return (
    <div id="arquivos-retorno-page" className="page-layout">
      <Container fluid>
        <header>
          <h1>Arquivos de Retorno</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quidem, sit iusto vel nesciunt libero fugit
            quae nobis laudantium tenetur voluptas, commodi ipsa nisi eum error rerum voluptatum praesentium numquam.
          </p>
        </header>
        <section>
          <Card className="tab-container">
            <Tabs defaultActiveKey="rcb001" id="tabs-arquivos">
              <Tab eventKey="rcb001" title="RCB 001">
                <CardBody>
                  <ArquivoRCB001 />
                </CardBody>
              </Tab>
              <Tab eventKey="cnab240" title="CNAB 240">
                <CardBody>
                  <ArquivoCNAB240 />
                </CardBody>
              </Tab>
            </Tabs>
          </Card>
        </section>
      </Container>
    </div>
  );
};
