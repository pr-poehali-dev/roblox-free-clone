import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Game {
  id: number;
  title: string;
  author: string;
  image: string;
  rating: number;
  plays: number;
  category: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('games');

  const games: Game[] = [
    {
      id: 1,
      title: 'Космическая Одиссея',
      author: 'StarDev',
      image: 'https://v3b.fal.media/files/b/monkey/cLC8znD5tVwcnq-Ns9mlI_output.png',
      rating: 4.8,
      plays: 125400,
      category: 'Приключения'
    },
    {
      id: 2,
      title: 'Гонки Будущего',
      author: 'RaceMaster',
      image: 'https://v3b.fal.media/files/b/monkey/cLC8znD5tVwcnq-Ns9mlI_output.png',
      rating: 4.6,
      plays: 98200,
      category: 'Гонки'
    },
    {
      id: 3,
      title: 'Битва Героев',
      author: 'BattleStudio',
      image: 'https://v3b.fal.media/files/b/monkey/cLC8znD5tVwcnq-Ns9mlI_output.png',
      rating: 4.9,
      plays: 156800,
      category: 'Экшен'
    },
    {
      id: 4,
      title: 'Лабиринт Загадок',
      author: 'PuzzlePro',
      image: 'https://v3b.fal.media/files/b/monkey/cLC8znD5tVwcnq-Ns9mlI_output.png',
      rating: 4.7,
      plays: 82300,
      category: 'Головоломки'
    },
    {
      id: 5,
      title: 'Мир Строителей',
      author: 'BuildTeam',
      image: 'https://v3b.fal.media/files/b/monkey/cLC8znD5tVwcnq-Ns9mlI_output.png',
      rating: 4.8,
      plays: 201500,
      category: 'Строительство'
    },
    {
      id: 6,
      title: 'Квест Драконов',
      author: 'DragonForge',
      image: 'https://v3b.fal.media/files/b/monkey/cLC8znD5tVwcnq-Ns9mlI_output.png',
      rating: 4.9,
      plays: 178900,
      category: 'РПГ'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 1,
      title: 'Первый Запуск',
      description: 'Запустите первую игру',
      icon: 'Rocket',
      unlocked: true,
      progress: 100
    },
    {
      id: 2,
      title: 'Игровой Марафон',
      description: 'Сыграйте 10 часов',
      icon: 'Trophy',
      unlocked: true,
      progress: 100
    },
    {
      id: 3,
      title: 'Коллекционер',
      description: 'Добавьте 20 игр в избранное',
      icon: 'Star',
      unlocked: false,
      progress: 65
    },
    {
      id: 4,
      title: 'Социальная Звезда',
      description: 'Пригласите 5 друзей',
      icon: 'Users',
      unlocked: false,
      progress: 40
    }
  ];

  const playerStats = {
    name: 'ProGamer2024',
    level: 24,
    totalGames: 156,
    hoursPlayed: 342,
    achievements: 28,
    friends: 47
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Gamepad2" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FreePlay
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" className="font-medium">
                <Icon name="Home" className="mr-2" size={18} />
                Главная
              </Button>
              <Button variant="ghost" className="font-medium">
                <Icon name="Compass" className="mr-2" size={18} />
                Обзор
              </Button>
              <Button variant="ghost" className="font-medium">
                <Icon name="Library" className="mr-2" size={18} />
                Библиотека
              </Button>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="rounded-full">
                <Icon name="Bell" size={20} />
              </Button>
              <Avatar className="border-2 border-primary cursor-pointer">
                <AvatarImage src="https://v3b.fal.media/files/b/monkey/cLC8znD5tVwcnq-Ns9mlI_output.png" />
                <AvatarFallback>PG</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 bg-white p-1 rounded-2xl shadow-sm">
            <TabsTrigger value="games" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Gamepad2" className="mr-2" size={18} />
              Игры
            </TabsTrigger>
            <TabsTrigger value="profile" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="User" className="mr-2" size={18} />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="games" className="space-y-6">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 text-white shadow-xl">
              <div className="max-w-2xl">
                <Badge className="mb-4 bg-white/20 hover:bg-white/30 text-white border-0">
                  🎮 Все игры бесплатно
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Играй без границ!
                </h2>
                <p className="text-lg opacity-90 mb-6">
                  Тысячи бесплатных игр. Никаких покупок. Никаких подписок. Только веселье!
                </p>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full font-semibold">
                  Начать играть
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">🔥 Популярные игры</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map((game) => (
                  <Card key={game.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary rounded-3xl">
                    <div className="relative overflow-hidden">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-white/90 text-foreground hover:bg-white">
                        {game.category}
                      </Badge>
                    </div>
                    <CardContent className="p-5">
                      <h4 className="font-bold text-lg mb-1">{game.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">by {game.author}</p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Icon name="Star" size={16} fill="currentColor" />
                          <span className="text-sm font-semibold text-foreground">{game.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Icon name="Users" size={16} />
                          <span className="text-sm">{(game.plays / 1000).toFixed(1)}k</span>
                        </div>
                      </div>
                      <Button className="w-full rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        <Icon name="Play" className="mr-2" size={18} />
                        Играть
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border-2 rounded-3xl overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
              <CardContent className="relative px-6 pb-6">
                <Avatar className="absolute -top-16 left-6 w-32 h-32 border-4 border-white">
                  <AvatarImage src="https://v3b.fal.media/files/b/monkey/cLC8znD5tVwcnq-Ns9mlI_output.png" />
                  <AvatarFallback>PG</AvatarFallback>
                </Avatar>
                <div className="pt-20">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{playerStats.name}</h2>
                      <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                        Уровень {playerStats.level}
                      </Badge>
                    </div>
                    <Button className="rounded-full">
                      <Icon name="Settings" className="mr-2" size={18} />
                      Настройки
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-muted rounded-2xl p-4 text-center">
                      <Icon name="Gamepad2" className="mx-auto mb-2 text-primary" size={24} />
                      <div className="text-2xl font-bold">{playerStats.totalGames}</div>
                      <div className="text-sm text-muted-foreground">Игр сыграно</div>
                    </div>
                    <div className="bg-muted rounded-2xl p-4 text-center">
                      <Icon name="Clock" className="mx-auto mb-2 text-primary" size={24} />
                      <div className="text-2xl font-bold">{playerStats.hoursPlayed}</div>
                      <div className="text-sm text-muted-foreground">Часов в игре</div>
                    </div>
                    <div className="bg-muted rounded-2xl p-4 text-center">
                      <Icon name="Trophy" className="mx-auto mb-2 text-primary" size={24} />
                      <div className="text-2xl font-bold">{playerStats.achievements}</div>
                      <div className="text-sm text-muted-foreground">Достижений</div>
                    </div>
                    <div className="bg-muted rounded-2xl p-4 text-center">
                      <Icon name="Users" className="mx-auto mb-2 text-primary" size={24} />
                      <div className="text-2xl font-bold">{playerStats.friends}</div>
                      <div className="text-sm text-muted-foreground">Друзей</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h3 className="text-2xl font-bold mb-6">🏆 Достижения</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className={`rounded-2xl border-2 ${achievement.unlocked ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${achievement.unlocked ? 'bg-gradient-to-br from-primary to-secondary' : 'bg-muted'}`}>
                          <Icon 
                            name={achievement.icon as any} 
                            className={achievement.unlocked ? 'text-white' : 'text-muted-foreground'} 
                            size={24} 
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold mb-1">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                          <div className="space-y-2">
                            <Progress value={achievement.progress} className="h-2" />
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">{achievement.progress}%</span>
                              {achievement.unlocked && (
                                <span className="text-primary font-semibold">Получено!</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
