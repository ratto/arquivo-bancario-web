import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Accordion, AccordionContext, Button, Card, Col, Form, Row, useAccordionButton } from 'react-bootstrap';
import Banco from '../../../types/banco';
import './style.scss';

type FormInputs = {
  numeroConvenio: number;
  sequencialRetorno: number;
  nomeEmpresa: string;
  bancoRecebedor: Banco;
  dataGeracao: string;
  sequencialArquivo: number;
  versaoLaioute: number;
  isComercioEletronico: boolean;
};

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

export const ArquivoRCB001 = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      versaoLaioute: 6,
    },
  });

  const watcherIsComercioEletronico = watch('isComercioEletronico', true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div id="arquivo-rcb001">
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="numero-convenio">
              <Form.Label>Número do Convênio</Form.Label>
              <Form.Control
                type="number"
                {...register('numeroConvenio', {
                  required: 'Este campo é obrigatório.',
                  maxLength: { value: 6, message: 'O número de convênio não pode ter mais de 6 dígitos.' },
                })}
                isInvalid={!!errors.numeroConvenio}
              />
              <Form.Control.Feedback type="invalid">{errors.numeroConvenio?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="sequencial-retorno">
              <Form.Label>Sequencial de retorno</Form.Label>
              <Form.Control
                type="number"
                {...register('sequencialRetorno', {
                  required: 'Este campo é obrigatório.',
                  maxLength: { value: 9, message: 'O sequencial de retorno não pode ter mais de 9 dígitos.' },
                })}
                isInvalid={!!errors.numeroConvenio}
              />
              <Form.Control.Feedback type="invalid">{errors.numeroConvenio?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="data-geracao">
              <Form.Label>Data de geração</Form.Label>
              <Form.Control
                type="date"
                {...register('dataGeracao', {
                  required: 'Este campo é obrigatório.',
                })}
                isInvalid={!!errors.dataGeracao}
              />
              <Form.Control.Feedback type="invalid">{errors.dataGeracao?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="nome-empresa">
              <Form.Label>Nome da empresa</Form.Label>
              <Form.Control
                type="text"
                {...register('nomeEmpresa', {
                  required: 'Este campo é obrigatório.',
                  maxLength: { value: 20, message: 'O nome da empresa não pode ter mais de 20 caracteres.' },
                })}
                isInvalid={!!errors.nomeEmpresa}
              />
              <Form.Control.Feedback type="invalid">{errors.nomeEmpresa?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="codigo-banco-recebedor">
              <Form.Label>Código do banco recebedor</Form.Label>
              <Form.Control
                type="number"
                {...register('bancoRecebedor.codigo', {
                  required: 'Este campo é obrigatório.',
                  maxLength: { value: 3, message: 'O código do banco não pode ter mais de 3 dígitos.' },
                })}
                isInvalid={!!errors.bancoRecebedor?.codigo}
              />
              <Form.Control.Feedback type="invalid">{errors.bancoRecebedor?.codigo?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="nome-banco-recebedor">
              <Form.Label>Nome do banco recebedor</Form.Label>
              <Form.Control
                type="text"
                {...register('bancoRecebedor.nome', {
                  required: 'Este campo é obrigatório.',
                  maxLength: { value: 20, message: 'O nome do banco não pode ter mais de 20 caracteres.' },
                })}
                isInvalid={!!errors.bancoRecebedor?.nome}
              />
              <Form.Control.Feedback type="invalid">{errors.bancoRecebedor?.nome?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group className="mb-2" controlId="switch-comercio-exterior">
              <Form.Check
                type="switch"
                {...register('isComercioEletronico')}
                label={
                  watcherIsComercioEletronico
                    ? 'Feito através de comércio eletrônico'
                    : 'Não foi através de comércio eletrônico'
                }
                defaultChecked={watcherIsComercioEletronico}
              />
            </Form.Group>
          </Col>
        </Row>

        <Accordion flush>
          <Card>
            <Card.Header className="d-flex justify-content-end">
              <ToggleAccordion eventKey="0" canDisable>
                Adicionar Registro Detalhe
              </ToggleAccordion>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <>
                <Card.Body>
                  <h2>Novo Registro Detalhe</h2>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </Card.Body>
                <Card.Footer className="d-flex justify-content-end">
                  <ToggleAccordion eventKey="0" variant="light">
                    Cancelar
                  </ToggleAccordion>
                  <Button className="ms-1" size="sm" variant="success">
                    Adicionar
                  </Button>
                </Card.Footer>
              </>
            </Accordion.Collapse>
          </Card>
        </Accordion>

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
