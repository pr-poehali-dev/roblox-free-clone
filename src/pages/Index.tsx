import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

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

interface MarketItem {
  id: number;
  name: string;
  type: 'avatar' | 'skin' | 'accessory' | 'effect';
  price: number;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  owned: boolean;
}

interface DonatePackage {
  id: number;
  name: string;
  coins: number;
  bonus: number;
  popular?: boolean;
  image: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('games');
  const [coins, setCoins] = useState(2500);
  const [dailyStreak, setDailyStreak] = useState(3);

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

  const donatePackages: DonatePackage[] = [
    {
      id: 1,
      name: 'Стартовый',
      coins: 500,
      bonus: 0,
      image: '💰'
    },
    {
      id: 2,
      name: 'Популярный',
      coins: 1000,
      bonus: 200,
      popular: true,
      image: '💎'
    },
    {
      id: 3,
      name: 'Премиум',
      coins: 2500,
      bonus: 750,
      image: '👑'
    },
    {
      id: 4,
      name: 'Мега',
      coins: 5000,
      bonus: 2000,
      image: '🚀'
    }
  ];

  const [marketItems, setMarketItems] = useState<MarketItem[]>([
    {
      id: 1,
      name: 'Космический Шлем',
      type: 'accessory',
      price: 250,
      image: 'https://v3b.fal.media/files/b/monkey/cLC8znD5tVwcnq-Ns9mlI_output.png',
      rarity: 'rare',
      owned: false
    },
    {
      id: 2,
      name: 'Неоновый Аватар',
      type: 'avatar',
      price: 500,
      image: 'https://v3b.fal.media/files/b/monkey/cLC8znD5tVwcnq-Ns9mlI_output.png',
      rarity: 'epic',
      owned: false
    },
    {
      id: 3,
      name: 'Плащ Героя',
      type: 'skin',
      price: 350,
      image: 'https://v3b.fal.media/files/b/monkey/cLC8znD5tVwcnq-Ns9mlI_output.png',
      rarity: 'rare',
      owned: true
    },
    {
      id: 4,
      name: 'Огненный Эффект',
      type: 'effect',
      price: 750,
      image: 'https://v3b.fal.media/files/b/monkey/cLC8znD5tVwcnq-Ns9mlI_output.png',
      rarity: 'legendary',
      owned: false
    },
    {
      id: 5,
      name: 'Киберочки',
      type: 'accessory',
      price: 150,
      image: 'https://v3b.fal.media/files/b/monkey/cLC8znD5tVwcnq-Ns9mlI_output.png',
      rarity: 'common',
      owned: false
    },
    {
      id: 6,
      name: 'Драконий Аватар',
      type: 'avatar',
      price: 1000,
      image: 'https://v3b.fal.media/files/b/monkey/cLC8znD5tVwcnq-Ns9mlI_output.png',
      rarity: 'legendary',
      owned: false
    }
  ]);

  const playerStats = {
    name: 'ProGamer2024',
    level: 24,
    totalGames: 156,
    hoursPlayed: 342,
    achievements: 28,
    friends: 47
  };

  const rarityColors = {
    common: 'bg-gray-500',
    rare: 'bg-blue-500',
    epic: 'bg-purple-500',
    legendary: 'bg-gradient-to-r from-yellow-400 to-orange-500'
  };

  const rarityLabels = {
    common: 'Обычный',
    rare: 'Редкий',
    epic: 'Эпический',
    legendary: 'Легендарный'
  };

  const handleClaimDaily = () => {
    const reward = 100 + dailyStreak * 50;
    setCoins(coins + reward);
    setDailyStreak(dailyStreak + 1);
    toast.success(`🎁 Получено ${reward} FreeCoins! Серия: ${dailyStreak + 1} дней`);
  };

  const handleGetDonate = (pkg: DonatePackage) => {
    const totalCoins = pkg.coins + pkg.bonus;
    setCoins(coins + totalCoins);
    toast.success(`🎉 Получено ${totalCoins} FreeCoins бесплатно!`);
  };

