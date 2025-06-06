import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { neighborhoodService, cityService } from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';

function NeighborhoodList() {
  const { cityId } = useParams();
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Em uma implementação real, buscaríamos o nome da cidade do backend
        // Aqui estamos usando dados mockados para o MVP
        const mockCities = [
          { id: 1, name: 'São Paulo' },
          { id: 2, name: 'Rio de Janeiro' },
          { id: 3, name: 'Belo Horizonte' },
          { id: 4, name: 'Salvador' },
          { id: 5, name: 'Brasília' },
        ];
        
        const city = mockCities.find(c => c.id === parseInt(cityId)) || { name: `Cidade ${cityId}` };
        setCityName(city.name);
        
        // Tentar buscar os bairros do backend
        try {
          const neighborhoodsData = await neighborhoodService.getNeighborhoodsByCity(cityId);
          setNeighborhoods(neighborhoodsData);
        } catch (err) {
          console.log('Usando dados mockados para bairros');
          // Dados mockados para desenvolvimento
          const mockNeighborhoods = [
            { id: 1, name: 'Centro', cityId: parseInt(cityId) },
            { id: 2, name: 'Jardins', cityId: parseInt(cityId) },
            { id: 3, name: 'Pinheiros', cityId: parseInt(cityId) },
            { id: 4, name: 'Vila Madalena', cityId: parseInt(cityId) },
            { id: 5, name: 'Moema', cityId: parseInt(cityId) },
            { id: 6, name: 'Itaim Bibi', cityId: parseInt(cityId) },
            { id: 7, name: 'Consolação', cityId: parseInt(cityId) },
            { id: 8, name: 'Bela Vista', cityId: parseInt(cityId) },
          ];
          setNeighborhoods(mockNeighborhoods);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os dados. Por favor, tente novamente mais tarde.');
        setLoading(false);
        console.error('Erro ao buscar dados:', err);
      }
    };

    fetchData();
  }, [cityId]);

  const handleNeighborhoodSelect = (neighborhoodId) => {
    navigate(`/neighborhood/${neighborhoodId}`);
  };

  const handleBack = () => {
    navigate('/cities');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-4 flex items-center" 
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para cidades
      </Button>
      
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Bairros de {cityName}</CardTitle>
          <CardDescription className="text-center">
            Selecione um bairro para ver informações detalhadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Carregando bairros...</span>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : neighborhoods.length === 0 ? (
            <div className="text-center py-8">Nenhum bairro encontrado para esta cidade.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {neighborhoods.map((neighborhood) => (
                <Button
                  key={neighborhood.id}
                  variant="outline"
                  className="h-20 text-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleNeighborhoodSelect(neighborhood.id)}
                >
                  {neighborhood.name}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default NeighborhoodList;