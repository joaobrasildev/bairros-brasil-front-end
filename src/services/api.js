import axios from 'axios';

// Configuração base do axios
const api = axios.create({
  baseURL: '/api', // Usando o proxy configurado no vite.config.js
});

// Serviços para interagir com o backend
export const cityService = {
  // Obter todas as cidades
  getAllCities: async () => {
    try {
      const response = await api.get('/cities');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      throw error;
    }
  },
};

export const neighborhoodService = {
  // Obter todos os bairros de uma cidade
  getNeighborhoodsByCity: async (cityId) => {
    try {
      const response = await api.get(`/neighborhoods?cityId=${cityId}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar bairros da cidade ${cityId}:`, error);
      throw error;
    }
  },
};

export const commentService = {
  // Obter todos os comentários de um bairro
  getCommentsByNeighborhood: async (neighborhoodId) => {
    try {
      const response = await api.get(`/neighborhood-comment/${neighborhoodId}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar comentários do bairro ${neighborhoodId}:`, error);
      throw error;
    }
  },
  
  // Adicionar um comentário a um bairro
  addComment: async (commentData) => {
    try {
      const response = await api.post('/neighborhood-comment', commentData);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
      throw error;
    }
  },
};

export default api;