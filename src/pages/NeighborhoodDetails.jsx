import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Loader2, ArrowLeft, Plus } from 'lucide-react';
import { commentService } from '../services/api';
import CommentList from '../components/CommentList';
import AddCommentDialog from '../components/AddCommentDialog';

const CATEGORIES = [
  'Comércio',
  'Custo de Vida',
  'Educação',
  'Empregabilidade',
  'Infraestrutura',
  'Lazer',
  'Saúde',
  'Segurança',
  'Transporte',
  'Geral',
];

function NeighborhoodDetails() {
  const { neighborhoodId } = useParams();
  const navigate = useNavigate();
  const [neighborhood, setNeighborhood] = useState(null);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Geral');
  const [isAddCommentOpen, setIsAddCommentOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dados mockados para o MVP
        const mockNeighborhood = {
          id: parseInt(neighborhoodId),
          name: `Bairro ${neighborhoodId}`,
          cityId: 1,
          cityName: 'São Paulo',
        };
        setNeighborhood(mockNeighborhood);

        // Tentar buscar comentários do backend
        try {
          const commentsData = await commentService.getCommentsByNeighborhood(neighborhoodId);
          
          // Organizar comentários por categoria
          const commentsByCategory = {};
          CATEGORIES.forEach(category => {
            commentsByCategory[category] = commentsData.filter(
              comment => comment.category === category
            );
          });
          
          setComments(commentsByCategory);
        } catch (err) {
          console.log('Usando dados mockados para comentários');
          // Dados mockados para o MVP
          const mockComments = {};
          CATEGORIES.forEach(category => {
            // Gerar entre 0 e 3 comentários mockados por categoria
            const count = Math.floor(Math.random() * 4);
            mockComments[category] = Array.from({ length: count }, (_, i) => ({
              id: `${category}-${i}`,
              content: `Este é um comentário mockado sobre ${category.toLowerCase()} no bairro.`,
              category,
              createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
              user: {
                name: `Usuário ${i + 1}`,
                avatar: null,
              },
            }));
          });
          setComments(mockComments);
        }

        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os dados. Por favor, tente novamente mais tarde.');
        setLoading(false);
        console.error('Erro ao buscar dados:', err);
      }
    };

    fetchData();
  }, [neighborhoodId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddComment = async (commentData) => {
    try {
      // Em uma implementação real, enviaríamos para o backend
      // await commentService.addComment({
      //   ...commentData,
      //   neighborhoodId,
      // });
      
      // Para o MVP, apenas adicionamos localmente
      const newComment = {
        id: `new-${Date.now()}`,
        content: commentData.content,
        category: commentData.category,
        createdAt: new Date().toISOString(),
        user: {
          name: 'Você',
          avatar: null,
        },
      };
      
      setComments(prev => ({
        ...prev,
        [commentData.category]: [newComment, ...(prev[commentData.category] || [])],
      }));
      
      return true;
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Carregando informações do bairro...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-4 flex items-center" 
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>
      
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {neighborhood?.name}
          </CardTitle>
          <CardDescription className="text-center">
            {neighborhood?.cityName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 mb-8">
              {CATEGORIES.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs md:text-sm">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {CATEGORIES.map((category) => (
              <TabsContent key={category} value={category} className="relative">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">{category}</h3>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex items-center"
                    onClick={() => setIsAddCommentOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Adicionar
                  </Button>
                </div>
                
                <CommentList comments={comments[category] || []} />
                
                <AddCommentDialog 
                  isOpen={isAddCommentOpen} 
                  onClose={() => setIsAddCommentOpen(false)}
                  onSubmit={handleAddComment}
                  category={activeTab}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default NeighborhoodDetails;