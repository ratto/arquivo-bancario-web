/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState } from 'react';
import {
  Accordion,
  AccordionContext,
  Alert,
  Button,
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
  Table,
  useAccordionButton,
} from 'react-bootstrap';
import Banco from '../../../types/banco';
import './style.scss';

type Detalhe = {
  agenciaCreditada: string;
  dvAgenciaCreditada: string;
  contaCreditada: string;
  dvContaCreditada: string;
  dataPagamento: string;
  dataCredito: string;
  valorRecebido: number;
  valorTarifa: number;
  agenciaRecebedora: string;
  autenticacaoEletronica: string;
  meioArrecadacao: string;
  formaRecebimento: string;
};

const formasRecebimento: string[] = ['Dinheiro', 'Cheque', 'Não Identificada'];
const formaRecebimentoDefault: string = formasRecebimento[2];

const meiosArrecadacao: string[] = ['Caixa', 'Eletrônica', 'Internet'];
const meioArrecadacaoDefault: string = meiosArrecadacao[2];

// TODO: componentizar a função abaixo
const ToggleAccordion = (props: { children: string; eventKey: string; variant?: string; canDisable?: boolean }) => {
  const { activeEventKey } = useContext(AccordionContext);

  const toggleAccordion = useAccordionButton(props.eventKey);

  const isAccordionOpen = activeEventKey === props.eventKey;
  const disableButton = props.canDisable ? isAccordionOpen : false;

  return (
    <Button
      className="mx-1"
      variant={props.variant ?? 'primary'}
      size="sm"
      onClick={toggleAccordion}
      disabled={disableButton}
    >
      {props.children}
    </Button>
  );
};

// TODO: componentizar a função abaixo
const TableData = (props: { data: object }) => {
  console.log(Object.values(props.data));

  return (
    <>
      {Object.values(props.data).map((value, i) => (
        <td key={`td-${i}`}>{value}</td>
      ))}
    </>
  );
};

