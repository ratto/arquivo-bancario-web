/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import Banco from '../types/banco';
import ResponseStatus from '../enums/responseStatus';

export const loadBanks = async (): Promise<{ status: ResponseStatus; data: Banco[] | undefined; message: string }> => {
  let status = ResponseStatus.LOADING;
  let data: Banco[] | undefined;
  let message = '';

  await axios
    .get('https://brasilapi.com.br/api/banks/v1')
    .then((response) => {
      const banks = response.data;
      data = banks.reduce((lista: Banco[], currentBank: any) => {
        const banco: Banco = {
          codigo: currentBank.code,
          nome: currentBank.name,
        };

        lista.push(banco);
        return lista;
      });

      status = ResponseStatus.SUCCESS;
    })
    .catch((e) => {
      status = ResponseStatus.ERROR;
      message = e.message;
    });

  return { status, data, message };
};
