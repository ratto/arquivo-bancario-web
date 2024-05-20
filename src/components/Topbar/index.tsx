import { Container, Nav, Navbar } from 'react-bootstrap';
import './style.scss';

export const Topbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="/">Gerador de Arquivos Bancários</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/pagamento" disabled>
              Arquivos de Pagamento
            </Nav.Link>
            <Nav.Link href="/cobranca" disabled>
              Arquivos de Cobrança
            </Nav.Link>
            <Nav.Link href="/sobre">Sobre</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
