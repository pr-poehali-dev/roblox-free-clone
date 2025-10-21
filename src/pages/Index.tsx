import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface ClothingItem {
  id: number;
  name: string;
  type: 'shirt' | 'pants' | 'hat' | 'shoes' | 'accessory';
  price: number;
  image: string;
  color: string;
  owned: boolean;
}

interface RobuxPackage {
  id: number;
  name: string;
  amount: number;
  bonus: number;
  icon: string;
  popular?: boolean;
}

interface LeaderboardPlayer {
  id: number;
  username: string;
  robux: number;
  level: number;
  avatar: string;
}

interface User {
  username: string;
  robux: number;
  level: number;
  dailyStreak: number;
}

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('shop');
  const [selectedClothing, setSelectedClothing] = useState<{
    shirt?: ClothingItem;
    pants?: ClothingItem;
    hat?: ClothingItem;
    shoes?: ClothingItem;
  }>({});

  const [user, setUser] = useState<User>({
    username: 'Player2024',
    robux: 1000,
    level: 15,
    dailyStreak: 3
  });

  const robuxPackages: RobuxPackage[] = [
    { id: 1, name: 'Стартовый', amount: 500, bonus: 0, icon: '💰' },
    { id: 2, name: 'Средний', amount: 5000, bonus: 1000, icon: '💎' },
    { id: 3, name: 'Большой', amount: 50000, bonus: 15000, icon: '👑', popular: true },
    { id: 4, name: 'Мега', amount: 500000, bonus: 200000, icon: '🚀' },
    { id: 5, name: 'Гига', amount: 5000000, bonus: 2000000, icon: '⭐' },
    { id: 6, name: 'Ультра', amount: 50000000, bonus: 25000000, icon: '🔥' },
    { id: 7, name: 'Максимум', amount: 500000000, bonus: 100000000, icon: '💫' }
  ];

  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([
    { id: 1, name: 'Красная Футболка', type: 'shirt', price: 100, image: '👕', color: '#ef4444', owned: false },
    { id: 2, name: 'Синяя Футболка', type: 'shirt', price: 100, image: '👕', color: '#3b82f6', owned: false },
    { id: 3, name: 'Зелёная Футболка', type: 'shirt', price: 100, image: '👕', color: '#22c55e', owned: true },
    { id: 4, name: 'Чёрные Джинсы', type: 'pants', price: 150, image: '👖', color: '#1f2937', owned: false },
    { id: 5, name: 'Синие Джинсы', type: 'pants', price: 150, image: '👖', color: '#3b82f6', owned: true },
    { id: 6, name: 'Белые Штаны', type: 'pants', price: 150, image: '👖', color: '#f3f4f6', owned: false },
    { id: 7, name: 'Красная Кепка', type: 'hat', price: 200, image: '🧢', color: '#ef4444', owned: false },
    { id: 8, name: 'Синяя Кепка', type: 'hat', price: 200, image: '🧢', color: '#3b82f6', owned: false },
    { id: 9, name: 'Корона', type: 'hat', price: 5000, image: '👑', color: '#fbbf24', owned: false },
    { id: 10, name: 'Кроссовки', type: 'shoes', price: 250, image: '👟', color: '#ffffff', owned: true },
    { id: 11, name: 'Ботинки', type: 'shoes', price: 300, image: '👞', color: '#78350f', owned: false },
    { id: 12, name: 'Очки', type: 'accessory', price: 500, image: '🕶️', color: '#000000', owned: false }
  ]);

  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>([
    { id: 1, username: 'RobloxKing', robux: 999999999, level: 100, avatar: '👑' },
    { id: 2, username: 'MegaBuilder', robux: 500000000, level: 85, avatar: '🚀' },
    { id: 3, username: 'ProGamer2024', robux: 250000000, level: 75, avatar: '⭐' },
    { id: 4, username: 'DiamondPlayer', robux: 100000000, level: 60, avatar: '💎' },
    { id: 5, username: 'CoolDude', robux: 50000000, level: 50, avatar: '😎' },
    { id: 6, username: 'SpeedRunner', robux: 25000000, level: 45, avatar: '⚡' },
    { id: 7, username: 'NinjaGamer', robux: 10000000, level: 40, avatar: '🥷' },
    { id: 8, username: user.username, robux: user.robux, level: user.level, avatar: '🎮' }
  ]);

  const handleLogin = () => {
    if (username.length >= 3 && password.length >= 4) {
      setUser({ ...user, username });
      setIsLoggedIn(true);
      toast.success(`Добро пожаловать, ${username}! 🎉`);
    } else {
      toast.error('Логин должен быть от 3 символов, пароль от 4');
    }
  };

  const handleRegister = () => {
    if (username.length >= 3 && password.length >= 4) {
      setUser({ ...user, username, robux: 10000 });
      setIsLoggedIn(true);
      toast.success(`Регистрация успешна! Получено 10,000 Robux! 🎁`);
    } else {
      toast.error('Логин должен быть от 3 символов, пароль от 4');
    }
  };

  const handleClaimDaily = () => {
    const reward = Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000;
    setUser({ ...user, robux: user.robux + reward, dailyStreak: user.dailyStreak + 1 });
    toast.success(`🎁 Получено ${reward.toLocaleString()} Robux! Серия: ${user.dailyStreak + 1} дней`);
    
    updateLeaderboard(user.robux + reward);
  };

  const handleGetRobux = (pkg: RobuxPackage) => {
    const total = pkg.amount + pkg.bonus;
    setUser({ ...user, robux: user.robux + total });
    toast.success(`💎 Получено ${total.toLocaleString()} Robux бесплатно!`);
    
    updateLeaderboard(user.robux + total);
  };

  const handleBuyClothing = (item: ClothingItem) => {
    if (item.owned) {
      toast.info('У вас уже есть этот предмет!');
      return;
    }
    if (user.robux < item.price) {
      toast.error('Недостаточно Robux!');
      return;
    }
    
    setUser({ ...user, robux: user.robux - item.price });
    setClothingItems(clothingItems.map(i => i.id === item.id ? { ...i, owned: true } : i));
    toast.success(`✨ Куплено: ${item.name}!`);
  };

  const handleEquipClothing = (item: ClothingItem) => {
    if (!item.owned) {
      toast.error('Сначала купите этот предмет!');
      return;
    }
    
    setSelectedClothing({ ...selectedClothing, [item.type]: item });
    toast.success(`Надето: ${item.name}`);
  };

  const updateLeaderboard = (newRobux: number) => {
    const newLeaderboard = leaderboard.map(p => 
      p.username === user.username ? { ...p, robux: newRobux } : p
    ).sort((a, b) => b.robux - a.robux);
    
    setLeaderboard(newLeaderboard);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-4 border-white shadow-2xl rounded-3xl">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl">🎮</span>
              </div>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ROBLOX
            </CardTitle>
            <p className="text-muted-foreground">Бесплатные Robux ждут тебя!</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={showLogin ? 'login' : 'register'} onValueChange={(v) => setShowLogin(v === 'login')}>
              <div className="grid grid-cols-2 gap-2 mb-6 bg-muted p-1 rounded-xl">
                <Button 
                  variant={showLogin ? 'default' : 'ghost'}
                  onClick={() => setShowLogin(true)}
                  className="rounded-lg"
                >
                  Вход
                </Button>
                <Button 
                  variant={!showLogin ? 'default' : 'ghost'}
                  onClick={() => setShowLogin(false)}
                  className="rounded-lg"
                >
                  Регистрация
                </Button>
              </div>
              
              {showLogin ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username">Логин</Label>
                    <Input 
                      id="username" 
                      placeholder="Введите логин" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Пароль</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Введите пароль"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-bold py-6 text-lg rounded-full"
                    onClick={handleLogin}
                  >
                    Войти
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="new-username">Логин</Label>
                    <Input 
                      id="new-username" 
                      placeholder="Придумайте логин" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password">Пароль</Label>
                    <Input 
                      id="new-password" 
                      type="password" 
                      placeholder="Придумайте пароль"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Badge className="w-full justify-center py-2 bg-green-500 text-white border-0">
                    🎁 Бонус: 10,000 Robux при регистрации!
                  </Badge>
                  <Button 
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:opacity-90 text-white font-bold py-6 text-lg rounded-full"
                    onClick={handleRegister}
                  >
                    Зарегистрироваться
                  </Button>
                </div>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
                <span className="text-2xl">🎮</span>
              </div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ROBLOX
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-6 py-3 text-lg font-bold shadow-lg">
                <Icon name="Coins" className="mr-2" size={20} />
                {user.robux.toLocaleString()} R$
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2">
                Ур. {user.level}
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setIsLoggedIn(false);
                  toast.info('Вы вышли из аккаунта');
                }}
              >
                Выход
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-8 bg-white p-1 rounded-2xl shadow-md grid grid-cols-5 gap-1 max-w-4xl mx-auto">
            <Button
              variant={activeTab === 'shop' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('shop')}
              className="rounded-xl flex items-center justify-center gap-2"
            >
              <Icon name="ShoppingBag" size={18} />
              <span className="hidden sm:inline">Магазин</span>
            </Button>
            <Button
              variant={activeTab === 'avatar' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('avatar')}
              className="rounded-xl flex items-center justify-center gap-2"
            >
              <Icon name="User" size={18} />
              <span className="hidden sm:inline">Персонаж</span>
            </Button>
            <Button
              variant={activeTab === 'robux' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('robux')}
              className="rounded-xl flex items-center justify-center gap-2"
            >
              <Icon name="Coins" size={18} />
              <span className="hidden sm:inline">Robux</span>
            </Button>
            <Button
              variant={activeTab === 'leaderboard' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('leaderboard')}
              className="rounded-xl flex items-center justify-center gap-2"
            >
              <Icon name="Trophy" size={18} />
              <span className="hidden sm:inline">Лидеры</span>
            </Button>
            <Button
              variant={activeTab === 'profile' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('profile')}
              className="rounded-xl flex items-center justify-center gap-2"
            >
              <Icon name="Settings" size={18} />
              <span className="hidden sm:inline">Профиль</span>
            </Button>
          </div>

          <TabsContent value="shop" className="space-y-6">
            <Card className="border-4 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-4xl font-black mb-2">🛍️ Магазин Одежды</h2>
                <p className="text-xl opacity-90">Создай уникальный образ для своего персонажа!</p>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {['shirt', 'pants', 'hat', 'shoes', 'accessory'].map((type) => (
                <div key={type}>
                  <h3 className="text-2xl font-bold mb-4 capitalize">
                    {type === 'shirt' ? '👕 Футболки' : 
                     type === 'pants' ? '👖 Штаны' : 
                     type === 'hat' ? '🧢 Головные уборы' : 
                     type === 'shoes' ? '👟 Обувь' : 
                     '✨ Аксессуары'}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {clothingItems.filter(item => item.type === type).map((item) => (
                      <Card key={item.id} className="border-2 rounded-2xl hover:shadow-xl transition-all">
                        <CardContent className="p-4 text-center">
                          <div 
                            className="text-6xl mb-3 p-4 rounded-xl"
                            style={{ backgroundColor: item.color + '20' }}
                          >
                            {item.image}
                          </div>
                          <h4 className="font-bold text-sm mb-2">{item.name}</h4>
                          <div className="flex items-center justify-center gap-1 text-yellow-600 font-bold mb-3">
                            <Icon name="Coins" size={16} />
                            {item.price.toLocaleString()}
                          </div>
                          {item.owned ? (
                            <Button 
                              size="sm" 
                              className="w-full bg-green-500 hover:bg-green-600"
                              onClick={() => handleEquipClothing(item)}
                            >
                              Надеть
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              className="w-full"
                              onClick={() => handleBuyClothing(item)}
                            >
                              Купить
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="avatar" className="space-y-6">
            <Card className="border-4 rounded-3xl">
              <CardHeader>
                <CardTitle className="text-3xl">👤 Мой Персонаж</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-12 text-center">
                      <div className="text-9xl mb-4">
                        {selectedClothing.hat?.image || ''}
                      </div>
                      <div className="text-9xl mb-4">
                        {selectedClothing.shirt?.image || '🧍'}
                      </div>
                      <div className="text-9xl mb-4">
                        {selectedClothing.pants?.image || ''}
                      </div>
                      <div className="text-9xl">
                        {selectedClothing.shoes?.image || ''}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-bold mb-6">Экипированная одежда:</h3>
                    {selectedClothing.hat && (
                      <Card className="border-2">
                        <CardContent className="p-4 flex items-center gap-4">
                          <span className="text-4xl">{selectedClothing.hat.image}</span>
                          <div>
                            <p className="font-bold">{selectedClothing.hat.name}</p>
                            <p className="text-sm text-muted-foreground">Головной убор</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    {selectedClothing.shirt && (
                      <Card className="border-2">
                        <CardContent className="p-4 flex items-center gap-4">
                          <span className="text-4xl">{selectedClothing.shirt.image}</span>
                          <div>
                            <p className="font-bold">{selectedClothing.shirt.name}</p>
                            <p className="text-sm text-muted-foreground">Верх</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    {selectedClothing.pants && (
                      <Card className="border-2">
                        <CardContent className="p-4 flex items-center gap-4">
                          <span className="text-4xl">{selectedClothing.pants.image}</span>
                          <div>
                            <p className="font-bold">{selectedClothing.pants.name}</p>
                            <p className="text-sm text-muted-foreground">Низ</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    {selectedClothing.shoes && (
                      <Card className="border-2">
                        <CardContent className="p-4 flex items-center gap-4">
                          <span className="text-4xl">{selectedClothing.shoes.image}</span>
                          <div>
                            <p className="font-bold">{selectedClothing.shoes.name}</p>
                            <p className="text-sm text-muted-foreground">Обувь</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    {Object.keys(selectedClothing).length === 0 && (
                      <p className="text-muted-foreground text-center py-8">
                        Купите и наденьте одежду в магазине!
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="robux" className="space-y-6">
            <Card className="border-4 rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white">
                <div className="flex items-center gap-6 mb-4">
                  <div className="text-7xl">🎁</div>
                  <div>
                    <h2 className="text-4xl font-black mb-2">Ежедневная Награда</h2>
                    <p className="text-xl opacity-90">Серия: {user.dailyStreak} дней подряд</p>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-gray-100 rounded-full font-black text-xl px-8 py-6"
                  onClick={handleClaimDaily}
                >
                  Получить 100,000 - 1,000,000 Robux
                  <Icon name="Gift" className="ml-2" size={24} />
                </Button>
              </div>
            </Card>

            <div>
              <h3 className="text-3xl font-black mb-6">💎 Бесплатные Robux</h3>
              <p className="text-lg text-muted-foreground mb-6">Получи любое количество Robux абсолютно бесплатно!</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {robuxPackages.map((pkg) => (
                  <Card key={pkg.id} className={`overflow-hidden rounded-3xl border-4 transition-all ${pkg.popular ? 'border-purple-500 shadow-2xl scale-105' : 'border-gray-200 hover:shadow-xl'}`}>
                    {pkg.popular && (
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 font-black">
                        ⭐ ПОПУЛЯРНЫЙ
                      </div>
                    )}
                    <CardContent className="p-6 text-center">
                      <div className="text-7xl mb-4">{pkg.icon}</div>
                      <h4 className="font-black text-2xl mb-3">{pkg.name}</h4>
                      <div className="text-4xl font-black mb-2 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                        {pkg.amount.toLocaleString()}
                      </div>
                      {pkg.bonus > 0 && (
                        <Badge className="mb-4 bg-green-500 text-white border-0 text-sm">
                          +{pkg.bonus.toLocaleString()} бонус
                        </Badge>
                      )}
                      <div className="text-sm text-muted-foreground mb-4">
                        Итого: {(pkg.amount + pkg.bonus).toLocaleString()} R$
                      </div>
                      <Button 
                        className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 font-bold"
                        onClick={() => handleGetRobux(pkg)}
                      >
                        Получить бесплатно
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="border-4 rounded-3xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-4xl font-black mb-2 flex items-center gap-3">
                  <Icon name="Trophy" size={40} />
                  Таблица Лидеров
                </h2>
                <p className="text-xl opacity-90">Топ игроков по количеству Robux</p>
              </CardContent>
            </Card>

            <Card className="border-4 rounded-3xl">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {leaderboard.map((player, index) => (
                    <Card 
                      key={player.id} 
                      className={`border-2 ${player.username === user.username ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-6">
                          <div className={`text-4xl font-black ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-orange-600' : 'text-gray-600'}`}>
                            #{index + 1}
                          </div>
                          <div className="text-5xl">{player.avatar}</div>
                          <div className="flex-1">
                            <h4 className="text-2xl font-bold mb-1">{player.username}</h4>
                            <div className="flex items-center gap-4 text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Icon name="Coins" size={18} />
                                {player.robux.toLocaleString()} R$
                              </span>
                              <Badge variant="outline">Уровень {player.level}</Badge>
                            </div>
                          </div>
                          {index === 0 && <Icon name="Trophy" className="text-yellow-500" size={40} />}
                          {index === 1 && <Icon name="Medal" className="text-gray-400" size={40} />}
                          {index === 2 && <Icon name="Award" className="text-orange-600" size={40} />}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border-4 rounded-3xl overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <CardContent className="relative px-8 pb-8">
                <div className="absolute -top-20 left-8">
                  <div className="w-40 h-40 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl flex items-center justify-center text-7xl border-8 border-white shadow-2xl">
                    🎮
                  </div>
                </div>
                <div className="pt-24">
                  <h2 className="text-4xl font-black mb-2">{user.username}</h2>
                  <div className="flex gap-3 mb-8">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 text-lg px-4 py-2">
                      Уровень {user.level}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 text-lg px-4 py-2">
                      {user.robux.toLocaleString()} R$
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-2">
                      <CardContent className="p-6 text-center">
                        <Icon name="Coins" className="mx-auto mb-3 text-yellow-500" size={40} />
                        <div className="text-3xl font-black mb-1">{user.robux.toLocaleString()}</div>
                        <div className="text-muted-foreground">Robux</div>
                      </CardContent>
                    </Card>
                    <Card className="border-2">
                      <CardContent className="p-6 text-center">
                        <Icon name="Shirt" className="mx-auto mb-3 text-purple-500" size={40} />
                        <div className="text-3xl font-black mb-1">{clothingItems.filter(i => i.owned).length}</div>
                        <div className="text-muted-foreground">Предметов одежды</div>
                      </CardContent>
                    </Card>
                    <Card className="border-2">
                      <CardContent className="p-6 text-center">
                        <Icon name="Flame" className="mx-auto mb-3 text-orange-500" size={40} />
                        <div className="text-3xl font-black mb-1">{user.dailyStreak}</div>
                        <div className="text-muted-foreground">Дней подряд</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-4 rounded-3xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Package" size={28} />
                  Мой Гардероб
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {clothingItems.filter(item => item.owned).map((item) => (
                    <Card key={item.id} className="border-2">
                      <CardContent className="p-4 text-center">
                        <div className="text-5xl mb-2">{item.image}</div>
                        <p className="font-bold text-sm">{item.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                  {clothingItems.filter(item => item.owned).length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                      <Icon name="ShoppingBag" className="mx-auto mb-4" size={64} />
                      <p className="text-xl">Купите одежду в магазине!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
