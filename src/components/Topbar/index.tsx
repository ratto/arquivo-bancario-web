import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import './style.scss';

export const Topbar = () => {
  return (
    <Navbar expand={false} sticky="top" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Toggle aria-controls="menu-navbar" />
        <LinkContainer to={'/'}>
          <Navbar.Brand className="me-auto ms-4">Gerador de Arquivos Bancários</Navbar.Brand>
        </LinkContainer>
        <Navbar.Offcanvas id="menu-navbar" aria-labelledby="menu-navbar-label" placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="menu-navbar-label">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <LinkContainer to={'/'}>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to={'/arquivos-retorno'}>
                <Nav.Link>Arquivos de Retorno</Nav.Link>
              </LinkContainer>
              <LinkContainer to={'/sobre'}>
                <Nav.Link>Sobre</Nav.Link>
              </LinkContainer>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
