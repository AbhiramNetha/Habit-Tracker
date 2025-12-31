import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import { Trophy, Flame, Zap, Star, Target, TrendingUp, Award, Crown, Rocket, Brain, Activity, Calendar, Lock, Unlock, Sparkles } from 'lucide-react';

// Particle System Component
const ParticleField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// Animated Badge Component
const AnimatedBadge = ({ icon: Icon, label, value, color, delay = 0 }) => (
  <div 
    className="relative group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
    <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <p className="text-white/60 text-sm font-medium mb-1">{label}</p>
          <p className="text-white text-4xl font-black tracking-tight">{value}</p>
        </div>
      </div>
      <div className="absolute top-2 right-2">
        <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
      </div>
    </div>
  </div>
);

// 3D Habit Card
const HabitCard3D = ({ habit, isCompleted, onToggle, streak, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500" />
      
      {/* Main card */}
      <div className={`relative bg-gradient-to-br ${
        isCompleted 
          ? 'from-emerald-900/50 to-green-900/50 border-emerald-500/50' 
          : 'from-slate-900/50 to-slate-800/50 border-white/10'
      } backdrop-blur-2xl border-2 rounded-3xl p-6 transition-all duration-500 ${
        isHovered ? 'transform scale-105' : ''
      }`}>
        
        {/* Streak badge */}
        {streak > 0 && (
          <div className="absolute -top-3 -right-3 z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-lg animate-pulse" />
              <div className="relative bg-gradient-to-r from-orange-500 to-red-500 rounded-full px-4 py-2 flex items-center gap-2 shadow-2xl border-2 border-orange-300">
                <Flame className="w-5 h-5 text-white animate-bounce" />
                <span className="text-white font-black text-lg">{streak}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-6">
          {/* Checkbox */}
          <button
            onClick={onToggle}
            className={`relative w-20 h-20 rounded-2xl border-4 flex items-center justify-center transition-all duration-500 transform ${
              isCompleted
                ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400 scale-100 rotate-0'
                : 'border-white/20 hover:border-white/40 hover:scale-110 hover:rotate-6'
            }`}
          >
            {isCompleted && (
              <svg className="w-12 h-12 text-white animate-checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {!isCompleted && (
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm" />
            )}
          </button>

          {/* Habit info */}
          <div className="flex-1">
            <h3 className="text-white text-2xl font-bold mb-2">{habit.name}</h3>
            <div className="flex items-center gap-4">
              <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                habit.category === 'fitness' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                habit.category === 'learning' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                habit.category === 'wellness' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                habit.category === 'skill' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                'bg-pink-500/20 text-pink-300 border border-pink-500/30'
              }`}>
                {habit.category}
              </span>
              {streak > 7 && <Award className="w-5 h-5 text-yellow-400 animate-pulse" />}
              {streak > 30 && <Crown className="w-5 h-5 text-yellow-400 animate-bounce" />}
            </div>
          </div>

          {/* Delete button */}
          <button
            onClick={onDelete}
            className="px-6 py-3 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-xl font-semibold transition-all duration-300 hover:scale-110 border border-red-500/30"
          >
            Delete
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transition-all duration-1000 ${
              isCompleted ? 'w-full' : 'w-0'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

// Level System Component
const LevelSystem = ({ totalCompleted }) => {
  const level = Math.floor(totalCompleted / 50) + 1;
  const progress = (totalCompleted % 50) / 50 * 100;

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-gradient-x" />
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center border-4 border-yellow-300 shadow-2xl animate-pulse">
              <span className="text-white text-3xl font-black">{level}</span>
            </div>
            <div>
              <h3 className="text-white text-3xl font-black">Level {level}</h3>
              <p className="text-white/60">Habit Master</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-sm mb-1">Next Level</p>
            <p className="text-white text-2xl font-bold">{50 - (totalCompleted % 50)} habits</p>
          </div>
        </div>
        
        <div className="relative h-6 bg-black/50 rounded-full overflow-hidden border border-white/20">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-1000 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-shimmer" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-sm">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Achievement Popup
const AchievementPopup = ({ achievement, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
    <div className="relative z-10 max-w-md w-full">
      <div className="relative">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-2xl animate-pulse" />
        
        {/* Card */}
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border-4 border-yellow-400 rounded-3xl p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 animate-bounce">
              <Trophy className="w-20 h-20 text-white" />
            </div>
          </div>
          
          <h2 className="text-white text-4xl font-black mb-4">🎉 ACHIEVEMENT!</h2>
          <p className="text-yellow-300 text-2xl font-bold mb-2">{achievement.title}</p>
          <p className="text-white/80 text-lg mb-6">{achievement.description}</p>
          
          <button
            onClick={onClose}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
          >
            AWESOME!
          </button>
        </div>
      </div>
    </div>
  </div>
);

const MeSupremeTrackerV2 = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [habits, setHabits] = useState([
    { id: 1, name: '🏋️ Beast Mode Workout', category: 'fitness', target: 60, difficulty: 'hard' },
    { id: 2, name: '📚 Knowledge Acquisition', category: 'learning', target: 30, difficulty: 'medium' },
    { id: 3, name: '🧘 Zen Mastery', category: 'wellness', target: 20, difficulty: 'easy' },
    { id: 4, name: '💻 Code Warrior', category: 'skill', target: 90, difficulty: 'hard' },
    { id: 5, name: '🎯 Dominate Goals', category: 'productivity', target: 120, difficulty: 'hard' },
    { id: 6, name: '💧 Hydration Station', category: 'wellness', target: 8, difficulty: 'easy' }
  ]);
  const [habitData, setHabitData] = useState({});
  const [newHabit, setNewHabit] = useState('');
  const [selectedView, setSelectedView] = useState('command-center');
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [achievementPopup, setAchievementPopup] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const saved = localStorage.getItem('meSupremeV2Data');
    if (saved) {
      const data = JSON.parse(saved);
      setHabits(data.habits || habits);
      setHabitData(data.habitData || {});
    }
  };

  const saveData = () => {
    localStorage.setItem('meSupremeV2Data', JSON.stringify({ habits, habitData }));
  };

  useEffect(() => {
    saveData();
  }, [habits, habitData]);

  const getDateKey = (date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  };

  const checkAchievements = (habitId) => {
    const streak = calculateStreak(habitId);
    const habit = habits.find(h => h.id === habitId);
    
    if (streak === 7) {
      setAchievementPopup({
        title: '🔥 WEEK WARRIOR',
        description: `7-day streak on ${habit.name}!`
      });
      triggerConfetti();
    } else if (streak === 30) {
      setAchievementPopup({
        title: '👑 MONTH MASTER',
        description: `30-day streak on ${habit.name}!`
      });
      triggerConfetti();
    } else if (streak === 100) {
      setAchievementPopup({
        title: '💎 CENTURY CHAMPION',
        description: `100-day streak on ${habit.name}!`
      });
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const toggleHabit = (habitId, dateKey) => {
    setHabitData(prev => {
      const newData = {
        ...prev,
        [habitId]: {
          ...prev[habitId],
          [dateKey]: !prev[habitId]?.[dateKey]
        }
      };
      return newData;
    });
    
    setTimeout(() => checkAchievements(habitId), 100);
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      const newId = Math.max(...habits.map(h => h.id), 0) + 1;
      setHabits([...habits, { 
        id: newId, 
        name: newHabit, 
        category: 'custom',
        target: 30,
        difficulty: 'medium'
      }]);
      setNewHabit('');
      setShowAddHabit(false);
    }
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id));
    const newData = { ...habitData };
    delete newData[id];
    setHabitData(newData);
  };

  const calculateStreak = (habitId) => {
    const today = new Date();
    let streak = 0;
    let currentDay = new Date(today);
    
    while (true) {
      const key = getDateKey(currentDay);
      if (habitData[habitId]?.[key]) {
        streak++;
        currentDay.setDate(currentDay.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const getMonthData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const data = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateKey = getDateKey(date);
      
      let completed = 0;
      habits.forEach(habit => {
        if (habitData[habit.id]?.[dateKey]) completed++;
      });
      
      data.push({
        day: day,
        completed: completed,
        total: habits.length,
        rate: habits.length > 0 ? Math.round((completed / habits.length) * 100) : 0
      });
    }
    return data;
  };

  const getProductivityInsights = () => {
    const monthData = getMonthData();
    const recentDays = monthData.slice(-7);
    
    const avgCompletion = recentDays.reduce((sum, day) => sum + day.rate, 0) / recentDays.length;
    const trend = recentDays.length > 1 ? recentDays[recentDays.length - 1].rate - recentDays[0].rate : 0;
    
    const totalCompleted = monthData.reduce((sum, day) => sum + day.completed, 0);
    
    return {
      avgCompletion: Math.round(avgCompletion),
      trend: Math.round(trend),
      totalCompleted,
      longestStreak: Math.max(...habits.map(h => calculateStreak(h.id)), 0)
    };
  };

  const insights = getProductivityInsights();
  const monthData = getMonthData();
  const todayKey = getDateKey(new Date());
  const completedToday = habits.filter(h => habitData[h.id]?.[todayKey]).length;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />
      
      {/* Particle field */}
      <ParticleField />

      {/* Grid overlay */}
      <div className="fixed inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#95E1D3', '#F38181'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto">
        {/* Epic Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="text-[20rem] font-black text-white/5">WIN</div>
          </div>
          
          <div className="relative">
            <h1 className="text-8xl md:text-9xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-gradient-x" 
                style={{ fontFamily: "'Orbitron', sans-serif" }}>
              HABIT TRACKER
            </h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-1 w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
              <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
              <div className="h-1 w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            </div>
            <p className="text-3xl font-bold text-white/90 tracking-wider">
              CONSISTENCY -<span className="text-yellow-400 animate-pulse"> - DISCIPLINE</span>
            </p>
            <p className="text-3xl font-bold text-white/90 tracking-wider">
              THERE IS NO TOMORROW ~ <span className="text-yellow-400 animate-pulse">Abhiram Netha</span>
            </p>
          </div>
        </div>

        {/* Navigation with 3D effect */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {[
            { id: 'command-center', label: '⚡ COMMAND CENTER', icon: Rocket },
            { id: 'battle-station', label: '🎯 BATTLE STATION', icon: Target },
            { id: 'analytics-lab', label: '📊 ANALYTICS LAB', icon: Brain },
            { id: 'trophy-room', label: '🏆 TROPHY ROOM', icon: Trophy }
          ].map((view, idx) => (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id)}
              className={`group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                selectedView === view.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl scale-105'
                  : 'bg-black/40 text-white/70 hover:bg-black/60 border border-white/10'
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              <span className="relative flex items-center gap-2">
                <view.icon className="w-5 h-5" />
                {view.label}
              </span>
            </button>
          ))}
        </div>

        {/* Command Center View */}
        {selectedView === 'command-center' && (
          <div className="space-y-8 animate-slideInUp">
            {/* Level System */}
            <LevelSystem totalCompleted={insights.totalCompleted} />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatedBadge 
                icon={Target} 
                label="Total Habits" 
                value={habits.length}
                color="from-blue-500 to-cyan-500"
                delay={0}
              />
              <AnimatedBadge 
                icon={Zap} 
                label="Today" 
                value={`${completedToday}/${habits.length}`}
                color="from-green-500 to-emerald-500"
                delay={100}
              />
              <AnimatedBadge 
                icon={Flame} 
                label="Best Streak" 
                value={insights.longestStreak}
                color="from-orange-500 to-red-500"
                delay={200}
              />
              <AnimatedBadge 
                icon={TrendingUp} 
                label="Momentum" 
                value={`${insights.trend >= 0 ? '+' : ''}${insights.trend}%`}
                color={insights.trend >= 0 ? "from-purple-500 to-pink-500" : "from-gray-500 to-gray-600"}
                delay={300}
              />
            </div>

            {/* Add Habit Section */}
            <div className="relative">
              <button
                onClick={() => setShowAddHabit(!showAddHabit)}
                className="w-full p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border-2 border-dashed border-purple-500/50 rounded-3xl hover:border-purple-500 transition-all duration-300 hover:scale-[1.02] group"
              >
                <span className="text-white text-2xl font-bold flex items-center justify-center gap-3">
                  <Sparkles className="w-8 h-8 group-hover:rotate-180 transition-transform duration-500" />
                  {showAddHabit ? 'CLOSE' : 'ADD NEW HABIT'}
                  <Sparkles className="w-8 h-8 group-hover:rotate-180 transition-transform duration-500" />
                </span>
              </button>

              {showAddHabit && (
                <div className="mt-6 p-6 bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl animate-slideInUp">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={newHabit}
                      onChange={(e) => setNewHabit(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addHabit()}
                      placeholder="New Habit ni add cheyyadam kadhu---- consistent vundu mowaaa!!!!!!!, All the best"
                      className="flex-1 px-6 py-4 bg-white/5 border-2 border-white/20 rounded-2xl text-white text-lg placeholder-white/40 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
                    />
                    <button
                      onClick={addHabit}
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
                    >
                      Lets GO mowa
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Habits List */}
            <div className="space-y-6">
              {habits.map((habit, idx) => (
                <div
                  key={habit.id}
                  style={{ animationDelay: `${idx * 100}ms` }}
                  className="animate-slideInUp"
                >
                  <HabitCard3D
                    habit={habit}
                    isCompleted={habitData[habit.id]?.[todayKey]}
                    onToggle={() => toggleHabit(habit.id, todayKey)}
                    streak={calculateStreak(habit.id)}
                    onDelete={() => deleteHabit(habit.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Battle Station (Calendar) */}
        {selectedView === 'battle-station' && (
          <div className="animate-slideInUp">
            <div className="relative bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-8">
              <h2 className="text-4xl font-black text-white mb-8 flex items-center gap-4">
                <Calendar className="w-10 h-10 text-purple-400" />
                CALENDER
              </h2>
              
              <div className="grid grid-cols-7 gap-3">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                  <div key={day} className="text-center text-white/60 font-bold text-lg py-4">
                    {day}
                  </div>
                ))}
                
                {monthData.map((data, idx) => (
                  <div
                    key={idx}
                    className="aspect-square relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                    <div className={`relative h-full rounded-2xl border-2 p-4 transition-all duration-300 group-hover:scale-110 ${
                      data.rate === 100 ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400' :
                      data.rate >= 75 ? 'bg-gradient-to-br from-blue-500 to-cyan-600 border-blue-400' :
                      data.rate >= 50 ? 'bg-gradient-to-br from-yellow-500 to-orange-600 border-yellow-400' :
                      data.rate >= 25 ? 'bg-gradient-to-br from-orange-500 to-red-600 border-orange-400' :
                      'bg-black/50 border-white/10'
                    }`}>
                      <div className="text-white font-bold text-lg">{data.day}</div>
                      <div className="text-white/80 text-sm mt-1">{data.rate}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Lab */}
        {selectedView === 'analytics-lab' && (
          <div className="space-y-8 animate-slideInUp">
            <div className="relative bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-8">
              <h2 className="text-4xl font-black text-white mb-8 flex items-center gap-4">
                <Activity className="w-10 h-10 text-purple-400" />
                PERFORMANCE METRICS
              </h2>
              
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={monthData}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.9)', 
                      border: '2px solid rgba(139, 92, 246, 0.5)',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#8B5CF6" 
                    fillOpacity={1} 
                    fill="url(#colorRate)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Trophy Room */}
        {selectedView === 'trophy-room' && (
          <div className="animate-slideInUp">
            <div className="relative bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-8">
              <h2 className="text-4xl font-black text-white mb-8 flex items-center gap-4">
                <Trophy className="w-10 h-10 text-yellow-400" />
                TROPHY ROOM
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {habits.map(habit => {
                  const streak = calculateStreak(habit.id);
                  return (
                    <div key={habit.id} className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-yellow-400/30 rounded-2xl p-6 group-hover:border-yellow-400 transition-all">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                            {streak >= 100 ? <Crown className="w-8 h-8 text-white" /> :
                             streak >= 30 ? <Award className="w-8 h-8 text-white" /> :
                             streak >= 7 ? <Star className="w-8 h-8 text-white" /> :
                             <Lock className="w-8 h-8 text-white/50" />}
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-lg">{habit.name}</h3>
                            <p className="text-yellow-400 font-bold">{streak} day streak</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className={`flex items-center gap-2 ${streak >= 7 ? 'text-green-400' : 'text-white/30'}`}>
                            {streak >= 7 ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                            <span className="text-sm">Week Warrior (7 days)</span>
                          </div>
                          <div className={`flex items-center gap-2 ${streak >= 30 ? 'text-green-400' : 'text-white/30'}`}>
                            {streak >= 30 ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                            <span className="text-sm">Month Master (30 days)</span>
                          </div>
                          <div className={`flex items-center gap-2 ${streak >= 100 ? 'text-green-400' : 'text-white/30'}`}>
                            {streak >= 100 ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                            <span className="text-sm">Century Champion (100 days)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Achievement Popup */}
      {achievementPopup && (
        <AchievementPopup
          achievement={achievementPopup}
          onClose={() => setAchievementPopup(null)}
        />
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes checkmark {
          0% { transform: scale(0) rotate(-45deg); }
          50% { transform: scale(1.2) rotate(-45deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-checkmark {
          animation: checkmark 0.5s ease-out;
        }
        
        .animate-shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 2s infinite;
        }
        
        .animate-confetti {
          animation: confetti forwards;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default MeSupremeTrackerV2;