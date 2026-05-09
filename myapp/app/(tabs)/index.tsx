import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Bell, MapPin, Sun, Droplets, Wind, Thermometer,
  Scan, Sprout, ShoppingBag, PhoneCall, ChevronRight, Leaf, CloudRain
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

const CROPS = [
  { name: 'Wheat',   stage: 'Heading',     pct: 72, color: '#f59e0b', bg: '#fffbeb' },
  { name: 'Soybean', stage: 'Flowering',   pct: 50, color: '#10b981', bg: '#ecfdf5' },
  { name: 'Maize',   stage: 'Germination', pct: 15, color: '#f97316', bg: '#fff7ed' },
  { name: 'Chana',   stage: 'Podding',     pct: 85, color: '#8b5cf6', bg: '#f5f3ff' },
];

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }} edges={['top']}>

      {/* ── PREMIUM HEADER ── */}
      <View className="px-6 pt-2 pb-6 flex-row justify-between items-center bg-[#f8fafc]">
        <View className="flex-row items-center gap-4 flex-1">
          {/* Avatar */}
          <View className="w-[50px] h-[50px] rounded-full bg-emerald-100 border-[2px] border-emerald-500 items-center justify-center shadow-sm shadow-emerald-600/20">
            <Text style={{ fontFamily: 'Poppins_900Black', fontSize: 20, color: '#047857' }}>P</Text>
          </View>
          <View>
            <Text className="text-[11px] tracking-widest uppercase text-slate-400"
              style={{ fontFamily: 'Poppins_600SemiBold' }}>Good Morning</Text>
            <Text className="text-[18px] text-slate-900 mt-0.5 tracking-tight"
              style={{ fontFamily: 'Poppins_700Bold' }}>Namaste, Pawan!</Text>
            <View className="flex-row items-center gap-1 mt-1">
              <MapPin color="#059669" size={12} />
              <Text className="text-[12px] text-slate-500"
                style={{ fontFamily: 'Poppins_500Medium' }}>Bhopal, MP</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/alerts')}
          className="w-11 h-11 rounded-full bg-white border border-slate-200 items-center justify-center shadow-sm shadow-slate-200"
        >
          <Bell color="#475569" size={20} />
          {/* Notification Badge */}
          <View className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >

        {/* ── GRADIENT WEATHER CARD (With Soil Moisture Added) ── */}
        <View className="px-5">
          <View className="shadow-xl shadow-emerald-900/30">
            <LinearGradient
              colors={['#065f46', '#047857', '#10b981']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 28, padding: 24 }}
            >
              <View className="flex-row justify-between items-start mb-6">
                <View>
                  <Text className="text-[11px] tracking-[1.5px] uppercase text-emerald-100/80"
                    style={{ fontFamily: 'Poppins_600SemiBold' }}>Farm Climate</Text>
                  <Text className="text-[10px] text-emerald-100/60 mt-1"
                    style={{ fontFamily: 'Poppins_400Regular' }}>Updated just now</Text>
                </View>
                <View className="bg-white/20 rounded-full px-3 py-1.5 border border-white/10 backdrop-blur-md">
                  <Text className="text-[11px] text-white"
                    style={{ fontFamily: 'Poppins_600SemiBold' }}>Real-time</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-4 mb-6">
                <Sun color="#fde047" size={56} strokeWidth={1.5} />
                <View>
                  <View className="flex-row items-start gap-1">
                    <Text style={{ fontFamily: 'Poppins_900Black', fontSize: 54, color: '#fff', lineHeight: 60, letterSpacing: -2 }}>32</Text>
                    <Text className="text-[22px] text-emerald-100 mt-2"
                      style={{ fontFamily: 'Poppins_500Medium' }}>°C</Text>
                  </View>
                  <Text className="text-[13px] text-emerald-50 mt-1"
                    style={{ fontFamily: 'Poppins_400Regular' }}>Mostly Sunny · Feels like 34°</Text>
                </View>
              </View>

              {/* Glassmorphism Metrics Grid (Now 4 Items!) */}
              <View className="flex-row justify-between bg-white/10 rounded-2xl p-4 border border-white/20">
                {[
                  { icon: <CloudRain color="#a7f3d0" size={18} />, val: '45%',    lbl: 'Humid' },
                  { icon: <Wind      color="#a7f3d0" size={18} />, val: '12km',   lbl: 'Wind' },
                  { icon: <Thermometer color="#a7f3d0" size={18} />, val: '30°C', lbl: 'Temp' },
                  { icon: <Droplets  color="#a7f3d0" size={18} />, val: '28%',    lbl: 'Moist' }, // 🚀 SOIL MOISTURE ADDED
                ].map((m, i) => (
                  <View key={i} className="flex-1 items-center gap-1.5">
                    {m.icon}
                    <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 13, color: '#fff' }}>{m.val}</Text>
                    <Text className="text-[9px] text-center uppercase tracking-widest text-emerald-100/80"
                      style={{ fontFamily: 'Poppins_500Medium' }}>{m.lbl}</Text>
                  </View>
                ))}
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* ── QUICK ACTIONS ── */}
        <View className="flex-row justify-between items-center px-6 pt-8 pb-4">
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#0f172a' }}>Quick Actions</Text>
        </View>
        <View className="flex-row flex-wrap px-5 justify-between">
          {[
            { label: 'Crop Scan',   sub: 'AI Disease Check', bg: '#eff6ff', icon: <Scan color="#2563eb" size={22} />,         route: '/scan/scan-result' },
            { label: 'My Farm',     sub: 'Manage 4 Crops',   bg: '#ecfdf5', icon: <Sprout color="#059669" size={22} />,       route: '/farm/my-farm' },
            { label: 'Agri Store',  sub: 'Buy Fertilizers',  bg: '#fff7ed', icon: <ShoppingBag color="#ea580c" size={22} />, route: '/shop/find-store' },
            { label: 'Expert Call', sub: 'Agronomist Help',  bg: '#f5f3ff', icon: <PhoneCall color="#7c3aed" size={22} />,   route: '/expert/expert-help' },
          ].map((a, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => router.push(a.route as any)}
              className="bg-white rounded-3xl p-4 shadow-sm shadow-slate-200 border border-slate-100 mb-3"
              style={{ width: '48%' }}
            >
              <View className="w-[46px] h-[46px] rounded-2xl items-center justify-center mb-3"
                style={{ backgroundColor: a.bg }}>
                {a.icon}
              </View>
              <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 14, color: '#1e293b' }}>{a.label}</Text>
              <Text className="text-[11px] text-slate-500 mt-1 leading-4"
                style={{ fontFamily: 'Poppins_400Regular' }}>{a.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── MY CROPS ── */}
        <View className="flex-row justify-between items-center px-6 pt-6 pb-4">
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#0f172a' }}>My Crops</Text>
          <TouchableOpacity onPress={() => router.push('/farm/manage-crops')}>
            <Text className="text-[13px] text-emerald-600" style={{ fontFamily: 'Poppins_600SemiBold' }}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingBottom: 10 }}>
          {CROPS.map((c, i) => (
            <View key={i}
              className="bg-white rounded-[24px] p-4 w-[160px] shadow-sm shadow-slate-200 border border-slate-100">
              <View className="flex-row justify-between items-center mb-3">
                <View className="w-8 h-8 rounded-full items-center justify-center" style={{ backgroundColor: c.bg }}>
                  <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                </View>
                <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 14, color: c.color }}>{c.pct}%</Text>
              </View>
              
              <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#1e293b' }}>{c.name}</Text>
              <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 11, color: '#64748b', marginTop: 2, marginBottom: 10 }}>
                {c.stage}
              </Text>
              
              <View className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <View style={{ width: `${c.pct}%`, height: '100%', backgroundColor: c.color, borderRadius: 4 }} />
              </View>
            </View>
          ))}
        </ScrollView>

        {/* ── FARM STATUS ALERTS ── */}
        <View className="flex-row justify-between items-center px-6 pt-6 pb-4">
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#0f172a' }}>Farm Status</Text>
        </View>
        <View className="px-5 gap-3">
          
          <TouchableOpacity className="bg-white rounded-2xl p-4 flex-row items-center gap-4 shadow-sm shadow-slate-200 border border-slate-100 overflow-hidden">
            <View className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />
            <View className="w-12 h-12 rounded-full bg-amber-50 items-center justify-center">
              <Droplets color="#d97706" size={22} />
            </View>
            <View className="flex-1">
              <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 15, color: '#1e293b' }}>Low Soil Moisture</Text>
              <Text className="text-[12px] text-slate-500 mt-1 leading-4"
                style={{ fontFamily: 'Poppins_400Regular' }}>Zone A (Wheat) requires irrigation in the next 2 hours.</Text>
            </View>
            <ChevronRight color="#cbd5e1" size={20} />
          </TouchableOpacity>

          <TouchableOpacity className="bg-white rounded-2xl p-4 flex-row items-center gap-4 shadow-sm shadow-slate-200 border border-slate-100 overflow-hidden">
            <View className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
            <View className="w-12 h-12 rounded-full bg-emerald-50 items-center justify-center">
              <Leaf color="#059669" size={22} />
            </View>
            <View className="flex-1">
              <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 15, color: '#1e293b' }}>Crops are Healthy</Text>
              <Text className="text-[12px] text-slate-500 mt-1 leading-4"
                style={{ fontFamily: 'Poppins_400Regular' }}>No diseases detected in recent AI scans. Keep it up!</Text>
            </View>
            <ChevronRight color="#cbd5e1" size={20} />
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}