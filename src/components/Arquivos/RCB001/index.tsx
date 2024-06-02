/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'react';
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
import { useFieldArray, useForm } from 'react-hook-form';

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
  //console.log(Object.values(props.data));

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

type RegistroDetalhe = {
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

type Registro = {
  numeroConvenio: string;
  sequencialRetorno: string;
  nomeEmpresa: string;
  bancoRecebedor: Banco;
  dataGeracao: string;
  sequencialArquivo: number;
  versaoLeiaute: number;
  isComercioEletronico: boolean;

  registrosDetalhe: RegistroDetalhe[];
};

export const ArquivoRCB001 = () => {
  const bancoBrasil: Banco = {
    codigo: 1,
    nome: 'Banco do Brasil',
  };

  const { control, register, watch } = useForm<Registro>({
    defaultValues: {
      bancoRecebedor: { ...bancoBrasil },
      sequencialArquivo: 0,
      versaoLeiaute: 6,
      isComercioEletronico: true,

      registrosDetalhe: [
        {
          valorRecebido: 0.0,
          valorTarifa: 0.0,
          meioArrecadacao: meioArrecadacaoDefault,
          formaRecebimento: formaRecebimentoDefault,
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'registrosDetalhe',
  });

  const watchIsComercioEletronico = watch('isComercioEletronico');
  const watchRegistrosDetalhe = watch('registrosDetalhe');
  const controlledRegistros = fields.map((field, index) => ({ ...field, ...watchRegistrosDetalhe[index] }));

  const [registroAtual, setRegistroAtual] = useState(0);
  const [podeAdicionarDetalhe, setPodeAdicionarDetalhe] = useState(false);
  const [registrosGravados, setRegistrosGravados] = useState<RegistroDetalhe[]>([] as RegistroDetalhe[]);

  const handleAdicionarDetalhe = () => {
    const registroDetalhe = watchRegistrosDetalhe[registroAtual];
    append({ ...registroDetalhe });
    setRegistroAtual(registroAtual + 1);
  };

  useEffect(() => {
    if (podeAdicionarDetalhe) {
      handleAdicionarDetalhe();
      setRegistrosGravados(watchRegistrosDetalhe);
      setPodeAdicionarDetalhe(false);
    }
  }, [podeAdicionarDetalhe, watchRegistrosDetalhe]);

  return (
    <div id="arquivo-rcb001">
      <Form noValidate>
        <Row>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="numero-convenio">
              <Form.Label>Número do Convênio</Form.Label>
              <Form.Control type="number" {...register('numeroConvenio')} />
              {/* <Form.Control.Feedback type="invalid">{errors.numeroConvenio?.message}</Form.Control.Feedback> */}
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="versao-leiaute">
              <Form.Label>Versão do leiaute</Form.Label>
              <Form.Control type="number" {...register('versaoLeiaute')} />
              {/* <Form.Control.Feedback type="invalid">{errors.numeroConvenio?.message}</Form.Control.Feedback> */}
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="sequencial-retorno">
              <Form.Label>Sequencial de retorno</Form.Label>
              <Form.Control type="number" {...register('sequencialRetorno')} />
              {/* <Form.Control.Feedback type="invalid">{errors.numeroConvenio?.message}</Form.Control.Feedback> */}
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="sequencial-arquivo">
              <Form.Label>Sequencial de Arquivo</Form.Label>
              <Form.Control type="number" {...register('sequencialArquivo')} />
              {/* <Form.Control.Feedback type="invalid">{errors.numeroConvenio?.message}</Form.Control.Feedback> */}
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="data-geracao">
              <Form.Label>Data de geração</Form.Label>
              <Form.Control type="date" {...register('dataGeracao')} />
              {/* <Form.Control.Feedback type="invalid">{errors.dataGeracao?.message}</Form.Control.Feedback> */}
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="nome-empresa">
              <Form.Label>Nome da empresa</Form.Label>
              <Form.Control type="text" {...register('nomeEmpresa')} />
              {/* <Form.Control.Feedback type="invalid">{errors.nomeEmpresa?.message}</Form.Control.Feedback> */}
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="codigo-banco-recebedor">
              <Form.Label>Código do banco recebedor</Form.Label>
              <Form.Control type="number" {...register('bancoRecebedor.codigo')} readOnly disabled />
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="nome-banco-recebedor">
              <Form.Label>Nome do banco recebedor</Form.Label>
              <Form.Control type="text" {...register('bancoRecebedor.nome')} readOnly disabled />
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="switch-comercio-exterior">
              <Form.Check
                type="switch"
                {...register('isComercioEletronico')}
                label={
                  watchIsComercioEletronico
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
                  {controlledRegistros.map(
                    (field, index) =>
                      registroAtual === index && (
                        <Row key={field.id}>
                          <Col xs="12">
                            <Form.Group className="mb-2" controlId="sequencial-registro">
                              <Form.Label>Número Sequencial de Registro</Form.Label>
                              <Form.Control type="number" plaintext readOnly value={registroAtual + 1} />
                            </Form.Group>
                          </Col>
                          <Col xs="12">
                            <Form.Group className="mb-2" controlId="agencia-creditada">
                              <Form.Label>Agência creditada</Form.Label>
                              <Form.Control
                                type="number"
                                {...register(`registrosDetalhe.${index}.agenciaCreditada` as const)}
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
                                {...register(`registrosDetalhe.${index}.dvAgenciaCreditada` as const)}
                              />
                              {/* <Form.Control.Feedback type="invalid">
                          {errors.registrosDetalhe![sequencialDetalhe - 1]!.creditada?.dvAgencia?.message}
                        </Form.Control.Feedback> */}
                            </Form.Group>
                          </Col>
                          <Col xs="12">
                            <Form.Group className="mb-2" controlId="conta-creditada">
                              <Form.Label>Conta creditada</Form.Label>
                              <Form.Control type="number" {...register(`registrosDetalhe.${index}.contaCreditada`)} />
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
                                {...register(`registrosDetalhe.${index}.dvContaCreditada` as const)}
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
                                {...register(`registrosDetalhe.${index}.dataPagamento` as const)}
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
                                {...register(`registrosDetalhe.${index}.dataCredito` as const)}
                              />
                              {/* <Form.Control.Feedback type="invalid">{errors.dataGeracao?.message}</Form.Control.Feedback> */}
                            </Form.Group>
                          </Col>
                          <Col xs="12">
                            <Form.Group className="mb-2" controlId="valor-recebido">
                              <Form.Label>Valor recebido</Form.Label>
                              <Form.Control
                                type="number"
                                {...register(`registrosDetalhe.${index}.valorRecebido` as const)}
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
                                {...register(`registrosDetalhe.${index}.valorTarifa` as const)}
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
                                {...register(`registrosDetalhe.${index}.agenciaRecebedora` as const)}
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
                                {...register(`registrosDetalhe.${index}.autenticacaoEletronica` as const)}
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
                                title={controlledRegistros[index].meioArrecadacao ?? 'Selecione um meio de arrecadação'}
                                variant="light"
                                className="d-grid gap-2"
                                {...register(`registrosDetalhe.${index}.meioArrecadacao` as const)}
                              >
                                {meiosArrecadacao.map((meio, i) => (
                                  <Dropdown.Item
                                    key={i}
                                    onClick={() => {
                                      controlledRegistros[index].meioArrecadacao = meio;
                                    }}
                                  >
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
                                title={
                                  controlledRegistros[index].formaRecebimento ?? 'Selecione uma forma de recebimento'
                                }
                                variant="light"
                                className="d-grid gap-2"
                                {...register(`registrosDetalhe.${index}.formaRecebimento` as const)}
                              >
                                {formasRecebimento.map((forma, i) => (
                                  <Dropdown.Item
                                    key={i}
                                    onClick={() => {
                                      controlledRegistros[index].formaRecebimento = forma;
                                    }}
                                  >
                                    {forma}
                                  </Dropdown.Item>
                                ))}
                              </DropdownButton>
                            </Form.Group>
                          </Col>
                        </Row>
                      )
                  )}
                </Card.Body>
                <Card.Footer className="d-flex justify-content-end">
                  <ToggleAccordion eventKey="0" variant="light">
                    Cancelar
                  </ToggleAccordion>
                  <Button className="ms-1" size="sm" variant="success" onClick={() => setPodeAdicionarDetalhe(true)}>
                    Adicionar
                  </Button>
                </Card.Footer>
              </>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        {registrosGravados.length === 0 ? (
          <Alert variant="warning" className="text-center">
            Nenhum registro-detalhe foi adicionado ao arquivo.
          </Alert>
        ) : (
          <DrawTable registrosDetalhe={registrosGravados} />
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
