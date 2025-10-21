import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface User {
  username: string;
  robux: number;
  level: number;
  dailyStreak: number;
  privilege?: string;
  clan?: string;
}

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  const [user, setUser] = useState<User>({
    username: 'Player2024',
    robux: 0,
    level: 1,
    dailyStreak: 0,
    privilege: undefined,
    clan: undefined
  });

  const robuxPackages = [
    { id: 1, name: 'Мини', amount: 50, bonus: 0, icon: '💰' },
    { id: 2, name: 'Малый', amount: 100, bonus: 10, icon: '💵' },
    { id: 3, name: 'Средний', amount: 500, bonus: 100, icon: '💎' },
    { id: 4, name: 'Большой', amount: 1000, bonus: 250, icon: '💰' },
    { id: 5, name: 'Огромный', amount: 5000, bonus: 1500, icon: '👑' },
    { id: 6, name: 'Максимум', amount: 25000, bonus: 10000, icon: '🚀' }
  ];

  const privileges = [
    { id: 'premium', name: 'Premium', icon: '⭐', color: 'from-blue-500 to-cyan-500', multiplier: 1.5 },
    { id: 'vip', name: 'VIP', icon: '💎', color: 'from-purple-500 to-pink-500', multiplier: 2 },
    { id: 'titan', name: 'Titan', icon: '👑', color: 'from-yellow-500 to-orange-500', multiplier: 3 }
  ];

  const [dailyTasks, setDailyTasks] = useState([
    { id: 1, title: 'Войти в игру', reward: 100, completed: false },
    { id: 2, title: 'Сыграть 3 игры', reward: 500, completed: false, progress: 0, max: 3 },
    { id: 3, title: 'Пригласить друга', reward: 1000, completed: false },
    { id: 4, title: 'Купить предмет', reward: 250, completed: false }
  ]);

  const [yearlyTasks, setYearlyTasks] = useState([
    { id: 1, title: 'Достичь 50 уровня', reward: 50000, completed: false, progress: 1, max: 50 },
    { id: 2, title: 'Заработать 1,000,000 Robux', reward: 100000, completed: false, progress: 0, max: 1000000 },
    { id: 3, title: 'Собрать 50 предметов', reward: 25000, completed: false, progress: 0, max: 50 }
  ]);

  const [crashMultiplier, setCrashMultiplier] = useState(1.0);
  const [crashBet, setCrashBet] = useState(100);
  const [crashActive, setCrashActive] = useState(false);
  const [crashInterval, setCrashInterval] = useState<NodeJS.Timeout | null>(null);

  const clans = [
    { id: 1, name: 'Dragons', members: 1250, icon: '🐉', power: 95000 },
    { id: 2, name: 'Phoenix', members: 980, icon: '🔥', power: 82000 },
    { id: 3, name: 'Wolves', members: 1450, icon: '🐺', power: 88000 }
  ];

  const [tournaments, setTournaments] = useState([
    { id: 1, name: 'Битва кланов', prize: 500000, participants: 24, status: 'active' },
    { id: 2, name: 'Соло турнир', prize: 100000, participants: 156, status: 'active' },
    { id: 3, name: 'Командный турнир', prize: 250000, participants: 48, status: 'upcoming' }
  ]);

  const [cases, setCases] = useState([
    { id: 1, name: 'Стартовый кейс', price: 50, icon: '📦', rewards: [10, 25, 50, 100] },
    { id: 2, name: 'Золотой кейс', price: 500, icon: '🎁', rewards: [100, 250, 500, 1000] },
    { id: 3, name: 'Легендарный кейс', price: 2000, icon: '💎', rewards: [1000, 2500, 5000, 10000] }
  ]);

  const [clothingItems, setClothingItems] = useState([
    { id: 1, name: 'Красная Футболка', type: 'shirt', price: 50, image: '👕', owned: false },
    { id: 2, name: 'Синяя Футболка', type: 'shirt', price: 50, image: '👕', owned: false },
    { id: 3, name: 'Чёрные Джинсы', type: 'pants', price: 75, image: '👖', owned: false },
    { id: 4, name: 'Синие Джинсы', type: 'pants', price: 75, image: '👖', owned: false },
    { id: 5, name: 'Кепка', type: 'hat', price: 100, image: '🧢', owned: false },
    { id: 6, name: 'Корона', type: 'hat', price: 1000, image: '👑', owned: false },
    { id: 7, name: 'Кроссовки', type: 'shoes', price: 125, image: '👟', owned: false },
    { id: 8, name: 'Очки', type: 'accessory', price: 200, image: '🕶️', owned: false }
  ]);

  const [avatars, setAvatars] = useState([
    { id: 1, name: 'Классический', price: 0, emoji: '🧍', owned: true },
    { id: 2, name: 'Робот', price: 500, emoji: '🤖', owned: false },
    { id: 3, name: 'Ниндзя', price: 1000, emoji: '🥷', owned: false },
    { id: 4, name: 'Космонавт', price: 2000, emoji: '👨‍🚀', owned: false },
    { id: 5, name: 'Рыцарь', price: 3000, emoji: '🛡️', owned: false },
    { id: 6, name: 'Волшебник', price: 5000, emoji: '🧙', owned: false }
  ]);

  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [selectedClothing, setSelectedClothing] = useState<any>({});

  const [friends, setFriends] = useState([
    { id: 1, username: 'MegaGamer', avatar: '🎮', online: true },
    { id: 2, username: 'ProBuilder', avatar: '🏗️', online: false },
    { id: 3, username: 'SpeedRunner', avatar: '⚡', online: true }
  ]);

  const [leaderboard, setLeaderboard] = useState([
    { id: 1, username: 'RobloxKing', robux: 999999999, level: 100, avatar: '👑', privilege: 'titan' },
    { id: 2, username: 'MegaBuilder', robux: 500000000, level: 85, avatar: '🚀', privilege: 'vip' },
    { id: 3, username: 'ProPlayer', robux: 100000000, level: 70, avatar: '🎮', privilege: 'premium' }
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
      setUser({ ...user, username, robux: 1000 });
      setIsLoggedIn(true);
      toast.success(`🎁 Регистрация успешна! +1,000 Robux бонус!`);
    } else {
      toast.error('Логин от 3 символов, пароль от 4');
    }
  };

  const handleClaimDaily = () => {
    const reward = Math.floor(Math.random() * 900000) + 100000;
    const multiplier = user.privilege ? privileges.find(p => p.id === user.privilege)?.multiplier || 1 : 1;
    const finalReward = Math.floor(reward * multiplier);
    
    setUser({ ...user, robux: user.robux + finalReward, dailyStreak: user.dailyStreak + 1 });
    toast.success(`🎁 +${finalReward.toLocaleString()} Robux! (×${multiplier})`);
  };

  const handleGetRobux = (pkg: any) => {
    const total = pkg.amount + pkg.bonus;
    setUser({ ...user, robux: user.robux + total });
    toast.success(`💎 +${total.toLocaleString()} Robux!`);
  };

  const handleGetPrivilege = (privId: string) => {
    setUser({ ...user, privilege: privId });
    const priv = privileges.find(p => p.id === privId);
    toast.success(`${priv?.icon} Привилегия ${priv?.name} активирована!`);
  };

  const handleCompleteTask = (task: any, isYearly = false) => {
    setUser({ ...user, robux: user.robux + task.reward });
    if (isYearly) {
      setYearlyTasks(yearlyTasks.map(t => t.id === task.id ? { ...t, completed: true } : t));
    } else {
      setDailyTasks(dailyTasks.map(t => t.id === task.id ? { ...t, completed: true } : t));
    }
    toast.success(`✅ Задание выполнено! +${task.reward.toLocaleString()} R$`);
  };

  const handleCrashStart = () => {
    if (user.robux < crashBet) {
      toast.error('Недостаточно Robux!');
      return;
    }
    
    setUser({ ...user, robux: user.robux - crashBet });
    setCrashActive(true);
    
    const interval = setInterval(() => {
      setCrashMultiplier(prev => {
        const newMult = prev + 0.1;
        if (Math.random() < 0.05) {
          clearInterval(interval);
          setCrashActive(false);
          toast.error(`💥 Краш на ×${newMult.toFixed(2)}! Потеря ставки`);
          setCrashMultiplier(1.0);
          return 1.0;
        }
        return newMult;
      });
    }, 200);
    
    setCrashInterval(interval);
  };

  const handleCrashCashout = () => {
    if (!crashActive || !crashInterval) return;
    
    clearInterval(crashInterval);
    const winAmount = Math.floor(crashBet * crashMultiplier);
    setUser({ ...user, robux: user.robux + winAmount });
    setCrashActive(false);
    setCrashMultiplier(1.0);
    toast.success(`💰 Выигрыш: ${winAmount.toLocaleString()} R$ (×${crashMultiplier.toFixed(2)})`);
  };

  const handleOpenCase = (caseItem: any) => {
    if (user.robux < caseItem.price) {
      toast.error('Недостаточно Robux!');
      return;
    }
    
    setUser({ ...user, robux: user.robux - caseItem.price });
    const reward = caseItem.rewards[Math.floor(Math.random() * caseItem.rewards.length)];
    setUser(prev => ({ ...prev, robux: prev.robux + reward }));
    toast.success(`${caseItem.icon} Выпало ${reward.toLocaleString()} Robux!`);
  };

  const handleBuyClothing = (item: any) => {
    if (item.owned) {
      setSelectedClothing({ ...selectedClothing, [item.type]: item });
      toast.info('Надето!');
      return;
    }
    if (user.robux < item.price) {
      toast.error('Недостаточно Robux!');
      return;
    }
    
    setUser({ ...user, robux: user.robux - item.price });
    setClothingItems(clothingItems.map(i => i.id === item.id ? { ...i, owned: true } : i));
    toast.success(`✨ ${item.name} куплен!`);
  };

  const handleBuyAvatar = (avatar: any) => {
    if (avatar.owned) {
      setSelectedAvatar(avatar);
      toast.success(`Аватар выбран: ${avatar.name}`);
      return;
    }
    if (user.robux < avatar.price) {
      toast.error('Недостаточно Robux!');
      return;
    }
    
    setUser({ ...user, robux: user.robux - avatar.price });
    setAvatars(avatars.map(a => a.id === avatar.id ? { ...a, owned: true } : a));
    setSelectedAvatar(avatar);
    toast.success(`✨ ${avatar.name} куплен и выбран!`);
  };

  const handleJoinClan = (clan: any) => {
    setUser({ ...user, clan: clan.name });
    toast.success(`🎉 Вы вступили в клан ${clan.name}!`);
  };

  const handleJoinTournament = (tournament: any) => {
    if (tournament.status !== 'active') {
      toast.info('Турнир скоро начнётся!');
      return;
    }
    toast.success(`⚔️ Вы зарегистрированы на ${tournament.name}!`);
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
              >
                Вход
              </Button>
              <Button 
                variant={!showLogin ? 'default' : 'ghost'}
                onClick={() => setShowLogin(false)}
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
                  🎁 Бонус: 1,000 Robux при регистрации!
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
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🎮</span>
              </div>
              <h1 className="text-xl md:text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                FREEROBUX.COM
              </h1>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0 px-3 md:px-6 py-2 text-sm md:text-lg font-bold">
                <Icon name="Coins" className="mr-1 md:mr-2" size={18} />
                {user.robux.toLocaleString()}
              </Badge>
              {currentPrivilege && (
                <Badge className={`bg-gradient-to-r ${currentPrivilege.color} text-white border-0 px-2 md:px-4 py-2 text-xs md:text-sm`}>
                  {currentPrivilege.icon}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 grid grid-cols-3 md:grid-cols-11 gap-1 md:gap-2">
          {[
            { id: 'home', icon: 'Home', label: 'Главная' },
            { id: 'profile', icon: 'User', label: 'Профиль' },
            { id: 'catalog', icon: 'Grid3x3', label: 'Каталог' },
            { id: 'avatars', icon: 'Smile', label: 'Аватары' },
            { id: 'marketplace', icon: 'Store', label: 'Маркет' },
            { id: 'robux', icon: 'Coins', label: 'Robux' },
            { id: 'crash', icon: 'TrendingUp', label: 'Краш' },
            { id: 'cases', icon: 'Package', label: 'Кейсы' },
            { id: 'tasks', icon: 'CheckSquare', label: 'Задания' },
            { id: 'clans', icon: 'Users', label: 'Кланы' },
            { id: 'leaderboard', icon: 'Trophy', label: 'Лидеры' }
          ].map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col md:flex-row items-center gap-1 h-auto py-2 text-xs"
            >
              <Icon name={tab.icon as any} size={16} />
              <span className="hidden md:inline text-xs">{tab.label}</span>
            </Button>
          ))}
        </div>

        {activeTab === 'home' && (
          <div className="space-y-6">
            <Card className="border-2 border-green-500 bg-gray-900">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 md:p-8">
                <div className="flex items-center gap-4 md:gap-6 mb-4">
                  <div className="text-5xl md:text-7xl">{selectedAvatar.emoji}</div>
                  <div>
                    <h2 className="text-2xl md:text-4xl font-black mb-2">Привет, {user.username}!</h2>
                    <p className="text-lg md:text-xl">💰 {user.robux.toLocaleString()} Robux</p>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-gray-100 font-black text-lg md:text-xl px-6 md:px-8 py-4 md:py-6 rounded-full"
                  onClick={handleClaimDaily}
                >
                  🎁 Получить 100,000 - 1,000,000 Robux
                </Button>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-2 border-blue-500 bg-gray-900">
                <CardContent className="p-6 text-center">
                  <Icon name="Trophy" className="mx-auto mb-3 text-yellow-500" size={40} />
                  <div className="text-3xl font-black mb-1">{user.level}</div>
                  <div className="text-gray-400">Уровень</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-purple-500 bg-gray-900">
                <CardContent className="p-6 text-center">
                  <Icon name="Flame" className="mx-auto mb-3 text-orange-500" size={40} />
                  <div className="text-3xl font-black mb-1">{user.dailyStreak}</div>
                  <div className="text-gray-400">Дней подряд</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-pink-500 bg-gray-900">
                <CardContent className="p-6 text-center">
                  <Icon name="Users" className="mx-auto mb-3 text-pink-500" size={40} />
                  <div className="text-3xl font-black mb-1">{user.clan || 'Нет'}</div>
                  <div className="text-gray-400">Клан</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <Card className="border-2 border-blue-500 bg-gray-900">
              <CardHeader>
                <h2 className="text-4xl font-black text-blue-400">👤 Профиль</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-9xl mb-4">{selectedAvatar.emoji}</div>
                  <h3 className="text-3xl font-bold mb-2">{user.username}</h3>
                  {currentPrivilege && (
                    <Badge className={`bg-gradient-to-r ${currentPrivilege.color} text-lg px-6 py-2 mb-4`}>
                      {currentPrivilege.icon} {currentPrivilege.name}
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-800 rounded-xl p-6">
                  <div className="text-center">
                    <div className="text-2xl font-black text-yellow-400">{user.robux.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Robux</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-blue-400">{user.level}</div>
                    <div className="text-sm text-gray-400">Уровень</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-orange-400">{user.dailyStreak}</div>
                    <div className="text-sm text-gray-400">Дней</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-pink-400">{friends.length}</div>
                    <div className="text-sm text-gray-400">Друзей</div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-xl p-6">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <Icon name="Users" size={20} />
                    Друзья ({friends.length})
                  </h4>
                  <div className="space-y-3">
                    {friends.map(friend => (
                      <div key={friend.id} className="flex items-center gap-3 bg-gray-700 p-3 rounded-lg">
                        <div className="text-3xl">{friend.avatar}</div>
                        <div className="flex-1">
                          <div className="font-bold">{friend.username}</div>
                          <Badge className={friend.online ? 'bg-green-500' : 'bg-gray-500'}>
                            {friend.online ? 'В сети' : 'Не в сети'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" onClick={handleAddFriend}>
                    <Icon name="UserPlus" className="mr-2" />
                    Добавить друга
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <Card className="border-2 border-purple-500 bg-gray-900">
              <CardContent className="p-8">
                <h2 className="text-4xl font-black mb-2 text-purple-400">🎮 Каталог Игр</h2>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Кликер', 'Угадай число', 'Спиннер', 'Слоты', 'Колесо фортуны', 'Казино'].map((game, idx) => (
                <Card key={idx} className="border-2 border-gray-700 bg-gray-900 hover:border-purple-500">
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-3">🎮</div>
                    <h3 className="text-xl font-bold mb-3">{game}</h3>
                    <Badge className="mb-3 bg-yellow-500 text-black">+{(idx + 1) * 100} R$</Badge>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                      Играть
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'avatars' && (
          <div className="space-y-6">
            <Card className="border-2 border-blue-500 bg-gray-900">
              <CardContent className="p-8">
                <h2 className="text-4xl font-black mb-2 text-blue-400">👤 Аватар Шоп</h2>
                <p className="text-xl text-gray-400">Текущий: {selectedAvatar.name}</p>
              </CardContent>
            </Card>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {avatars.map(avatar => (
                <Card key={avatar.id} className={`border-2 ${avatar.id === selectedAvatar.id ? 'border-green-500' : 'border-gray-700'} bg-gray-900`}>
                  <CardContent className="p-4 text-center">
                    <div className="text-6xl mb-3">{avatar.emoji}</div>
                    <h4 className="font-bold mb-2">{avatar.name}</h4>
                    {avatar.price > 0 && (
                      <div className="flex items-center justify-center gap-1 text-yellow-500 mb-3">
                        <Icon name="Coins" size={16} />
                        {avatar.price}
                      </div>
                    )}
                    <Button 
                      size="sm" 
                      className={`w-full ${avatar.owned ? 'bg-green-500' : ''}`}
                      onClick={() => handleBuyAvatar(avatar)}
                    >
                      {avatar.owned ? (avatar.id === selectedAvatar.id ? 'Выбран' : 'Выбрать') : 'Купить'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            <Card className="border-2 border-purple-500 bg-gray-900">
              <CardContent className="p-8">
                <h2 className="text-4xl font-black text-purple-400">🛍️ Marketplace - Магазин Одежды</h2>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-blue-500 bg-gray-900">
              <CardHeader>
                <h3 className="text-2xl font-bold">Персонаж - Примерочная</h3>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl p-12 text-center">
                  <div className="text-8xl mb-4">{selectedAvatar.emoji}</div>
                  <div className="space-y-2">
                    {selectedClothing.hat && <div className="text-6xl">{selectedClothing.hat.image}</div>}
                    {selectedClothing.shirt && <div className="text-6xl">{selectedClothing.shirt.image}</div>}
                    {selectedClothing.pants && <div className="text-6xl">{selectedClothing.pants.image}</div>}
                    {selectedClothing.shoes && <div className="text-6xl">{selectedClothing.shoes.image}</div>}
                    {selectedClothing.accessory && <div className="text-6xl">{selectedClothing.accessory.image}</div>}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {clothingItems.map(item => (
                <Card key={item.id} className="border-2 border-gray-700 bg-gray-900">
                  <CardContent className="p-4 text-center">
                    <div className="text-6xl mb-3">{item.image}</div>
                    <h4 className="font-bold text-sm mb-2">{item.name}</h4>
                    <div className="flex items-center justify-center gap-1 text-yellow-500 mb-3">
                      <Icon name="Coins" size={16} />
                      {item.price}
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleBuyClothing(item)}
                    >
                      {item.owned ? 'Надеть' : 'Купить'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'robux' && (
          <div className="space-y-6">
            <Card className="border-2 border-yellow-500 bg-gray-900">
              <CardContent className="p-8">
                <h2 className="text-4xl font-black text-yellow-400">💎 Получить Robux (50-25,000)</h2>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {robuxPackages.map(pkg => (
                <Card key={pkg.id} className="border-2 border-gray-700 bg-gray-900">
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-3">{pkg.icon}</div>
                    <h4 className="font-black text-2xl mb-2">{pkg.name}</h4>
                    <div className="text-3xl font-black mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      {pkg.amount.toLocaleString()}
                    </div>
                    {pkg.bonus > 0 && <Badge className="mb-3 bg-green-500">+{pkg.bonus}</Badge>}
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

        {activeTab === 'crash' && (
          <Card className="border-2 border-red-500 bg-gray-900">
            <CardHeader>
              <h2 className="text-4xl font-black text-red-400">📈 Краш - Заработок Robux</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-8xl font-black mb-4 text-green-400">
                  ×{crashMultiplier.toFixed(2)}
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Ставка (Robux)</Label>
                    <Input 
                      type="number" 
                      value={crashBet}
                      onChange={(e) => setCrashBet(Number(e.target.value))}
                      placeholder="Ставка"
                      className="bg-gray-800 text-center text-2xl mt-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      size="lg"
                      className="bg-green-500 text-2xl py-8"
                      onClick={handleCrashStart}
                      disabled={crashActive}
                    >
                      Старт
                    </Button>
                    <Button 
                      size="lg"
                      className="bg-red-500 text-2xl py-8"
                      onClick={handleCrashCashout}
                      disabled={!crashActive}
                    >
                      Забрать
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6">
            <Card className="border-2 border-yellow-500 bg-gray-900">
              <CardContent className="p-8">
                <h2 className="text-4xl font-black text-yellow-400">🎁 Кейсы (Карты)</h2>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cases.map(caseItem => (
                <Card key={caseItem.id} className="border-2 border-gray-700 bg-gray-900">
                  <CardContent className="p-6 text-center">
                    <div className="text-7xl mb-4">{caseItem.icon}</div>
                    <h3 className="text-2xl font-bold mb-3">{caseItem.name}</h3>
                    <Badge className="mb-4 bg-blue-500">{caseItem.price} R$</Badge>
                    <p className="text-sm text-gray-400 mb-4">
                      Выигрыш: {caseItem.rewards[0]}-{caseItem.rewards[caseItem.rewards.length - 1]} R$
                    </p>
                    <Button 
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500"
                      onClick={() => handleOpenCase(caseItem)}
                    >
                      Открыть
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <Card className="border-2 border-green-500 bg-gray-900">
              <CardHeader>
                <h2 className="text-3xl font-black text-green-400">📋 Ежедневные задания</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {dailyTasks.map(task => (
                  <Card key={task.id} className="border-2 border-gray-700 bg-gray-800">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold mb-2">{task.title}</h4>
                        {task.max && (
                          <Progress value={(task.progress / task.max) * 100} className="mb-2" />
                        )}
                        <Badge className="bg-yellow-500 text-black">+{task.reward} R$</Badge>
                      </div>
                      <Button 
                        onClick={() => handleCompleteTask(task, false)}
                        disabled={task.completed}
                        className="ml-4"
                      >
                        {task.completed ? '✓' : 'Выполнить'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-500 bg-gray-900">
              <CardHeader>
                <h2 className="text-3xl font-black text-purple-400">🎯 Ежегодные задания</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {yearlyTasks.map(task => (
                  <Card key={task.id} className="border-2 border-gray-700 bg-gray-800">
                    <CardContent className="p-4">
                      <h4 className="font-bold mb-2">{task.title}</h4>
                      <Progress value={(task.progress / task.max) * 100} className="mb-2" />
                      <p className="text-sm text-gray-400 mb-2">{task.progress.toLocaleString()} / {task.max.toLocaleString()}</p>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-yellow-500 text-black">+{task.reward.toLocaleString()} R$</Badge>
                        <Button 
                          onClick={() => handleCompleteTask(task, true)}
                          disabled={task.completed || task.progress < task.max}
                          size="sm"
                        >
                          {task.completed ? '✓ Выполнено' : 'Получить'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'clans' && (
          <div className="space-y-6">
            <Card className="border-2 border-orange-500 bg-gray-900">
              <CardContent className="p-8">
                <h2 className="text-4xl font-black text-orange-400">⚔️ Кланы и Турниры</h2>
              </CardContent>
            </Card>

            <div>
              <h3 className="text-2xl font-bold mb-4">Кланы</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {clans.map(clan => (
                  <Card key={clan.id} className={`border-2 ${user.clan === clan.name ? 'border-green-500' : 'border-gray-700'} bg-gray-900`}>
                    <CardContent className="p-6">
                      <div className="text-6xl text-center mb-3">{clan.icon}</div>
                      <h4 className="text-2xl font-bold text-center mb-2">{clan.name}</h4>
                      <div className="text-sm text-gray-400 mb-4 space-y-1">
                        <p>Участников: {clan.members.toLocaleString()}</p>
                        <p>Мощь: {clan.power.toLocaleString()}</p>
                      </div>
                      <Button 
                        className="w-full"
                        onClick={() => handleJoinClan(clan)}
                        disabled={user.clan === clan.name}
                      >
                        {user.clan === clan.name ? 'В клане' : 'Вступить'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Турниры</h3>
              <div className="space-y-4">
                {tournaments.map(tournament => (
                  <Card key={tournament.id} className="border-2 border-gray-700 bg-gray-900">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div>
                        <h4 className="text-xl font-bold mb-2">{tournament.name}</h4>
                        <div className="text-sm text-gray-400 space-y-1">
                          <p>💰 Приз: {tournament.prize.toLocaleString()} R$</p>
                          <p>👥 Участников: {tournament.participants}</p>
                          <Badge className={tournament.status === 'active' ? 'bg-green-500' : 'bg-blue-500'}>
                            {tournament.status === 'active' ? 'Активен' : 'Скоро'}
                          </Badge>
                        </div>
                      </div>
                      <Button onClick={() => handleJoinTournament(tournament)}>
                        Участвовать
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <Card className="border-2 border-yellow-500 bg-gray-900">
              <CardContent className="p-8">
                <h2 className="text-4xl font-black text-yellow-400 flex items-center gap-3">
                  <Icon name="Trophy" size={40} />
                  Таблица Лидеров
                </h2>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {[...leaderboard, { id: 999, username: user.username, robux: user.robux, level: user.level, avatar: selectedAvatar.emoji, privilege: user.privilege }]
                .sort((a, b) => b.robux - a.robux)
                .map((player, idx) => (
                <Card key={player.id} className={`border-2 ${player.username === user.username ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700 bg-gray-900'}`}>
                  <CardContent className="p-6 flex items-center gap-6">
                    <div className={`text-4xl font-black ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-orange-600' : 'text-gray-500'}`}>
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
                        <span>Уровень {player.level}</span>
                        {player.privilege && (
                          <Badge className={`bg-gradient-to-r ${privileges.find(p => p.id === player.privilege)?.color}`}>
                            {privileges.find(p => p.id === player.privilege)?.icon} {privileges.find(p => p.id === player.privilege)?.name}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {idx === 0 && <Icon name="Trophy" className="text-yellow-500" size={40} />}
                    {idx === 1 && <Icon name="Trophy" className="text-gray-400" size={40} />}
                    {idx === 2 && <Icon name="Trophy" className="text-orange-600" size={40} />}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-800 bg-gray-900 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-400">
          <p className="text-sm">© 2024 FREEROBUX.COM - Бесплатные Robux для всех! 🎮</p>
          <p className="text-xs mt-2">Premium ⭐ | VIP 💎 | Titan 👑</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
