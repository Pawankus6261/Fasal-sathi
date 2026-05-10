import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { 
  ArrowLeft, 
  CloudLightning, 
  Droplets, 
  AlertTriangle, 
  CheckCircle2,
  BellRing
} from 'lucide-react-native';

// 🚀 1. TypeScript Interface (Fix: Error 7006 & 7031)
interface AlertItem {
  id: string;
  type: 'weather' | 'critical' | 'irrigation' | 'success' | string;
  title: string;
  description: string;
  time: string;
  isUnread: boolean;
}

export default function AlertsScreen() {
  const router = useRouter();

  // 🚀 2. Data ko AlertItem type assign kiya
  const alertsData: AlertItem[] = [
    {
      id: '1',
      type: 'weather',
      title: 'Bhari Barish Ki Sambhavna 🌧️',
      description: 'Agle 2 ghante mein Bhopal mein bhari barish ho sakti hai. Kripya irrigation pump band hi rakhein.',
      time: '10 mins ago',
      isUnread: true,
    },
    {
      id: '2',
      type: 'critical',
      title: 'Pichheti Jhulsa (Late Blight) Alert ⚠️',
      description: 'Aapke pados ke khet mein Late Blight detect hua hai. Apne Tamatar ki fasal ka dhyan rakhein aur scan karein.',
      time: '1 hour ago',
      isUnread: true,
    },
    {
      id: '3',
      type: 'irrigation',
      title: 'Pump Auto-Started 💧',
      description: 'Mitti ki nami (moisture) 30% se kam ho gayi thi. Smart pump automatically ON kar diya gaya hai.',
      time: '3 hours ago',
      isUnread: false,
    },
    {
      id: '4',
      type: 'success',
      title: 'Fasal Sathi Report 🌱',
      description: 'Pichle hafte ka crop health score 92/100 raha. Aapki fasal ekdum swasth hai!',
      time: 'Yesterday',
      isUnread: false,
    }
  ];

  // 🚀 3. Parameter 'type' ko string type diya (Fix: Error 7006)
  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'weather':
        return { bg: 'bg-blue-100', icon: <CloudLightning size={24} color="#2563eb" /> };
      case 'critical':
        return { bg: 'bg-rose-100', icon: <AlertTriangle size={24} color="#e11d48" /> };
      case 'irrigation':
        return { bg: 'bg-cyan-100', icon: <Droplets size={24} color="#0891b2" /> };
      case 'success':
        return { bg: 'bg-emerald-100', icon: <CheckCircle2 size={24} color="#10b981" /> };
      default:
        return { bg: 'bg-slate-100', icon: <BellRing size={24} color="#64748b" /> };
    }
  };

  // 🚀 4. 'item' aur 'index' ko proper types diye (Fix: Error 7031)
  const renderAlertItem = ({ item, index }: { item: AlertItem; index: number }) => {
    const style = getAlertStyle(item.type);

    return (
      <Animated.View entering={FadeInDown.duration(400).delay(index * 100).springify()}>
        <TouchableOpacity 
          activeOpacity={0.7}
          className={`mx-5 mb-3 p-4 rounded-3xl flex-row items-start border ${
            item.isUnread ? 'bg-white border-emerald-100 shadow-sm shadow-emerald-100/50' : 'bg-slate-50/50 border-slate-100'
          }`}
        >
          {/* Icon Badge */}
          <View className={`w-14 h-14 rounded-full items-center justify-center mr-4 ${style.bg}`}>
            {style.icon}
          </View>

          {/* Alert Content */}
          <View className="flex-1">
            <View className="flex-row justify-between items-start mb-1">
              <Text 
                className={`flex-1 text-base font-black ${item.isUnread ? 'text-slate-800' : 'text-slate-600'}`}
                numberOfLines={1}
              >
                {item.title}
              </Text>
              
              {/* Unread Indicator Dot */}
              {item.isUnread && (
                <View className="w-2.5 h-2.5 bg-emerald-500 rounded-full ml-2 mt-1.5" />
              )}
            </View>

            <Text 
              className={`text-sm leading-relaxed mb-2 ${item.isUnread ? 'text-slate-600 font-medium' : 'text-slate-500'}`}
            >
              {item.description}
            </Text>

            <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {item.time}
            </Text>
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
        <View className="px-5 py-4 flex-row items-center justify-between z-10">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => router.back()} 
              className="w-10 h-10 bg-white rounded-full items-center justify-center border border-emerald-100 shadow-sm"
            >
              <ArrowLeft size={22} color="#475569" />
            </TouchableOpacity>
            <Text className="text-xl font-black text-slate-800 ml-4">Alerts & Updates</Text>
          </View>

          {/* Mark all as read button */}
          <TouchableOpacity className="bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            <Text className="text-emerald-700 text-xs font-bold">Mark all read</Text>
          </TouchableOpacity>
        </View>

        {/* ALERTS LIST */}
        <FlatList
          data={alertsData}
          keyExtractor={(item) => item.id}
          renderItem={renderAlertItem}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="items-center justify-center mt-20 px-10">
              <View className="w-24 h-24 bg-slate-100 rounded-full items-center justify-center mb-4">
                <BellRing size={40} color="#cbd5e1" />
              </View>
              <Text className="text-lg font-bold text-slate-700 text-center mb-2">No New Alerts</Text>
              <Text className="text-sm text-slate-500 text-center">
                Aapki fasal aur pump bilkul theek kaam kar rahe hain. Koi nayi update aayegi toh hum aapko bata denge!
              </Text>
            </View>
          }
        />

      </SafeAreaView>
    </View>
  );
}