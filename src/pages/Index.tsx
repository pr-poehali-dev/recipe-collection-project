import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Recipe {
  id: number;
  title: string;
  image: string;
  time: string;
  difficulty: string;
  category: string;
  rating: number;
  reviews: number;
}

interface Comment {
  id: number;
  author: string;
  text: string;
  rating: number;
  date: string;
}

const categories = [
  { name: 'Завтраки', icon: 'Coffee', color: 'bg-primary' },
  { name: 'Обеды', icon: 'UtensilsCrossed', color: 'bg-secondary' },
  { name: 'Ужины', icon: 'Moon', color: 'bg-accent' },
  { name: 'Десерты', icon: 'IceCream', color: 'bg-success' },
];

const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Паста Карбонара',
    image: 'https://cdn.poehali.dev/projects/ce571beb-9438-4dcf-bc78-ed5494acb65b/files/a480fd5f-e954-4acb-9cb8-8a6e8b2f7063.jpg',
    time: '30 мин',
    difficulty: 'Средний',
    category: 'Обеды',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    title: 'Тако с Курицей',
    image: 'https://cdn.poehali.dev/projects/ce571beb-9438-4dcf-bc78-ed5494acb65b/files/2120df87-fd27-4d6d-b0ba-74268de60c1d.jpg',
    time: '25 мин',
    difficulty: 'Легкий',
    category: 'Ужины',
    rating: 4.6,
    reviews: 98,
  },
  {
    id: 3,
    title: 'Шоколадный Брауни',
    image: 'https://cdn.poehali.dev/projects/ce571beb-9438-4dcf-bc78-ed5494acb65b/files/8cdf93fe-05f5-4f40-b1a1-e2a798997480.jpg',
    time: '45 мин',
    difficulty: 'Средний',
    category: 'Десерты',
    rating: 4.9,
    reviews: 156,
  },
];

