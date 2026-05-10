import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming, 
  withSpring 
} from 'react-native-reanimated';
import { Sprout, ArrowLeft, Home } from 'lucide-react-native';

export default function ComingSoonScreen() {
  const router = useRouter();

  // Floating Animation values
  const translateY = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    // Sprout ko hawa mein float karwane ka smooth animation
    translateY.value = withRepeat(
      withSequence(
        withTiming(-15, { duration: 1500 }),
        withTiming(0, { duration: 1500 })
      ),
      -1, // Infinite loop
      true
    );

    // Entry par thoda pop-up effect
    scale.value = withSpring(1, { damping: 10, stiffness: 80 });
  }, []);

  const floatingStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale.value }
      ],
    };
  });

  return (
    <View className="flex-1 bg-[#F8FFF4]">
      <StatusBar barStyle="dark-content" backgroundColor="#F8FFF4" translucent={false} />
      
      <SafeAreaView className="flex-1 flex-col justify-between" edges={['top', 'bottom']}>
        
        {/* HEADER */}
        <View className="px-5 py-4 flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="w-10 h-10 bg-white rounded-full items-center justify-center border border-emerald-100 shadow-sm"
          >
            <ArrowLeft size={22} color="#475569" />
          </TouchableOpacity>
        </View>

        {/* MAIN CONTENT */}
        <View className="flex-1 items-center justify-center px-6 pb-20">
          
          {/* Animated Sprout Icon (Beej ug raha hai) */}
          <Animated.View 
            style={floatingStyle}
            className="w-40 h-40 bg-emerald-100 rounded-full items-center justify-center border-4 border-white shadow-lg shadow-emerald-200/50 mb-8"
          >
            <View className="w-32 h-32 bg-emerald-200 rounded-full items-center justify-center border-4 border-emerald-50">
              <Sprout size={64} color="#10b981" />
            </View>
          </Animated.View>

          {/* Typography */}
          <View className="items-center">
            <View className="bg-amber-100 px-3 py-1.5 rounded-full mb-4">
              <Text className="text-amber-700 font-bold text-xs tracking-widest uppercase">Work in Progress</Text>
            </View>
            
            <Text className="text-3xl font-black text-slate-800 text-center leading-tight mb-3">
              Abhi Beej Boya Hai!
            </Text>
            
            <Text className="text-base font-medium text-slate-500 text-center px-4 leading-relaxed">
              Fasal Sathi ki team is naye feature par lagataar kaam kar rahi hai. Jaldi hi ye aapki kheti ko aur asaan banane ke liye yahan ug aayega! 🌱
            </Text>
          </View>
        </View>

        {/* BOTTOM ACTION BUTTONS */}
       <View className="px-6 pb-6">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="w-full bg-[#10b981] flex-row items-center justify-center py-4 rounded-2xl shadow-lg shadow-emerald-500/30"
          >
            <ArrowLeft size={20} color="white" />
            <Text className="ml-2 font-bold text-white text-base tracking-wide">Go Back</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
}