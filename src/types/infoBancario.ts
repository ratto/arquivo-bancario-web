import Banco from './banco';

type InformacoesBancarias = {
  banco: Banco;
  agencia: number;
  dvAgencia: number;
  contaCorrente: number;
  dvConta: number;
};

export default InformacoesBancarias;
