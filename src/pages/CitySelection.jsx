import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cityService } from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Loader2 } from 'lucide-react';

function CitySelection() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesData = await cityService.getAllCities();
        setCities(citiesData);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar as cidades. Por favor, tente novamente mais tarde.');
        setLoading(false);
        console.error('Erro ao buscar cidades:', err);
      }
    };

    fetchCities();
  }, []);

  const handleCitySelect = (cityId) => {
    navigate(`/neighborhoods/${cityId}`);
  };

  // Dados mockados para desenvolvimento enquanto o backend não está disponível
  const mockCities = [
    { id: 1, name: 'São Paulo' },
    { id: 2, name: 'Rio de Janeiro' },
    { id: 3, name: 'Belo Horizonte' },
    { id: 4, name: 'Salvador' },
    { id: 5, name: 'Brasília' },
    { id: 6, name: 'Fortaleza' },
    { id: 7, name: 'Recife' },
    { id: 8, name: 'Porto Alegre' },
    { id: 9, name: 'Curitiba' },
    { id: 10, name: 'Manaus' },
  ];

  // Usar dados mockados para desenvolvimento
  const displayCities = cities.length > 0 ? cities : mockCities;

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Selecione uma Cidade</CardTitle>
          <CardDescription className="text-center">
            Escolha uma cidade para ver os bairros disponíveis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Carregando cidades...</span>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayCities.map((city) => (
                <Button
                  key={city.id}
                  variant="outline"
                  className="h-24 text-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleCitySelect(city.id)}
                >
                  {city.name}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CitySelection;