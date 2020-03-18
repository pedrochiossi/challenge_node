import axios from 'axios';

const validateAddress = async (data) => {
  if (data.cep.length !== 8) {
    return false;
  }
  const response = await axios.get(`https://viacep.com.br/ws/${data.cep}/json/`);

  if (response.data.erro) {
    return false;
  }
  const { logradouro, localidade, uf } = response.data;
  if (data.street !== logradouro || localidade !== data.city || uf !== data.state) {
    return false;
  }
  return true;
};

export default validateAddress;
