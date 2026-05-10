import React, { useState, useEffect } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, TextInput, 
  StatusBar, Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { 
  ArrowLeft, Edit3, Save, Sprout, Calendar, Maximize, 
  Activity, ScanLine, ClipboardList, AlertTriangle, Droplets
} from 'lucide-react-native';

// 🚀 Crop Data Interface
interface CropData {
  id: string;
  name: string;
  variety: string;
  area: string;
  planted: string;
  harvest: string;
  health: 'Excellent' | 'Good' | 'Needs Attention' | string;
}

// 🚀 Mock Database (Syncs with My Farm page)
const cropDB: Record<string, CropData> = {
  '1': { id: '1', name: 'Wheat', variety: 'Sharbati', area: '5', planted: '15 Nov 2025', harvest: '10 Apr 2026', health: 'Excellent' },
  '2': { id: '2', name: 'Soybean', variety: 'JS 335', area: '4', planted: '05 Jul 2025', harvest: '20 Oct 2025', health: 'Good' },
  '3': { id: '3', name: 'Tomato', variety: 'Hybrid-89', area: '3.5', planted: '10 Jan 2026', harvest: '15 May 2026', health: 'Needs Attention' }
};

export default function CropDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Route se ID aayegi
  
  const [isEditing, setIsEditing] = useState(false);
  const [crop, setCrop] = useState<CropData | null>(null);

  // Load data on mount based on ID
  useEffect(() => {
    if (id && typeof id === 'string' && cropDB[id]) {
      setCrop(cropDB[id]);
    } else {
      // Fallback agar direct open ho jaye
      setCrop(cropDB['1']);
    }
  }, [id]);

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert("Crop Updated", "Aapki fasal ki details successfully update ho gayi hain! 🌱");
  };

  if (!crop) return null; // Loading state

  return (
    <View className="flex-1 bg-[#F4F8F1]">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <SafeAreaView className="flex-1" edges={['top']}>
        
        {/* ── HEADER ── */}
        <View className="px-5 py-4 flex-row items-center justify-between bg-white border-b border-slate-200 z-10">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => router.back()} 
              className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center border border-slate-200"
            >
              <ArrowLeft size={22} color="#475569" />
            </TouchableOpacity>
            <View className="ml-4">
              <Text className="text-xl font-black text-slate-800">Crop Details</Text>
              <Text className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{crop.name} Management</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            onPress={() => isEditing ? handleSave() : setIsEditing(true)}
            activeOpacity={0.8}
            className={`flex-row items-center px-4 py-2.5 rounded-2xl shadow-sm ${isEditing ? 'bg-[#10b981]' : 'bg-blue-50 border border-blue-100'}`}
          >
            {isEditing ? <Save size={18} color="white" /> : <Edit3 size={18} color="#3b82f6" />}
            <Text className={`font-bold ml-2 ${isEditing ? 'text-white' : 'text-blue-600'}`}>
              {isEditing ? 'Save' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingTop: 24, paddingBottom: 80 }}>
          
          {/* 1. CROP HERO SECTION */}
          <Animated.View entering={FadeInDown.duration(400)}>
            <View className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm mb-6 items-center">
              <View className="w-20 h-20 bg-amber-50 rounded-full items-center justify-center mb-4 border-4 border-white shadow-sm">
                <Sprout size={40} color="#f59e0b" />
              </View>
              {isEditing ? (
                <TextInput 
                  value={crop.name} 
                  onChangeText={(val: string) => setCrop({...crop, name: val})}
                  className="text-2xl font-black text-slate-800 text-center bg-slate-50 px-4 py-2 rounded-xl w-full border border-slate-200 mb-2"
                />
              ) : (
                <Text className="text-2xl font-black text-slate-800">{crop.name}</Text>
              )}
              
              <View className={`px-3 py-1.5 rounded-lg mt-2 ${crop.health === 'Excellent' ? 'bg-emerald-100' : crop.health === 'Good' ? 'bg-blue-100' : 'bg-rose-100'}`}>
                <Text className={`text-xs font-black uppercase ${crop.health === 'Excellent' ? 'text-emerald-700' : crop.health === 'Good' ? 'text-blue-700' : 'text-rose-700'}`}>
                  Status: {crop.health}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* 2. CROP INFORMATION */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <Text className="text-slate-400 font-bold text-[11px] uppercase mb-3 ml-2 tracking-widest">Crop Information</Text>
            <View className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm mb-6">
              
              <View className="flex-row gap-3 mb-4">
                <View className="flex-1">
                  <EditableField 
                    label="Variety/Seed Name" 
                    value={crop.variety} 
                    icon={<Sprout size={16} color="#84cc16" />} 
                    isEditing={isEditing} 
                    onChange={(val: string) => setCrop({...crop, variety: val})} 
                  />
                </View>
                <View className="flex-1">
                  <EditableField 
                    label="Planted Area (Acres)" 
                    value={crop.area} 
                    icon={<Maximize size={16} color="#3b82f6" />} 
                    isEditing={isEditing} 
                    onChange={(val: string) => setCrop({...crop, area: val})} 
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1">
                  <EditableField 
                    label="Sowing Date" 
                    value={crop.planted} 
                    icon={<Calendar size={16} color="#8b5cf6" />} 
                    isEditing={isEditing} 
                    onChange={(val: string) => setCrop({...crop, planted: val})} 
                  />
                </View>
                <View className="flex-1">
                  <EditableField 
                    label="Est. Harvest Date" 
                    value={crop.harvest} 
                    icon={<Calendar size={16} color="#f43f5e" />} 
                    isEditing={isEditing} 
                    onChange={(val: string) => setCrop({...crop, harvest: val})} 
                  />
                </View>
              </View>
            </View>
          </Animated.View>

          {/* 3. HEALTH & NUTRIENTS (Only editable in edit mode) */}
          {isEditing && (
             <Animated.View entering={FadeInDown.duration(400).delay(200)}>
               <Text className="text-slate-400 font-bold text-[11px] uppercase mb-3 ml-2 tracking-widest">Update Health Status</Text>
               <View className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm mb-6">
                 <EditableField 
                    label="Current Health Condition" 
                    value={crop.health} 
                    icon={<Activity size={16} color="#10b981" />} 
                    isEditing={isEditing} 
                    onChange={(val: string) => setCrop({...crop, health: val})} 
                  />
               </View>
             </Animated.View>
          )}

          {/* 4. QUICK MANAGE ACTIONS (Visible only in View Mode) */}
          {!isEditing && (
            <Animated.View entering={FadeInDown.duration(400).delay(200)}>
              <Text className="text-slate-400 font-bold text-[11px] uppercase mb-3 ml-2 tracking-widest">Manage Tasks</Text>
              
              <View className="flex-row flex-wrap justify-between gap-y-3">
                
                {/* Scan Action */}
                <TouchableOpacity 
                  onPress={() => router.push('/(tabs)/scanner' as any)}
                  activeOpacity={0.7} 
                  className="w-[48%] bg-emerald-50 p-4 rounded-[24px] border border-emerald-100 items-center justify-center shadow-sm"
                >
                  <ScanLine size={24} color="#10b981" className="mb-2" />
                  <Text className="text-emerald-800 font-bold text-sm text-center">Scan Crop</Text>
                  <Text className="text-emerald-600/70 text-[9px] font-bold uppercase mt-1">Check Disease</Text>
                </TouchableOpacity>

                {/* Add Fertilizer Action */}
                <TouchableOpacity 
                  onPress={() => Alert.alert("Coming Soon", "Fertilizer logs feature jaldi aayega!")}
                  activeOpacity={0.7} 
                  className="w-[48%] bg-blue-50 p-4 rounded-[24px] border border-blue-100 items-center justify-center shadow-sm"
                >
                  <Droplets size={24} color="#3b82f6" className="mb-2" />
                  <Text className="text-blue-800 font-bold text-sm text-center">Add Nutrient</Text>
                  <Text className="text-blue-600/70 text-[9px] font-bold uppercase mt-1">Log Fertilizer</Text>
                </TouchableOpacity>

                {/* Report Issue Action */}
                <TouchableOpacity 
                  onPress={() => Alert.alert("Coming Soon", "Disease reporting form jaldi aayega!")}
                  activeOpacity={0.7} 
                  className="w-[48%] bg-rose-50 p-4 rounded-[24px] border border-rose-100 items-center justify-center shadow-sm"
                >
                  <AlertTriangle size={24} color="#f43f5e" className="mb-2" />
                  <Text className="text-rose-800 font-bold text-sm text-center">Report Issue</Text>
                  <Text className="text-rose-600/70 text-[9px] font-bold uppercase mt-1">Pests / Damage</Text>
                </TouchableOpacity>

                {/* Growth Logs Action */}
                <TouchableOpacity 
                  onPress={() => Alert.alert("Coming Soon", "Weekly growth logs jaldi aayenge!")}
                  activeOpacity={0.7} 
                  className="w-[48%] bg-amber-50 p-4 rounded-[24px] border border-amber-100 items-center justify-center shadow-sm"
                >
                  <ClipboardList size={24} color="#f59e0b" className="mb-2" />
                  <Text className="text-amber-800 font-bold text-sm text-center">View Logs</Text>
                  <Text className="text-amber-600/70 text-[9px] font-bold uppercase mt-1">Growth History</Text>
                </TouchableOpacity>

              </View>
            </Animated.View>
          )}

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ─── REUSABLE EDITABLE FIELD COMPONENT ───
const EditableField = ({ label, value, icon, isEditing, onChange, keyboardType = "default" }: any) => (
  <View>
    <Text className="text-slate-400 text-[10px] font-bold mb-1.5 uppercase tracking-wide">{label}</Text>
    <View className={`flex-row items-center px-3 py-3 rounded-xl border ${isEditing ? 'bg-white border-blue-200 shadow-sm' : 'bg-slate-50 border-slate-100'}`}>
      {icon}
      {isEditing ? (
        <TextInput 
          value={value} 
          onChangeText={onChange} 
          keyboardType={keyboardType}
          className="flex-1 ml-2 font-black text-slate-800 text-[13px] p-0" 
        />
      ) : (
        <Text className="flex-1 ml-2 font-black text-slate-800 text-[13px]">{value}</Text>
      )}
    </View>
  </View>
);