
function testaCPF(str) {
  let Soma = 0;
  let Resto;
  if (str === '00000000000') return false;

  for (let i = 1; i <= 9; i += 1) {
    Soma += parseInt(str.substring(i - 1, i), 10) * (11 - i);
  }
  Resto = (Soma * 10) % 11;

  if ((Resto === 10) || (Resto === 11)) Resto = 0;
  if (Resto !== parseInt(str.substring(9, 10), 10)) {
    return false;
  }
  Soma = 0;
  for (let i = 1; i <= 10; i += 1) {
    Soma += parseInt(str.substring(i - 1, i), 10) * (12 - i);
  }
  Resto = (Soma * 10) % 11;
  if ((Resto === 10) || (Resto === 11)) Resto = 0;
  if (Resto !== parseInt(str.substring(10, 11), 10)) {
    return false;
  }
  return true;
}

export default testaCPF;
