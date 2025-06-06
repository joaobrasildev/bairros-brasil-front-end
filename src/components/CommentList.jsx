import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

function CommentList({ comments = [] }) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Ainda não há comentários para esta categoria. Seja o primeiro a compartilhar sua experiência!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Card key={comment.id} className="border border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={comment.user?.avatar} alt={comment.user?.name} />
                <AvatarFallback>{comment.user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium">{comment.user?.name || 'Usuário'}</h4>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default CommentList;