import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface ClothingItem {
  id: number;
  name: string;
  type: 'shirt' | 'pants' | 'hat' | 'shoes';
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
}

interface Privilege {
  id: string;
  name: string;
  icon: string;
  color: string;
  multiplier: number;
  benefits: string[];
}

interface Friend {
  id: number;
  username: string;
  avatar: string;
  online: boolean;
}

interface MiniGame {
  id: number;
  name: string;
  icon: string;
  reward: number;
}

interface User {
  username: string;
  robux: number;
  level: number;
  dailyStreak: number;
  privilege?: string;
}

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('games');
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
    dailyStreak: 3,
    privilege: undefined
  });

  const privileges: Privilege[] = [
    {
      id: 'premium',
      name: 'Premium',
      icon: '⭐',
      color: 'from-blue-500 to-cyan-500',
      multiplier: 1.5,
      benefits: ['×1.5 к заработку Robux', 'Доступ к эксклюзивной одежде', 'Приоритет в таблице лидеров']
    },
    {
      id: 'vip',
      name: 'VIP',
      icon: '💎',
      color: 'from-purple-500 to-pink-500',
      multiplier: 2,
      benefits: ['×2 к заработку Robux', 'Все преимущества Premium', 'Эксклюзивный бейдж']
    },
    {
      id: 'titan',
      name: 'Titan',
      icon: '👑',
      color: 'from-yellow-500 to-orange-500',
      multiplier: 3,
      benefits: ['×3 к заработку Robux', 'Все преимущества VIP', 'Бесконечные Robux', 'Золотое имя']
    }
  ];

  const [friends, setFriends] = useState<Friend[]>([
    { id: 1, username: 'MegaGamer', avatar: '🎮', online: true },
    { id: 2, username: 'ProBuilder', avatar: '🏗️', online: false },
    { id: 3, username: 'SpeedRunner', avatar: '⚡', online: true }
  ]);

  const miniGames: MiniGame[] = [
    { id: 1, name: 'Кликер', icon: '🖱️', reward: 100 },
    { id: 2, name: 'Угадай число', icon: '🎲', reward: 500 },
    { id: 3, name: 'Спиннер', icon: '🎡', reward: 1000 },
    { id: 4, name: 'Слоты', icon: '🎰', reward: 5000 }
  ];

  const robuxPackages: RobuxPackage[] = [
    { id: 1, name: 'Стартовый', amount: 500, bonus: 0, icon: '💰' },
    { id: 2, name: 'Средний', amount: 5000, bonus: 1000, icon: '💎' },
    { id: 3, name: 'Большой', amount: 50000, bonus: 15000, icon: '👑' },
    { id: 4, name: 'Мега', amount: 500000, bonus: 200000, icon: '🚀' },
    { id: 5, name: 'Гига', amount: 5000000, bonus: 2000000, icon: '⭐' },
    { id: 6, name: 'Ультра', amount: 50000000, bonus: 25000000, icon: '🔥' },
    { id: 7, name: 'Максимум', amount: 500000000, bonus: 100000000, icon: '💫' }
  ];

  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([
    { id: 1, name: 'Красная Футболка', type: 'shirt', price: 100, image: '👕', color: '#ef4444', owned: false },
    { id: 2, name: 'Синяя Футболка', type: 'shirt', price: 100, image: '👕', color: '#3b82f6', owned: true },
    { id: 3, name: 'Чёрные Джинсы', type: 'pants', price: 150, image: '👖', color: '#1f2937', owned: true },
    { id: 4, name: 'Синие Джинсы', type: 'pants', price: 150, image: '👖', color: '#3b82f6', owned: false },
    { id: 5, name: 'Красная Кепка', type: 'hat', price: 200, image: '🧢', color: '#ef4444', owned: false },
    { id: 6, name: 'Корона', type: 'hat', price: 5000, image: '👑', color: '#fbbf24', owned: false },
    { id: 7, name: 'Кроссовки', type: 'shoes', price: 250, image: '👟', color: '#ffffff', owned: true },
    { id: 8, name: 'Ботинки', type: 'shoes', price: 300, image: '👞', color: '#78350f', owned: false }
  ]);

  const [leaderboard, setLeaderboard] = useState([
    { id: 1, username: 'RobloxKing', robux: 999999999, level: 100, avatar: '👑', privilege: 'titan' },
    { id: 2, username: 'MegaBuilder', robux: 500000000, level: 85, avatar: '🚀', privilege: 'vip' },
    { id: 3, username: user.username, robux: user.robux, level: user.level, avatar: '🎮', privilege: user.privilege }
  ]);

  const handleLogin = () => {
    if (username.length >= 3 && password.length >= 4) {
      setUser({ ...user, username });
      setIsLoggedIn(true);
      toast.success(`Добро пожаловать, ${username}! 🎉`);
    } else {
      toast.error('Логин от 3 символов, пароль от 4');
    }
  };

  const handleRegister = () => {
    if (username.length >= 3 && password.length >= 4) {
      setUser({ ...user, username, robux: 10000 });
      setIsLoggedIn(true);
      toast.success(`Регистрация успешна! +10,000 Robux! 🎁`);
    } else {
      toast.error('Логин от 3 символов, пароль от 4');
    }
  };

  const handleClaimDaily = () => {
    const reward = Math.floor(Math.random() * 900000) + 100000;
    const multiplier = user.privilege ? privileges.find(p => p.id === user.privilege)?.multiplier || 1 : 1;
    const finalReward = Math.floor(reward * multiplier);
    
    setUser({ ...user, robux: user.robux + finalReward, dailyStreak: user.dailyStreak + 1 });
    toast.success(`🎁 +${finalReward.toLocaleString()} Robux! ${multiplier > 1 ? `(×${multiplier})` : ''}`);
  };

  const handleGetRobux = (pkg: RobuxPackage) => {
    const total = pkg.amount + pkg.bonus;
    setUser({ ...user, robux: user.robux + total });
    toast.success(`💎 +${total.toLocaleString()} Robux бесплатно!`);
  };

  const handleGetPrivilege = (privId: string) => {
    setUser({ ...user, privilege: privId });
    toast.success(`${privileges.find(p => p.id === privId)?.icon} Привилегия ${privileges.find(p => p.id === privId)?.name} активирована!`);
  };

  const handlePlayGame = (game: MiniGame) => {
    const multiplier = user.privilege ? privileges.find(p => p.id === user.privilege)?.multiplier || 1 : 1;
    const reward = Math.floor(game.reward * multiplier);
    
    setUser({ ...user, robux: user.robux + reward });
    toast.success(`${game.icon} ${game.name}: +${reward.toLocaleString()} Robux!`);
  };

  const handleBuyClothing = (item: ClothingItem) => {
    if (item.owned) {
      toast.info('Уже куплено!');
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

  const handleEquip = (item: ClothingItem) => {
    if (!item.owned) return;
    setSelectedClothing({ ...selectedClothing, [item.type]: item });
    toast.success(`Надето: ${item.name}`);
  };

  const handleAddFriend = () => {
    const friendName = prompt('Введите имя друга:');
    if (friendName && friendName.length >= 3) {
      setFriends([...friends, { 
        id: friends.length + 1, 
        username: friendName, 
        avatar: '👤', 
        online: Math.random() > 0.5 
      }]);
      toast.success(`${friendName} добавлен в друзья!`);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-4 border-purple-500 shadow-2xl rounded-3xl bg-gray-900">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl">🎮</span>
              </div>
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              FREEROBUX.COM
            </h1>
            <p className="text-gray-400">Бесплатные Robux ждут тебя!</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 mb-6 bg-gray-800 p-1 rounded-xl">
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
            
            <div className="space-y-4">
              <div>
                <Label>Логин</Label>
                <Input 
                  placeholder={showLogin ? "Введите логин" : "Придумайте логин"}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label>Пароль</Label>
                <Input 
                  type="password" 
                  placeholder={showLogin ? "Введите пароль" : "Придумайте пароль"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 bg-gray-800 border-gray-700"
                />
              </div>
              {!showLogin && (
                <Badge className="w-full justify-center py-2 bg-green-500 text-white border-0">
                  🎁 Бонус: 10,000 Robux при регистрации!
                </Badge>
              )}
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-bold py-6 text-lg rounded-full"
                onClick={showLogin ? handleLogin : handleRegister}
              >
                {showLogin ? 'Войти' : 'Зарегистрироваться'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentPrivilege = user.privilege ? privileges.find(p => p.id === user.privilege) : null;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 bg-gray-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <span className="text-2xl">🎮</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                FREEROBUX.COM
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0 px-4 md:px-6 py-2 md:py-3 text-base md:text-lg font-bold">
                <Icon name="Coins" className="mr-2" size={20} />
                {user.robux.toLocaleString()}
              </Badge>
              {currentPrivilege && (
                <Badge className={`bg-gradient-to-r ${currentPrivilege.color} text-white border-0 px-4 py-2`}>
                  {currentPrivilege.icon} {currentPrivilege.name}
                </Badge>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsLoggedIn(false)}
                className="hidden md:flex"
              >
                Выход
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 grid grid-cols-3 md:grid-cols-7 gap-2">
          {[
            { id: 'games', icon: 'Gamepad2', label: 'Игры' },
            { id: 'shop', icon: 'ShoppingBag', label: 'Магазин' },
            { id: 'avatar', icon: 'User', label: 'Аватар' },
            { id: 'robux', icon: 'Coins', label: 'Robux' },
            { id: 'privileges', icon: 'Crown', label: 'Привилегии' },
            { id: 'friends', icon: 'Users', label: 'Друзья' },
            { id: 'leaderboard', icon: 'Trophy', label: 'Лидеры' }
          ].map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col md:flex-row items-center gap-1 md:gap-2 h-auto py-2 md:py-3"
            >
              <Icon name={tab.icon as any} size={18} />
              <span className="text-xs md:text-sm">{tab.label}</span>
            </Button>
          ))}
        </div>

        {activeTab === 'games' && (
          <div className="space-y-6">
            <Card className="border-2 border-green-500 bg-gray-900">
              <CardContent className="p-8">
                <h2 className="text-4xl font-black mb-2 text-green-400">🎮 Мини-Игры</h2>
                <p className="text-xl text-gray-400">Играй и зарабатывай Robux!</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {miniGames.map(game => (
                <Card key={game.id} className="border-2 border-gray-700 bg-gray-900 hover:border-purple-500 transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="text-7xl mb-4">{game.icon}</div>
                    <h3 className="text-2xl font-bold mb-3">{game.name}</h3>
                    <Badge className="mb-4 bg-yellow-500 text-black">
                      +{game.reward.toLocaleString()} R$
                    </Badge>
                    {currentPrivilege && (
                      <p className="text-sm text-green-400 mb-3">
                        ×{currentPrivilege.multiplier} = {(game.reward * currentPrivilege.multiplier).toLocaleString()} R$
                      </p>
                    )}
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600"
                      onClick={() => handlePlayGame(game)}
                    >
                      Играть
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'shop' && (
          <div className="space-y-6">
            <Card className="border-2 border-purple-500 bg-gray-900">
              <CardContent className="p-8">
                <h2 className="text-4xl font-black mb-2 text-purple-400">🛍️ Магазин Одежды</h2>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {clothingItems.map(item => (
                <Card key={item.id} className="border-2 border-gray-700 bg-gray-900 hover:border-purple-500">
                  <CardContent className="p-4 text-center">
                    <div className="text-6xl mb-3 p-4 rounded-xl bg-gray-800">
                      {item.image}
                    </div>
                    <h4 className="font-bold text-sm mb-2">{item.name}</h4>
                    <div className="flex items-center justify-center gap-1 text-yellow-500 font-bold mb-3">
                      <Icon name="Coins" size={16} />
                      {item.price}
                    </div>
                    {item.owned ? (
                      <Button 
                        size="sm" 
                        className="w-full bg-green-500"
                        onClick={() => handleEquip(item)}
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
        )}

        {activeTab === 'avatar' && (
          <Card className="border-2 border-gray-700 bg-gray-900">
            <CardHeader>
              <h2 className="text-3xl font-black">👤 Мой Персонаж</h2>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-12 text-center">
                <div className="space-y-4">
                  {selectedClothing.hat && <div className="text-8xl">{selectedClothing.hat.image}</div>}
                  {selectedClothing.shirt && <div className="text-8xl">{selectedClothing.shirt.image}</div>}
                  {selectedClothing.pants && <div className="text-8xl">{selectedClothing.pants.image}</div>}
                  {selectedClothing.shoes && <div className="text-8xl">{selectedClothing.shoes.image}</div>}
                  {Object.keys(selectedClothing).length === 0 && (
                    <div className="text-8xl">🧍</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'robux' && (
          <div className="space-y-6">
            <Card className="border-2 border-green-500 bg-gray-900">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white">
                <div className="flex items-center gap-6 mb-4">
                  <div className="text-7xl">🎁</div>
                  <div>
                    <h2 className="text-4xl font-black mb-2">Ежедневная Награда</h2>
                    <p className="text-xl">Серия: {user.dailyStreak} дней</p>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-gray-100 font-black text-xl px-8 py-6 rounded-full"
                  onClick={handleClaimDaily}
                >
                  Получить 100,000 - 1,000,000 Robux
                </Button>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {robuxPackages.map(pkg => (
                <Card key={pkg.id} className="border-2 border-gray-700 bg-gray-900 hover:border-purple-500">
                  <CardContent className="p-6 text-center">
                    <div className="text-7xl mb-4">{pkg.icon}</div>
                    <h4 className="font-black text-2xl mb-3">{pkg.name}</h4>
                    <div className="text-4xl font-black mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      {pkg.amount.toLocaleString()}
                    </div>
                    {pkg.bonus > 0 && (
                      <Badge className="mb-4 bg-green-500">+{pkg.bonus.toLocaleString()}</Badge>
                    )}
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                      onClick={() => handleGetRobux(pkg)}
                    >
                      Получить бесплатно
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'privileges' && (
          <div className="space-y-6">
            <Card className="border-2 border-yellow-500 bg-gray-900">
              <CardContent className="p-8">
                <h2 className="text-4xl font-black mb-2 text-yellow-400">👑 Привилегии</h2>
                <p className="text-xl text-gray-400">Получи бесплатно и увеличь заработок!</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {privileges.map(priv => (
                <Card key={priv.id} className={`border-4 bg-gray-900 ${user.privilege === priv.id ? 'border-yellow-500 shadow-2xl' : 'border-gray-700'}`}>
                  <div className={`bg-gradient-to-r ${priv.color} p-6 text-center text-white`}>
                    <div className="text-7xl mb-3">{priv.icon}</div>
                    <h3 className="text-3xl font-black mb-2">{priv.name}</h3>
                    <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                      ×{priv.multiplier} к заработку
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-3 mb-6">
                      {priv.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Icon name="Check" className="text-green-500 mt-1" size={16} />
                          <span className="text-sm text-gray-400">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      className={`w-full ${user.privilege === priv.id ? 'bg-green-500' : `bg-gradient-to-r ${priv.color}`}`}
                      onClick={() => handleGetPrivilege(priv.id)}
                      disabled={user.privilege === priv.id}
                    >
                      {user.privilege === priv.id ? 'Активно' : 'Получить бесплатно'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'friends' && (
          <div className="space-y-6">
            <Card className="border-2 border-blue-500 bg-gray-900">
              <CardContent className="p-8 flex justify-between items-center">
                <div>
                  <h2 className="text-4xl font-black mb-2 text-blue-400">👥 Друзья</h2>
                  <p className="text-xl text-gray-400">Всего друзей: {friends.length}</p>
                </div>
                <Button onClick={handleAddFriend} className="bg-blue-500">
                  <Icon name="UserPlus" className="mr-2" />
                  Добавить друга
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {friends.map(friend => (
                <Card key={friend.id} className="border-2 border-gray-700 bg-gray-900">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="text-5xl">{friend.avatar}</div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold">{friend.username}</h4>
                      <Badge className={friend.online ? 'bg-green-500' : 'bg-gray-500'}>
                        {friend.online ? 'В сети' : 'Не в сети'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <Card className="border-2 border-yellow-500 bg-gray-900">
              <CardContent className="p-8">
                <h2 className="text-4xl font-black mb-2 text-yellow-400 flex items-center gap-3">
                  <Icon name="Trophy" size={40} />
                  Таблица Лидеров
                </h2>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {leaderboard.sort((a, b) => b.robux - a.robux).map((player, idx) => (
                <Card key={player.id} className={`border-2 ${player.username === user.username ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700 bg-gray-900'}`}>
                  <CardContent className="p-6 flex items-center gap-6">
                    <div className={`text-4xl font-black ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-400' : 'text-orange-600'}`}>
                      #{idx + 1}
                    </div>
                    <div className="text-5xl">{player.avatar}</div>
                    <div className="flex-1">
                      <h4 className={`text-2xl font-bold ${player.privilege === 'titan' ? 'text-yellow-400' : ''}`}>
                        {player.username}
                      </h4>
                      <div className="flex items-center gap-4 text-gray-400">
                        <span className="flex items-center gap-1">
                          <Icon name="Coins" size={18} />
                          {player.robux.toLocaleString()} R$
                        </span>
                        {player.privilege && (
                          <Badge className={`bg-gradient-to-r ${privileges.find(p => p.id === player.privilege)?.color}`}>
                            {privileges.find(p => p.id === player.privilege)?.icon} {privileges.find(p => p.id === player.privilege)?.name}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {idx === 0 && <Icon name="Trophy" className="text-yellow-500" size={40} />}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