// TODO: componentizar a função abaixo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DrawTable = (props: { registrosDetalhe: any[] }) => {
  return (
    <Table striped bordered responsive>
      <thead>
        <tr>
          {Object.keys(props.registrosDetalhe[0]).map((key, i) => (
            <td key={i}>{key}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.registrosDetalhe.map((registro, i) => (
          <tr key={`tr-${i}`}>
            <TableData data={registro} />
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export const ArquivoRCB001 = () => {
  const bancoBrasil: Banco = {
    codigo: 1,
    nome: 'Banco do Brasil',
  };

  const [numeroConvenio, setNumeroConvenio] = useState<string>('');
  const [sequencialRetorno, setSequencialRetorno] = useState<string>('');
  const [nomeEmpresa, setNomeEmpresa] = useState<string>('');
  const [bancoRecebedor] = useState<Banco>(bancoBrasil);
  const [dataGeracao, setDataGeracao] = useState<string>('');
  const [sequencialArquivo, setSequencialArquivo] = useState<string>('1');
  const [versaoLeiaute, setVersaoLeiaute] = useState<string>('6');
  const [isComercioEletronico, setIsComercioEletronico] = useState<boolean>(true);

  const [agenciaCreditada, setAgenciaCreditada] = useState('');
  const [dvAgenciaCreditada, setDvAgenciaCreditada] = useState('');
  const [contaCreditada, setContaCreditada] = useState('');
  const [dvContaCreditada, setDvContaCreditada] = useState('');
  const [dataPagamento, setDataPagamento] = useState('');
  const [dataCredito, setDataCredito] = useState('');
  const [valorRecebido, setValorRecebido] = useState(0.0);
  const [valorTarifa, setValorTarifa] = useState(0.0);
  const [agenciaRecebedora, setAgenciaRecebedora] = useState('');
  const [autenticacaoEletronica, setAutenticacaoEletronica] = useState('');
  const [meioArrecadacao, setMeioArrecadacao] = useState(meioArrecadacaoDefault);
  const [formaRecebimento, setFormaRecebimento] = useState(formaRecebimentoDefault);

  const [registrosDetalhe, setRegistrosDetalhe] = useState<Detalhe[]>([] as Detalhe[]);

  const resetDetalhes = () => {
    setAgenciaCreditada('');
    setDvAgenciaCreditada('');
    setContaCreditada('');
    setDvContaCreditada('');
    setDataPagamento('');
    setDataCredito('');
    setValorRecebido(0.0);
    setValorTarifa(0.0);
    setAgenciaRecebedora('');
    setAutenticacaoEletronica('');
    setMeioArrecadacao(meioArrecadacaoDefault);
    setFormaRecebimento(formaRecebimentoDefault);
  };

  const handleAdicionarDetalhe = () => {
    const ac = agenciaCreditada;
    const dvAc = dvAgenciaCreditada;
    const cc = contaCreditada;
    const dvCc = dvContaCreditada;
    const dp = dataPagamento;
    const dc = dataCredito;
    const vr = valorRecebido;
    const vt = valorTarifa;
    const ar = agenciaRecebedora;
    const ae = autenticacaoEletronica;
    const ma = meioArrecadacao;
    const fr = formaRecebimento;

    const detalhe: Detalhe = {
      agenciaCreditada: ac,
      dvAgenciaCreditada: dvAc,
      contaCreditada: cc,
      dvContaCreditada: dvCc,
      dataPagamento: dp,
      dataCredito: dc,
      valorRecebido: vr,
      valorTarifa: vt,
      agenciaRecebedora: ar,
      autenticacaoEletronica: ae,
      meioArrecadacao: ma,
      formaRecebimento: fr,
    };

    setRegistrosDetalhe(registrosDetalhe.concat(detalhe));
    resetDetalhes();
  };

  return (
    <div id="arquivo-rcb001">
      <Form noValidate>
        <Row>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="numero-convenio">
              <Form.Label>Número do Convênio</Form.Label>
              <Form.Control
                type="number"
                value={numeroConvenio}
                onChange={(event) => setNumeroConvenio(event.target.value)}
              />
              {/* <Form.Control.Feedback type="invalid">{errors.numeroConvenio?.message}</Form.Control.Feedback> */}
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="versao-leiaute">
              <Form.Label>Versão do leiaute</Form.Label>
              <Form.Control
                type="number"
                value={versaoLeiaute}
                onChange={(event) => setVersaoLeiaute(event.target.value)}
              />
              {/* <Form.Control.Feedback type="invalid">{errors.numeroConvenio?.message}</Form.Control.Feedback> */}
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="sequencial-retorno">
              <Form.Label>Sequencial de retorno</Form.Label>
              <Form.Control
                type="number"
                value={sequencialRetorno}
                onChange={(event) => setSequencialRetorno(event.target.value)}
              />
              {/* <Form.Control.Feedback type="invalid">{errors.numeroConvenio?.message}</Form.Control.Feedback> */}
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="sequencial-arquivo">
              <Form.Label>Sequencial de Arquivo</Form.Label>
              <Form.Control
                type="number"
                value={sequencialArquivo}
                onChange={(event) => setSequencialArquivo(event.target.value)}
              />
              {/* <Form.Control.Feedback type="invalid">{errors.numeroConvenio?.message}</Form.Control.Feedback> */}
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="data-geracao">
              <Form.Label>Data de geração</Form.Label>
              <Form.Control type="date" value={dataGeracao} onChange={(event) => setDataGeracao(event.target.value)} />
              {/* <Form.Control.Feedback type="invalid">{errors.dataGeracao?.message}</Form.Control.Feedback> */}
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="nome-empresa">
              <Form.Label>Nome da empresa</Form.Label>
              <Form.Control type="text" value={nomeEmpresa} onChange={(event) => setNomeEmpresa(event.target.value)} />
              {/* <Form.Control.Feedback type="invalid">{errors.nomeEmpresa?.message}</Form.Control.Feedback> */}
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="codigo-banco-recebedor">
              <Form.Label>Código do banco recebedor</Form.Label>
              <Form.Control type="number" value={bancoRecebedor.codigo} readOnly />
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="nome-banco-recebedor">
              <Form.Label>Nome do banco recebedor</Form.Label>
              <Form.Control type="text" value={bancoRecebedor.nome} readOnly />
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="switch-comercio-exterior">
              <Form.Check
                type="switch"
                checked={isComercioEletronico}
                onChange={(event) => setIsComercioEletronico(event.target.checked)}
                label={
                  isComercioEletronico
                    ? 'Através de comércio eletrônico'
                    : 'Não foi feito através de comércio eletrônico'
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Accordion flush className="mb-3">
          <Card>
            <Card.Header className="d-flex justify-content-end">
              <ToggleAccordion eventKey="0" canDisable>
                Adicionar Registro Detalhe
              </ToggleAccordion>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <>
                <Card.Body>
                  <Row>
                    <Col xs="12">
                      <Form.Group className="mb-2" controlId="sequencial-registro">
                        <Form.Label>Número Sequencial de Registro</Form.Label>
                        <Form.Control type="number" plaintext readOnly value={registrosDetalhe.length + 1} />
                      </Form.Group>
                    </Col>
                    <Col xs="12">
                      <Form.Group className="mb-2" controlId="agencia-creditada">
                        <Form.Label>Agência creditada</Form.Label>
                        <Form.Control
                          type="number"
                          value={agenciaCreditada}
                          onChange={(event) => {
                            setAgenciaCreditada(event.target.value);
                          }}
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {errors.registrosDetalhe[sequencialDetalhe - 1]?.creditada?.agencia?.message}
                        </Form.Control.Feedback> */}
                      </Form.Group>
                    </Col>
                    <Col xs="12">
                      <Form.Group className="mb-2" controlId="dv-agencia-creditada">
                        <Form.Label>DV</Form.Label>
                        <Form.Control
                          type="number"
                          value={dvAgenciaCreditada}
                          onChange={(event) => setDvAgenciaCreditada(event.target.value)}
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {errors.registrosDetalhe![sequencialDetalhe - 1]!.creditada?.dvAgencia?.message}
                        </Form.Control.Feedback> */}
                      </Form.Group>
                    </Col>
                    <Col xs="12">
                      <Form.Group className="mb-2" controlId="conta-creditada">
                        <Form.Label>Conta creditada</Form.Label>
                        <Form.Control
                          type="number"
                          value={contaCreditada}
                          onChange={(event) => setContaCreditada(event.target.value)}
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {errors.registroDetalhe?.creditada?.contaCorrente?.message}
                        </Form.Control.Feedback> */}
                      </Form.Group>
                    </Col>
                    <Col xs="12">
                      <Form.Group className="mb-2" controlId="dv-conta-creditada">
                        <Form.Label>DV</Form.Label>
                        <Form.Control
                          type="number"
                          value={dvContaCreditada}
                          onChange={(event) => setDvContaCreditada(event.target.value)}
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {errors.registroDetalhe?.creditada?.dvAgencia?.message}
                        </Form.Control.Feedback> */}
                      </Form.Group>
                    </Col>
                    <Col xs="12">
                      <Form.Group className="mb-2" controlId="data-pagamento">
                        <Form.Label>Data do Pagamento</Form.Label>
                        <Form.Control
                          type="date"
                          value={dataPagamento}
                          onChange={(event) => setDataPagamento(event.target.value)}
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {errors.registroDetalhe?.dataPagamento?.message}
                        </Form.Control.Feedback> */}
                      </Form.Group>
                    </Col>
                    <Col xs="12">
                      <Form.Group className="mb-2" controlId="data-credito">
                        <Form.Label>Data do Crédito</Form.Label>
                        <Form.Control
                          type="date"
                          value={dataCredito}
                          onChange={(event) => setDataCredito(event.target.value)}
                        />
                        {/* <Form.Control.Feedback type="invalid">{errors.dataGeracao?.message}</Form.Control.Feedback> */}
                      </Form.Group>
                    </Col>
                    <Col xs="12">
                      <Form.Group className="mb-2" controlId="valor-recebido">
                        <Form.Label>Valor recebido</Form.Label>
                        <Form.Control
                          type="number"
                          value={valorRecebido}
                          onChange={(event) => setValorRecebido(parseFloat(event.target.value))}
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {errors.bancoRecebedor?.codigo?.message}
                        </Form.Control.Feedback> */}
                      </Form.Group>
                    </Col>
                    <Col xs="12">
                      <Form.Group className="mb-2" controlId="valor-tarifa">
                        <Form.Label>Valor da tarifa</Form.Label>
                        <Form.Control
                          type="number"
                          value={valorTarifa}
                          onChange={(event) => setValorTarifa(parseFloat(event.target.value))}
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {errors.bancoRecebedor?.codigo?.message}
                        </Form.Control.Feedback> */}
                      </Form.Group>
                    </Col>
                    <Col xs="12">
                      <Form.Group className="mb-2" controlId="agencia-recebedora">
                        <Form.Label>Agência recebedora</Form.Label>
                        <Form.Control
                          type="number"
                          value={agenciaRecebedora}
                          onChange={(event) => setAgenciaRecebedora(event.target.value)}
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {errors.bancoRecebedor?.codigo?.message}
                        </Form.Control.Feedback> */}
                      </Form.Group>
                    </Col>
                    <Col xs="12">
                      <Form.Group className="mb-2" controlId="autenticacao-eletronica">
                        <Form.Label>Autenticação eletrônica</Form.Label>
                        <Form.Control
                          type="number"
                          value={autenticacaoEletronica}
                          onChange={(event) => setAutenticacaoEletronica(event.target.value)}
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {errors.bancoRecebedor?.codigo?.message}
                        </Form.Control.Feedback> */}
                      </Form.Group>
                    </Col>
                    <Col xs="6">
                      <Form.Group className="mb-2" controlId="meio-arrecadacao">
                        <Form.Label>Meio de Arrecadação</Form.Label>
                        <DropdownButton
                          variant="light"
                          className="d-grid gap-2"
                          title={meioArrecadacao}
                          onSelect={(eventKey) => setMeioArrecadacao(eventKey ?? meioArrecadacaoDefault)}
                        >
                          {meiosArrecadacao.map((meio, i) => (
                            <Dropdown.Item key={i} eventKey={meio}>
                              {meio}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                      </Form.Group>
                    </Col>
                    <Col xs="6">
                      <Form.Group className="mb-2" controlId="forma-recebimento">
                        <Form.Label>Forma de Recebimento</Form.Label>
                        <DropdownButton
                          variant="light"
                          className="d-grid gap-2"
                          title={formaRecebimento}
                          onSelect={(eventKey) => setFormaRecebimento(eventKey ?? formaRecebimentoDefault)}
                        >
                          {formasRecebimento.map((forma, i) => (
                            <Dropdown.Item key={i} eventKey={forma}>
                              {forma}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-end">
                  <ToggleAccordion eventKey="0" variant="light">
                    Cancelar
                  </ToggleAccordion>
                  <Button className="ms-1" size="sm" variant="success" onClick={() => handleAdicionarDetalhe()}>
                    Adicionar
                  </Button>
                </Card.Footer>
              </>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        {registrosDetalhe.length === 0 ? (
          <Alert variant="warning" className="text-center">
            Nenhum registro-detalhe foi adicionado ao arquivo.
          </Alert>
        ) : (
          <DrawTable registrosDetalhe={registrosDetalhe} />
        )}

        <hr />
        <div className="form-button-container d-flex justify-content-end">
          <Button type="reset" variant="danger" className="mx-1">
            Reiniciar
          </Button>
          <Button type="submit" variant="primary" className="mx-1">
            Gerar Arquivo!
          </Button>
        </div>
      </Form>
    </div>
  );
};
