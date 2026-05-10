import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { 
  ArrowLeft, 
  AlertOctagon, 
  ShieldCheck, 
  Leaf, 
  Thermometer, 
  Droplets,
  MessageSquare,
  ShoppingBag
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ScanResultScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Dummy Data
  const scanData = {
    disease: "Late Blight",
    localName: "Pichheti Jhulsa",
    confidence: 94,
    severity: "Critical",
    crop: "Tomato",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=800&auto=format&fit=crop",
    treatment: "Spray Mancozeb 75% WP (2-2.5g/L water) immediately to halt fungal spread.",
    prevention: "Improve field drainage and maintain proper plant spacing for aeration."
  };

  const isSevere = scanData.severity === 'Critical';

  return (
    <View className="flex-1 bg-[#F8FFF4]">
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* 1. EDGE-TO-EDGE HEADER IMAGE */}
      <View className="relative h-[35vh] w-full bg-slate-900">
        <Image 
          source={{ uri: scanData.image }} 
          style={{ width: '100%', height: '100%', opacity: 0.8 }}
          contentFit="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'transparent', '#F8FFF4']}
          locations={[0, 0.5, 1]}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />
        
        {/* Transparent Header Actions */}
        <SafeAreaView className="absolute top-0 w-full px-5 flex-row justify-between items-center z-20">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="w-10 h-10 rounded-full bg-black/30 items-center justify-center backdrop-blur-md border border-white/20"
          >
            <ArrowLeft size={22} color="white" />
          </TouchableOpacity>
          <View className="bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20">
            <Text className="text-white text-xs font-bold tracking-widest uppercase">AI Analysis</Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 120 }}
        className="-mt-10 z-10"
      >
        {/* 2. OVERLAPPING DIAGNOSIS CARD (Animated) */}
        <Animated.View 
          entering={FadeInDown.duration(600).springify()}
          className="bg-white mx-4 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-50"
        >
          <View className="flex-row justify-between items-start">
            <View className="flex-1 pr-2">
              <View className="flex-row items-center mb-1">
                <Leaf size={14} color="#10b981" />
                <Text className="text-emerald-600 font-bold text-xs uppercase tracking-wider ml-1">
                  {scanData.crop}
                </Text>
              </View>
              <Text className="text-3xl font-black text-slate-900 leading-tight">
                {scanData.disease}
              </Text>
              <Text className="text-sm font-medium text-slate-500 mt-0.5">
                Also known as: {scanData.localName}
              </Text>
            </View>

            {/* Severity Badge */}
            <View className={`items-center px-3 py-2.5 rounded-2xl ${isSevere ? 'bg-rose-50' : 'bg-amber-50'}`}>
              <AlertOctagon size={24} color={isSevere ? "#e11d48" : "#d97706"} />
              <Text className={`text-[10px] font-black uppercase mt-1 ${isSevere ? 'text-rose-600' : 'text-amber-600'}`}>
                {scanData.severity}
              </Text>
            </View>
          </View>

          <View className="h-[1px] bg-slate-100 my-5" />

          {/* Key Metrics Row */}
          <View className="flex-row justify-between">
            <View className="flex-1 items-center border-r border-slate-100">
              <ShieldCheck size={22} color="#10b981" />
              <Text className="text-xl font-black text-slate-800 mt-1">{scanData.confidence}%</Text>
              <Text className="text-[10px] font-bold text-slate-400 uppercase">Confidence</Text>
            </View>
            <View className="flex-1 items-center border-r border-slate-100">
              <Thermometer size={22} color="#f59e0b" />
              <Text className="text-xl font-black text-slate-800 mt-1">High</Text>
              <Text className="text-[10px] font-bold text-slate-400 uppercase">Spread Risk</Text>
            </View>
            <View className="flex-1 items-center">
              <Droplets size={22} color="#3b82f6" />
              <Text className="text-xl font-black text-slate-800 mt-1">Stop</Text>
              <Text className="text-[10px] font-bold text-slate-400 uppercase">Irrigation</Text>
            </View>
          </View>
        </Animated.View>

        {/* 3. ACTION PLAN SECTION */}
        <Animated.View entering={FadeInDown.duration(700).delay(200).springify()} className="px-4 mt-6">
          <Text className="text-lg font-black text-slate-800 mb-3 ml-1">Treatment Plan</Text>
          
          <View className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            {/* Treatment */}
            <View className="flex-row">
              <View className="items-center mr-4">
                <View className="w-10 h-10 rounded-full bg-emerald-100 items-center justify-center border-2 border-emerald-50">
                  <Text className="text-emerald-700 font-black">1</Text>
                </View>
                <View className="w-0.5 h-12 bg-emerald-100 my-1" />
              </View>
              <View className="flex-1 pt-1">
                <Text className="text-sm font-black text-slate-800 mb-1">Immediate Action</Text>
                <Text className="text-sm font-medium text-slate-600 leading-relaxed">
                  {scanData.treatment}
                </Text>
              </View>
            </View>

            {/* Prevention */}
            <View className="flex-row">
              <View className="items-center mr-4">
                <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center border-2 border-slate-50">
                  <Text className="text-slate-500 font-black">2</Text>
                </View>
              </View>
              <View className="flex-1 pt-1">
                <Text className="text-sm font-black text-slate-800 mb-1">Preventive Care</Text>
                <Text className="text-sm font-medium text-slate-600 leading-relaxed">
                  {scanData.prevention}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* 4. FLOATING ACTION BAR (FAB) */}
      <Animated.View 
        entering={FadeIn.duration(800).delay(400)}
        style={{ paddingBottom: Math.max(insets.bottom + 10, 20) }}
        className="absolute bottom-0 left-0 right-0 px-4 items-center pointer-events-box-none"
      >
        <View className="flex-row bg-slate-900/95 backdrop-blur-xl rounded-full p-2 w-full max-w-sm shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-slate-700/50">
          
          <TouchableOpacity className="flex-1 flex-row items-center justify-center py-3.5 rounded-full bg-slate-800/80 mr-2">
            <MessageSquare size={18} color="#e2e8f0" />
            <Text className="ml-2 font-bold text-slate-200 text-sm">Ask Expert</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-[1.2] flex-row items-center justify-center py-3.5 rounded-full bg-[#10b981] shadow-lg shadow-emerald-500/40">
            <ShoppingBag size={18} color="white" />
            <Text className="ml-2 font-bold text-white text-sm">Get Medicine</Text>
          </TouchableOpacity>

        </View>
      </Animated.View>

    </View>
  );
}