  const handleBuyItem = (item: MarketItem) => {
    if (item.owned) {
      toast.info('У вас уже есть этот предмет!');
      return;
    }
    if (coins < item.price) {
      toast.error('Недостаточно FreeCoins!');
      return;
    }
    setCoins(coins - item.price);
    setMarketItems(marketItems.map(i => i.id === item.id ? { ...i, owned: true } : i));
    toast.success(`✨ Куплено: ${item.name}!`);
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
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-4 py-2 text-base font-bold">
                <Icon name="Coins" className="mr-2" size={18} />
                {coins.toLocaleString()}
              </Badge>
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
            <TabsTrigger value="market" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="ShoppingBag" className="mr-2" size={18} />
              Маркетплейс
            </TabsTrigger>
            <TabsTrigger value="donate" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Icon name="Gift" className="mr-2" size={18} />
              Донат
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

          <TabsContent value="market" className="space-y-6">
            <Card className="border-2 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-2">🛍️ Маркетплейс</h2>
                <p className="text-lg opacity-90">Покупай крутые вещи за FreeCoins!</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketItems.map((item) => (
                <Card key={item.id} className="overflow-hidden border-2 rounded-3xl hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                    <Badge className={`absolute top-4 right-4 ${rarityColors[item.rarity]} text-white border-0`}>
                      {rarityLabels[item.rarity]}
                    </Badge>
                    {item.owned && (
                      <Badge className="absolute top-4 left-4 bg-green-500 text-white border-0">
                        <Icon name="Check" className="mr-1" size={14} />
                        В инвентаре
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4 capitalize">{item.type === 'avatar' ? 'Аватар' : item.type === 'skin' ? 'Скин' : item.type === 'accessory' ? 'Аксессуар' : 'Эффект'}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-yellow-500 font-bold text-lg">
                        <Icon name="Coins" size={20} />
                        {item.price}
                      </div>
                    </div>
                    <Button 
                      className="w-full rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      onClick={() => handleBuyItem(item)}
                      disabled={item.owned}
                    >
                      {item.owned ? (
                        <>
                          <Icon name="Check" className="mr-2" size={18} />
                          Куплено
                        </>
                      ) : (
                        <>
                          <Icon name="ShoppingCart" className="mr-2" size={18} />
                          Купить
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="donate" className="space-y-6">
            <Card className="border-2 rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-6xl">🎁</div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Ежедневная Награда</h2>
                    <p className="text-lg opacity-90">Серия: {dailyStreak} дней подряд</p>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="bg-white text-orange-500 hover:bg-white/90 rounded-full font-bold"
                  onClick={handleClaimDaily}
                >
                  Забрать {100 + dailyStreak * 50} FreeCoins
                  <Icon name="Gift" className="ml-2" size={20} />
                </Button>
              </div>
            </Card>

            <div>
              <h3 className="text-2xl font-bold mb-6">💎 Бесплатный Донат</h3>
              <p className="text-muted-foreground mb-6">Получи валюту абсолютно бесплатно! Никаких платежей!</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {donatePackages.map((pkg) => (
                  <Card key={pkg.id} className={`overflow-hidden rounded-3xl border-2 transition-all duration-300 ${pkg.popular ? 'border-primary shadow-xl scale-105' : 'hover:shadow-xl'}`}>
                    {pkg.popular && (
                      <div className="bg-gradient-to-r from-primary to-secondary text-white text-center py-2 font-bold text-sm">
                        ⭐ ПОПУЛЯРНЫЙ
                      </div>
                    )}
                    <CardContent className="p-6 text-center">
                      <div className="text-6xl mb-4">{pkg.image}</div>
                      <h4 className="font-bold text-xl mb-2">{pkg.name}</h4>
                      <div className="text-3xl font-bold mb-2 text-yellow-500">
                        {pkg.coins.toLocaleString()}
                      </div>
                      {pkg.bonus > 0 && (
                        <Badge className="mb-4 bg-green-500 text-white border-0">
                          +{pkg.bonus} бонус
                        </Badge>
                      )}
                      <div className="text-sm text-muted-foreground mb-4">
                        Итого: {(pkg.coins + pkg.bonus).toLocaleString()} FreeCoins
                      </div>
                      <Button 
                        className="w-full rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                        onClick={() => handleGetDonate(pkg)}
                      >
                        Получить бесплатно
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

            <Card className="border-2 rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Package" size={24} />
                  Мой инвентарь
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {marketItems.filter(item => item.owned).map((item) => (
                    <div key={item.id} className="border-2 rounded-2xl p-4 text-center">
                      <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded-xl mb-2" />
                      <p className="font-semibold text-sm">{item.name}</p>
                      <Badge className={`mt-2 ${rarityColors[item.rarity]} text-white border-0 text-xs`}>
                        {rarityLabels[item.rarity]}
                      </Badge>
                    </div>
                  ))}
                  {marketItems.filter(item => item.owned).length === 0 && (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      <Icon name="Package" className="mx-auto mb-2" size={48} />
                      <p>Инвентарь пуст. Купите вещи в маркетплейсе!</p>
                    </div>
                  )}
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