const Index = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: 'Анна К.',
      text: 'Потрясающий рецепт! Получилось очень вкусно, вся семья в восторге!',
      rating: 5,
      date: '2 дня назад',
    },
    {
      id: 2,
      author: 'Дмитрий С.',
      text: 'Готовил впервые, все понятно и просто. Спасибо за подробное описание!',
      rating: 4,
      date: '5 дней назад',
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      author: 'Вы',
      text: newComment,
      rating: newRating,
      date: 'Только что',
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setNewRating(5);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedRecipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        <div className="max-w-6xl mx-auto p-6">
          <Button
            variant="ghost"
            onClick={() => setSelectedRecipe(null)}
            className="mb-6 hover:bg-white/50"
          >
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            Назад к рецептам
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 animate-fade-in">
            <div>
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
              />
            </div>

            <div>
              <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                {selectedRecipe.title}
              </h1>

              <div className="flex gap-4 mb-6 flex-wrap">
                <Badge className="bg-primary text-lg py-2 px-4">
                  <Icon name="Clock" className="mr-2" size={18} />
                  {selectedRecipe.time}
                </Badge>
                <Badge className="bg-secondary text-lg py-2 px-4">
                  <Icon name="ChefHat" className="mr-2" size={18} />
                  {selectedRecipe.difficulty}
                </Badge>
                <Badge className="bg-accent text-lg py-2 px-4">
                  <Icon name="Star" className="mr-2" size={18} />
                  {selectedRecipe.rating}
                </Badge>
              </div>

              <Card className="mb-6 border-2 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <Icon name="ShoppingCart" className="mr-3" size={24} />
                    Ингредиенты
                  </h3>
                  <ul className="space-y-2 text-lg">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Спагетти — 400 г
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Бекон — 200 г
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Яйца — 4 шт
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Пармезан — 100 г
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Черный перец — по вкусу
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <Icon name="List" className="mr-3" size={24} />
                    Приготовление
                  </h3>
                  <ol className="space-y-4 text-lg">
                    <li className="flex">
                      <span className="font-bold text-primary mr-3 text-xl">1.</span>
                      <span>Отварите спагетти в подсоленной воде до состояния аль денте</span>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-primary mr-3 text-xl">2.</span>
                      <span>Обжарьте бекон до хрустящей корочки на среднем огне</span>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-primary mr-3 text-xl">3.</span>
                      <span>Взбейте яйца с тертым пармезаном и черным перцем</span>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-primary mr-3 text-xl">4.</span>
                      <span>Смешайте горячие спагетти с беконом и яичной смесью</span>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-primary mr-3 text-xl">5.</span>
                      <span>Подавайте сразу же, посыпав дополнительным пармезаном</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-5xl font-black mb-8 flex items-center">
              <Icon name="MessageCircle" className="mr-4" size={40} />
              Отзывы ({comments.length})
            </h2>

            <Card className="mb-8 border-2 shadow-lg bg-white/80 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Оставьте свой отзыв</h3>

                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Ваша оценка</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Icon
                          name="Star"
                          size={32}
                          className={
                            star <= newRating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <Textarea
                  placeholder="Поделитесь своим впечатлением о рецепте..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-4 min-h-24 text-base border-2"
                />

                <Button
                  onClick={handleAddComment}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold text-lg px-8 py-6"
                >
                  <Icon name="Send" className="mr-2" size={20} />
                  Отправить отзыв
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {comments.map((comment, index) => (
                <Card
                  key={comment.id}
                  className="border-2 shadow-md hover:shadow-xl transition-shadow animate-fade-in bg-white/80 backdrop-blur"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12 bg-gradient-to-br from-primary to-accent">
                        <AvatarFallback className="text-white font-bold">
                          {comment.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-bold text-lg">{comment.author}</p>
                            <p className="text-sm text-muted-foreground">{comment.date}</p>
                          </div>
                          <div className="flex">
                            {Array.from({ length: comment.rating }).map((_, i) => (
                              <Icon
                                key={i}
                                name="Star"
                                size={18}
                                className="fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-base leading-relaxed">{comment.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-6xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Вкусные Рецепты
            </h1>
            <Button variant="ghost" size="icon" className="hover:bg-white/50">
              <Icon name="Menu" size={32} />
            </Button>
          </div>

          <div className="relative max-w-2xl">
            <Icon
              name="Search"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={24}
            />
            <Input
              placeholder="Найти рецепт..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 h-14 text-lg border-2 rounded-2xl shadow-sm"
            />
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
        <div className="bg-gradient-to-r from-primary via-accent to-secondary rounded-3xl p-12 text-white shadow-2xl mb-16">
          <h2 className="text-7xl font-black mb-6">
            Кулинарные шедевры каждый день! 🍳
          </h2>
          <p className="text-2xl mb-8 opacity-90 max-w-3xl">
            Тысячи проверенных рецептов с пошаговыми инструкциями. Готовьте легко и вкусно!
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-bold text-xl px-10 py-7 rounded-2xl shadow-lg"
          >
            <Icon name="Sparkles" className="mr-3" size={24} />
            Начать готовить
          </Button>
        </div>

        <h2 className="text-5xl font-black mb-8 flex items-center">
          <Icon name="Tag" className="mr-4" size={40} />
          Категории
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <Card
              key={category.name}
              className={`${category.color} text-white border-0 shadow-xl hover:scale-105 transition-transform cursor-pointer animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <Icon name={category.icon} size={56} className="mx-auto mb-4" />
                <h3 className="text-3xl font-bold">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-5xl font-black mb-8 flex items-center">
          <Icon name="TrendingUp" className="mr-4" size={40} />
          Популярные рецепты
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe, index) => (
            <Card
              key={recipe.id}
              className="overflow-hidden border-2 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer animate-fade-in bg-white"
              style={{ animationDelay: `${index * 0.15}s` }}
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-transform hover:scale-110"
                />
                <Badge className="absolute top-4 right-4 bg-white text-foreground font-bold text-base py-2 px-4">
                  {recipe.category}
                </Badge>
              </div>

              <CardContent className="p-6">
                <h3 className="text-3xl font-bold mb-4">{recipe.title}</h3>

                <div className="flex gap-4 mb-4 flex-wrap">
                  <div className="flex items-center text-muted-foreground">
                    <Icon name="Clock" className="mr-2" size={18} />
                    <span className="font-semibold">{recipe.time}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Icon name="ChefHat" className="mr-2" size={18} />
                    <span className="font-semibold">{recipe.difficulty}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t-2">
                  <div className="flex items-center">
                    <Icon name="Star" className="fill-yellow-400 text-yellow-400 mr-2" size={20} />
                    <span className="font-bold text-xl">{recipe.rating}</span>
                    <span className="text-muted-foreground ml-2">({recipe.reviews})</span>
                  </div>
                  <Icon name="ArrowRight" size={24} className="text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-16">
            <Icon name="Search" size={64} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-2xl text-muted-foreground font-semibold">
              Рецепты не найдены. Попробуйте другой запрос.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
