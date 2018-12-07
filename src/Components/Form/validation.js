export const required = value => (typeof value !== 'undefined' && value !== null && value !== '' ? null : 'Campo obrigatorio');

export const cnpj = value =>
  (value && !/^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})$/i.test(value)
    ? 'CNPJ fora de formato'
    : null);

export const cpf = value =>
  (value && !/^([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/i.test(value)
    ? 'CPF fora de formato'
    : null);

export const tel = value =>
  (value && !/^\([1-9]{2}\) [2-9][0-9]{3,4}\-[0-9]{4}$/i.test(value)
    ? 'Numero começado por 1'
    : null);

export const cep = value =>
  (value && !/^([0-9]{2}[\.]?[0-9]{3}[\.]?[-]?[0-9]{3})$/i.test(value)
    ? 'CEP fora de formato'
    : null);

export const maxLength = max => value =>
  (value && value.length > max ? `Deve ser ${max} caracteres ou menos` : null);

export const maxLength2 = maxLength(15);

export const minLength = min => value =>
  (value && value.replace(/_|\//gi, '').length < min ? `Deve ser maior que ${min} caracteres` : null);

export const minLength6 = min => value =>
  (value && value.replace(/_|\//gi, '').length < min ? 'Deve ser uma data valida' : null);

export const minLength2 = minLength(2);
export const minLengthData = minLength6(6);

export const number = value =>
  (value && Number.isNaN(Number(value)) ? 'Deve ser um número' : null);

export const minValue = () => value =>
  (value && !/^([0-9]{2})$/i.test(value)
    ? 'Número deve ser maior que 0'
    : null);

export const biggerThanZero = () => value =>
  (value && value === '0,000' ? 'Deve ser maior que 0' : null);
export const minValue0 = biggerThanZero(0.00);

export const biggerThanZero0 = () => value =>
  (value && value === '0,00' ? 'Deve ser maior que 0' : null);
export const minValue00 = biggerThanZero0(0.00);

export const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,20}$/i.test(value)
    ? 'Email inválido'
    : null);

export const tooOld = value =>
  (value && value > 65 ? 'Você pode ser muito velho para isso' : null);

export const alphaNumeric = value =>
  (value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Somente caracteres alfanuméricos'
    : null);

export const phoneNumber = value =>
  (value && !/^(0|[1-9][0-9]{9,11})$/i.test(value)
    ? 'Telefone Invalido'
    : null);

export const blockComma = value =>
  value && !/^(\d*\.?\d)$/i.test(value);

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), null);

export const password = value => (minLength(6)(value));

export const confirmPassword2 = confirm => value => (
  minLength(6)(value) || (confirm !== value ? 'A Senha é diferente' : null)
);

