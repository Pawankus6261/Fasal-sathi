import { View, Text, ScrollView, TouchableOpacity, Switch, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { 
  Droplets, Clock, RefreshCw, AlertTriangle, 
  Activity, Zap, Play, Timer, Calendar, Droplets as WaterDrop, Bell 
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// ✅ Correct Import
import { setupNotifications, sendAlertNotification } from '../../utils/notifications';

const { width } = Dimensions.get('window');

const W = { 
  Regular: 'Poppins_400Regular', 
  SemiBold: 'Poppins_600SemiBold', 
  Bold: 'Poppins_700Bold', 
  Black: 'Poppins_900Black' 
};

export default function IrrigationScreen() {
  const [isAuto, setIsAuto] = useState(true);
  const [zones, setZones] = useState([
    { 
      id: 1, name: 'Zone A', crop: 'Wheat Field', moisture: 28, 
      on: true, status: 'critical', flow: '320 L/h', duration: '45m left',
      lastIrrigated: 'Today, 06:00 AM' 
    },
    { 
      id: 2, name: 'Zone B', crop: 'Soybean', moisture: 52, 
      on: false, status: 'safe', flow: '0 L/h', duration: 'Scheduled',
      lastIrrigated: 'Yesterday, 18:30 PM' 
    },
  ]);

  // 🚀 1. App khulte hi notification permissions aur sound channel set karein
  useEffect(() => {
    setupNotifications();
  }, []);

  // 🚀 2. Ye function test notification bhejega
  const handleTestAlert = async () => {
    await sendAlertNotification(
      "Zone A Critical ⚠️", 
      "Moisture level 30% se kam ho gaya hai. Smart Pump chalu kar diya gaya hai."
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }} edges={['top']}>
      
      {/* ── STICKY HEADER ── */}
      <View className="px-6 py-4 bg-white flex-row justify-between items-center border-b border-slate-100">
        <View>
          <Text style={{ fontFamily: W.Black, fontSize: 26, color: '#0f172a' }}>Irrigation</Text>
          <Text style={{ fontFamily: W.Regular, fontSize: 13, color: '#64748b' }}>Smart Water Control</Text>
        </View>
        <View className="flex-row gap-3">
          
          {/* 🚀 3. TEST NOTIFICATION BUTTON (Red Bell Icon) */}
          <TouchableOpacity 
            onPress={handleTestAlert}
            className="w-10 h-10 bg-rose-50 rounded-full items-center justify-center border border-rose-100 shadow-sm"
          >
            <Bell size={18} color="#e11d48" />
          </TouchableOpacity>

          <TouchableOpacity className="w-10 h-10 bg-emerald-50 rounded-full items-center justify-center border border-emerald-100">
            <RefreshCw size={18} color="#059669" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        
        {/* ── POWER OVERVIEW CARD ── */}
        <LinearGradient
          colors={['#064e3b', '#065f46', '#059669']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 32, padding: 24, marginBottom: 28 }}
          className="shadow-2xl shadow-emerald-900/40"
        >
          <View className="flex-row justify-between items-center mb-8">
            <View className="bg-white/10 px-4 py-2 rounded-2xl border border-white/20 backdrop-blur-md">
              <View className="flex-row items-center">
                <Activity size={14} color="#a7f3d0" />
                <Text className="ml-2 text-emerald-50 text-[11px]" style={{ fontFamily: W.Bold }}>AI OPTIMIZED</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-white text-[13px]" style={{ fontFamily: W.SemiBold }}>{isAuto ? 'Auto' : 'Manual'}</Text>
              <Switch 
                value={isAuto} 
                onValueChange={setIsAuto}
                trackColor={{ false: '#064e3b', true: '#fff' }}
                thumbColor={isAuto ? '#059669' : '#f1f5f9'}
              />
            </View>
          </View>

          <View className="flex-row justify-between items-end">
            <View>
              <Text className="text-emerald-200/60 text-[10px] uppercase tracking-[2px]" style={{ fontFamily: W.Bold }}>Today's Consumption</Text>
              <View className="flex-row items-baseline mt-1">
                <Text className="text-white text-5xl" style={{ fontFamily: W.Black }}>1.2k</Text>
                <Text className="text-emerald-200 text-lg ml-1" style={{ fontFamily: W.Bold }}>Liters</Text>
              </View>
            </View>
            <View className="bg-black/20 p-3 rounded-2xl border border-white/5">
              <Clock size={20} color="#fff" />
              <Text className="text-white text-[14px] mt-1" style={{ fontFamily: W.Bold }}>16:30</Text>
            </View>
          </View>
        </LinearGradient>

        {/* ── ACTIONABLE ZONES ── */}
        <View className="flex-row justify-between items-center mb-5 px-1">
          <Text style={{ fontFamily: W.Bold, fontSize: 20, color: '#1e293b' }}>Control Center</Text>
          <TouchableOpacity className="flex-row items-center">
            <Timer size={14} color="#059669" />
            <Text className="text-emerald-600 text-[12px] ml-1" style={{ fontFamily: W.Bold }}>Set Timers</Text>
          </TouchableOpacity>
        </View>
        
        {zones.map((zone) => (
          <View 
            key={zone.id} 
            className="bg-white rounded-[32px] p-6 mb-5 border border-slate-100 shadow-sm shadow-slate-300/30"
          >
            <View className="flex-row justify-between items-start mb-6">
              <View className="flex-row items-center">
                <View className={`w-14 h-14 rounded-3xl items-center justify-center ${zone.status === 'critical' ? 'bg-amber-100' : 'bg-emerald-100'}`}>
                  <Droplets color={zone.status === 'critical' ? '#b45309' : '#059669'} size={28} />
                </View>
                <View className="ml-4">
                  <Text style={{ fontFamily: W.Bold, fontSize: 18, color: '#0f172a' }}>{zone.name}</Text>
                  <Text style={{ fontFamily: W.SemiBold, fontSize: 13, color: '#94a3b8' }}>{zone.crop}</Text>
                </View>
              </View>
              <TouchableOpacity 
                activeOpacity={0.7}
                className={`w-12 h-12 rounded-full items-center justify-center shadow-lg ${zone.on ? 'bg-emerald-500 shadow-emerald-500/40' : 'bg-slate-100'}`}
              >
                <Play size={20} color={zone.on ? '#fff' : '#94a3b8'} fill={zone.on ? '#fff' : 'transparent'} />
              </TouchableOpacity>
            </View>

            <View className="mb-6">
              <View className="flex-row justify-between mb-2 px-1">
                <Text style={{ fontFamily: W.SemiBold, fontSize: 12, color: '#64748b' }}>Soil Moisture</Text>
                <Text style={{ fontFamily: W.Bold, fontSize: 12, color: zone.moisture < 30 ? '#ef4444' : '#059669' }}>{zone.moisture}%</Text>
              </View>
              <View className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <View 
                  style={{ width: `${zone.moisture}%`, backgroundColor: zone.moisture < 30 ? '#ef4444' : '#10b981' }} 
                  className="h-full rounded-full" 
                />
              </View>
            </View>

            <View className="pt-5 border-t border-slate-50">
              <View className="flex-row items-center mb-3 px-1">
                <Calendar size={12} color="#94a3b8" />
                <Text className="ml-1.5" style={{ fontFamily: W.SemiBold, fontSize: 12, color: '#64748b' }}>
                  Last watered: <Text style={{ color: '#334155' }}>{zone.lastIrrigated}</Text>
                </Text>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-5">
                  <View className="flex-row items-center">
                    <Zap size={14} color="#94a3b8" />
                    <Text className="ml-1.5" style={{ fontFamily: W.Bold, fontSize: 14, color: '#1e293b' }}>{zone.flow}</Text>
                  </View>
                  <View className="w-1 h-1 rounded-full bg-slate-300" />
                  <View className="flex-row items-center">
                    <Clock size={14} color="#94a3b8" />
                    <Text className="ml-1.5" style={{ fontFamily: W.Bold, fontSize: 14, color: '#1e293b' }}>{zone.duration}</Text>
                  </View>
                </View>
                
                {zone.status === 'critical' && (
                  <View className="bg-amber-500 px-3 py-1.5 rounded-2xl flex-row items-center">
                    <AlertTriangle size={12} color="#fff" />
                    <Text className="ml-1.5 text-white text-[10px]" style={{ fontFamily: W.Bold }}>CRITICAL</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        ))}

        {/* ── SMART SCHEDULE CARD ── */}
        <View className="bg-blue-50 rounded-[32px] p-6 border border-blue-100 shadow-sm shadow-blue-200/40 mb-5">
          <View className="flex-row items-center mb-2">
            <View className="bg-blue-200 p-2 rounded-full mr-3">
              <WaterDrop size={18} color="#1d4ed8" />
            </View>
            <View>
              <Text style={{ fontFamily: W.Bold, fontSize: 16, color: '#1e3a8a' }}>Next Scheduled Auto-Run</Text>
              <Text style={{ fontFamily: W.SemiBold, fontSize: 12, color: '#3b82f6' }}>AI based on weather forecast</Text>
            </View>
          </View>
          
          <View className="mt-4 bg-white rounded-2xl p-4 flex-row justify-between items-center shadow-sm shadow-blue-100">
            <View>
              <Text style={{ fontFamily: W.Bold, fontSize: 14, color: '#334155' }}>Zone B (Soybean)</Text>
              <Text style={{ fontFamily: W.Regular, fontSize: 12, color: '#64748b' }}>Tomorrow at 05:30 AM</Text>
            </View>
            <View className="bg-blue-100 px-3 py-1.5 rounded-full">
              <Text style={{ fontFamily: W.Bold, fontSize: 11, color: '#1d4ed8' }}>45 Mins</Text>
            </View>
          </View>
        </View>

        {/* ── WEEKLY WATER ANALYTICS ── */}
        <View className="bg-white rounded-[32px] p-7 border border-slate-100 shadow-sm shadow-slate-300/30">
           <View className="flex-row justify-between items-center mb-8">
              <View>
                <Text style={{ fontFamily: W.Bold, fontSize: 18, color: '#1e293b' }}>Water Usage</Text>
                <Text style={{ fontFamily: W.Regular, fontSize: 11, color: '#94a3b8' }}>Weekly trend analysis</Text>
              </View>
              <TouchableOpacity className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <Text style={{ fontFamily: W.Bold, fontSize: 11, color: '#059669' }}>EXPORT</Text>
              </TouchableOpacity>
           </View>
           
           <View className="flex-row items-end justify-between h-24 mb-4 px-2">
              {[35, 60, 45, 90, 55, 40, 100].map((h, i) => (
                <View key={i} className="items-center">
                  <View 
                    className="w-3 rounded-full" 
                    style={{ 
                      height: `${h}%`, 
                      backgroundColor: i === 6 ? '#10b981' : '#f1f5f9',
                      shadowColor: i === 6 ? '#10b981' : 'transparent',
                      shadowOpacity: 0.3, shadowRadius: 5, elevation: i === 6 ? 5 : 0
                    }} 
                  />
                  <Text className="mt-3 text-slate-400 text-[10px]" style={{ fontFamily: W.Bold }}>{['M','T','W','T','F','S','S'][i]}</Text>
                </View>
              ))}
           </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}