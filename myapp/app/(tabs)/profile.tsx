import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, Settings, ChevronRight, MapPin, 
  Sprout, ShoppingBag, Globe, CloudRain, 
  Headset, LogOut, Tractor
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

const W = { 
  Regular: 'Poppins_400Regular', 
  SemiBold: 'Poppins_600SemiBold', 
  Bold: 'Poppins_700Bold', 
  Black: 'Poppins_900Black' 
};

export default function FarmerProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }} edges={['top']}>
      
      {/* ── HEADER ── */}
      <View className="px-6 py-4 bg-white flex-row justify-between items-center border-b border-slate-100">
        <Text style={{ fontFamily: W.Black, fontSize: 24, color: '#0f172a' }}>My Farm Profile</Text>
        <TouchableOpacity className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center border border-slate-200">
          <Settings size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        
        {/* ── FARMER INFO CARD ── */}
        <View className="px-6 pt-6">
          <View className="bg-emerald-600 rounded-[32px] p-6 shadow-md shadow-emerald-900/20 items-center">
            
            {/* Profile Avatar */}
            <View className="relative">
              <View className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-white items-center justify-center shadow-lg">
                <Tractor size={40} color="#059669" />
              </View>
              {/* Verified Badge */}
              <View className="absolute bottom-0 right-0 w-8 h-8 bg-amber-500 rounded-full border-4 border-white items-center justify-center">
                <Sprout size={14} color="white" />
              </View>
            </View>

            <Text style={{ fontFamily: W.Black, fontSize: 24, color: '#ffffff' }} className="mt-4">Ram Singh</Text>
            <Text style={{ fontFamily: W.Regular, fontSize: 13, color: '#ecfdf5' }} className="mt-0.5">Fasal Sathi ID: #FS-8492</Text>
            
            <View className="flex-row items-center mt-3 bg-white/20 px-4 py-2 rounded-full border border-white/10">
              <MapPin size={14} color="#a7f3d0" />
              <Text style={{ fontFamily: W.SemiBold, fontSize: 13, color: '#ecfdf5' }} className="ml-2">
                Sehore, Madhya Pradesh
              </Text>
            </View>
          </View>
        </View>

        {/* ── FARM STATS ── */}
        <View className="flex-row px-6 mt-6 justify-between">
          {[
            { label: 'Farm Size', val: '12 Acres', icon: <Globe size={18} color="#0ea5e9" />, bg: 'bg-blue-50' },
            { label: 'Active Crops', val: '4 Crops', icon: <Sprout size={18} color="#10b981" />, bg: 'bg-emerald-50' },
            { label: 'IoT Sensors', val: '2 Devices', icon: <CloudRain size={18} color="#8b5cf6" />, bg: 'bg-purple-50' },
          ].map((stat, i) => (
            <View key={i} className="w-[31%] py-4 rounded-2xl border border-slate-100 bg-white items-center shadow-sm shadow-slate-100">
              <View className={`w-10 h-10 ${stat.bg} rounded-full items-center justify-center mb-2`}>
                {stat.icon}
              </View>
              <Text style={{ fontFamily: W.Bold, fontSize: 12, color: '#0f172a' }}>{stat.val}</Text>
              <Text style={{ fontFamily: W.Regular, fontSize: 10, color: '#94a3b8' }} className="mt-0.5">{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* ── ACCOUNT SETTINGS ── */}
        <View className="px-6 mt-8">
          <Text style={{ fontFamily: W.Bold, fontSize: 18, color: '#0f172a' }} className="mb-4">Account & Settings</Text>
          <View className="bg-white rounded-[28px] border border-slate-100 shadow-sm shadow-slate-200 overflow-hidden">
            {[
              { label: 'Personal Information', icon: <User size={20} color="#059669" />, sub: 'Update phone & address' },
              { label: 'App Language', icon: <Globe size={20} color="#0ea5e9" />, sub: 'English, Hindi, Marathi' },
              { label: 'My Orders', icon: <ShoppingBag size={20} color="#f59e0b" />, sub: 'Fertilizers & Seeds' },
              { label: 'Help & Support', icon: <Headset size={20} color="#8b5cf6" />, sub: 'Call Kisan Center' },
            ].map((item, i, arr) => (
              <TouchableOpacity 
                key={i} 
                className={`flex-row items-center justify-between p-5 ${i !== arr.length - 1 ? 'border-b border-slate-50' : ''}`}
              >
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 rounded-full bg-slate-50 items-center justify-center">
                    {item.icon}
                  </View>
                  <View className="ml-4 flex-1">
                    <Text style={{ fontFamily: W.Bold, fontSize: 15, color: '#1e293b' }}>{item.label}</Text>
                    <Text style={{ fontFamily: W.Regular, fontSize: 12, color: '#64748b' }} className="mt-0.5">{item.sub}</Text>
                  </View>
                </View>
                <ChevronRight size={20} color="#cbd5e1" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── LOGOUT BUTTON ── */}
        <View className="px-6 mt-8">
          <TouchableOpacity className="bg-rose-50 border border-rose-100 py-4 rounded-2xl items-center flex-row justify-center">
            <LogOut size={18} color="#e11d48" />
            <Text style={{ fontFamily: W.Bold, fontSize: 15, color: '#e11d48' }} className="ml-2">Logout</Text>
          </TouchableOpacity>
          <Text style={{ fontFamily: W.Regular, fontSize: 11, color: '#94a3b8', textAlign: 'center' }} className="mt-4">
            Fasal Sathi v1.0.2 • Made in India 🇮🇳
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}