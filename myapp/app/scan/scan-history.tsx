import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { 
  ArrowLeft, 
  Calendar, 
  ChevronRight, 
  AlertOctagon, 
  ShieldCheck,
  Activity
} from 'lucide-react-native';

// 🚀 1. TypeScript Model (Isse 'any' wale errors khatam ho jayenge)
interface HistoryItem {
  id: string;
  crop: string;
  disease: string;
  date: string;
  severity: 'Critical' | 'Medium' | 'Safe' | string;
  image: string;
}

export default function ScanHistoryScreen() {
  const router = useRouter();

  // 🚀 2. Data ko interface assign kiya
  const historyData: HistoryItem[] = [
    {
      id: '1',
      crop: 'Tomato',
      disease: 'Late Blight (Pichheti Jhulsa)',
      date: '10 May 2026 • 10:30 AM',
      severity: 'Critical',
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '2',
      crop: 'Wheat',
      disease: 'Brown Rust',
      date: '08 May 2026 • 02:15 PM',
      severity: 'Medium',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '3',
      crop: 'Potato',
      disease: 'Healthy Crop',
      date: '05 May 2026 • 09:00 AM',
      severity: 'Safe',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop',
    }
  ];

  // 🚀 3. Severity parameter ko type diya (Fix: Error 7006)
  const getSeverityUI = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return { color: '#e11d48', bg: 'bg-rose-50', icon: <AlertOctagon size={16} color="#e11d48" /> };
      case 'Medium':
        return { color: '#d97706', bg: 'bg-amber-50', icon: <Activity size={16} color="#d97706" /> };
      case 'Safe':
      default:
        return { color: '#10b981', bg: 'bg-emerald-50', icon: <ShieldCheck size={16} color="#10b981" /> };
    }
  };

  // 🚀 4. Render params ko type kiya (Fix: Error 7031)
  const renderHistoryCard = ({ item, index }: { item: HistoryItem; index: number }) => {
    const ui = getSeverityUI(item.severity);

    return (
      <Animated.View entering={FadeInDown.duration(500).delay(index * 150).springify()}>
        <TouchableOpacity 
          // 🚀 5. Fixed Route Path (Fix: Error 2345)
          // Note: '/scan/scan-result' use karein aur leading slash '/' zaroori hai
          onPress={() => router.push('/scan/scan-result' as any)} 
          activeOpacity={0.7}
          className="bg-white mx-5 mb-4 p-3 rounded-2xl flex-row items-center shadow-sm border border-slate-100"
        >
          
          {/* Thumbnail Image */}
          <View className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100">
            <Image 
              source={{ uri: item.image }} 
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
          </View>

          {/* Details */}
          <View className="flex-1 ml-4 justify-center">
            <Text className="text-sm font-black text-slate-800 mb-0.5" numberOfLines={1}>
              {item.crop}: {item.disease}
            </Text>
            
            <View className="flex-row items-center mb-1.5">
              <Calendar size={12} color="#64748b" />
              <Text className="text-xs font-medium text-slate-500 ml-1.5">
                {item.date}
              </Text>
            </View>

            {/* Severity Badge */}
            <View className={`flex-row items-center self-start px-2 py-1 rounded-md ${ui.bg}`}>
              {ui.icon}
              <Text style={{ color: ui.color }} className="text-[10px] font-bold uppercase ml-1">
                {item.severity}
              </Text>
            </View>
          </View>

          {/* View Arrow */}
          <View className="w-8 h-8 rounded-full bg-slate-50 items-center justify-center border border-slate-100 ml-2">
            <ChevronRight size={18} color="#94a3b8" />
          </View>

        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 bg-[#F8FFF4]">
      <StatusBar barStyle="dark-content" backgroundColor="#F8FFF4" translucent={false} />
      
      <SafeAreaView className="flex-1" edges={['top']}>
        
        {/* HEADER */}
        <View className="px-5 py-4 flex-row items-center bg-[#F8FFF4] z-10">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="w-10 h-10 bg-white rounded-full items-center justify-center border border-emerald-100 shadow-sm"
          >
            <ArrowLeft size={22} color="#475569" />
          </TouchableOpacity>
          <Text className="text-xl font-black text-slate-800 ml-4">Scan History</Text>
        </View>

        {/* LIST */}
        <FlatList
          data={historyData}
          keyExtractor={(item) => item.id}
          renderItem={renderHistoryCard}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="items-center justify-center mt-20 px-10">
              <View className="w-24 h-24 bg-slate-100 rounded-full items-center justify-center mb-4">
                <AlertOctagon size={40} color="#cbd5e1" />
              </View>
              <Text className="text-lg font-bold text-slate-700 text-center mb-2">No Scans Yet</Text>
              <Text className="text-sm text-slate-500 text-center">
                Aapne abhi tak kisi fasal ko scan nahi kiya hai.
              </Text>
            </View>
          }
        />

      </SafeAreaView>
    </View>
  );
}