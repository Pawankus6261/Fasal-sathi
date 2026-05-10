import React, { useState } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, TextInput, 
  StatusBar, Alert, Switch 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { 
  ArrowLeft, Save, MapPin, Maximize, Trash2, Edit3, 
  User, Hash, Crosshair, Map, Globe, Droplets, 
  Zap, Leaf, ChevronDown
} from 'lucide-react-native';

export default function EditFarmScreen() {
  const router = useRouter();

  // 🚀 State with default values
  const [formData, setFormData] = useState({
    farmName: "Kushwaha Farms",
    ownerName: "Pawan Kushwaha",
    farmId: "FS-MP-2026-892",
    address: "Village Goharganj",
    district: "Bhopal, MP",
    pincode: "462046",
    latitude: "23.2599° N",
    longitude: "77.4126° E",
    area: "12.5",
    soilType: "Black Cotton Soil",
    topography: "Flat",
    waterSource: "Borewell (Deep)",
    pumpPower: "5 HP",
    isSmartPumpActive: true,
    nitrogen: "45",
    phosphorus: "30",
    potassium: "25"
  });

  const handleSave = () => {
    Alert.alert("Success", "Farm ki saari advanced details save ho chuki hain! 🌾", [
      { text: "Awesome", onPress: () => router.back() }
    ]);
  };

  return (
    <View className="flex-1 bg-[#F4F8F1]">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <SafeAreaView className="flex-1" edges={['top']}>
        
        {/* ── HEADER ── */}
        <View className="px-5 py-4 flex-row items-center justify-between border-b border-slate-200 bg-white shadow-sm z-10">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => router.back()} 
              className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center border border-slate-200"
            >
              <ArrowLeft size={22} color="#475569" />
            </TouchableOpacity>
            <View className="ml-4">
              <Text className="text-xl font-black text-slate-800">Advanced Setup</Text>
              <Text className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Farm Configuration</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            onPress={handleSave}
            activeOpacity={0.8}
            className="flex-row items-center bg-[#10b981] px-5 py-2.5 rounded-2xl shadow-lg shadow-emerald-200"
          >
            <Save size={18} color="white" />
            <Text className="text-white font-bold ml-2">Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        >

          {/* 1. FARM IDENTITY */}
          <Animated.View entering={FadeInDown.duration(400)}>
            <SectionHeader title="Farm Identity" />
            <View className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm mb-6">
              <InputField 
                label="Farm Name" 
                value={formData.farmName} 
                icon={<Edit3 size={18} color="#94a3b8" />} 
                onChange={(val: string) => setFormData({...formData, farmName: val})} 
              />
              <InputField 
                label="Owner Name" 
                value={formData.ownerName} 
                icon={<User size={18} color="#94a3b8" />} 
                onChange={(val: string) => setFormData({...formData, ownerName: val})} 
              />
              <InputField 
                label="Farm Registration ID" 
                value={formData.farmId} 
                icon={<Hash size={18} color="#94a3b8" />} 
                onChange={(val: string) => setFormData({...formData, farmId: val})} 
              />
            </View>
          </Animated.View>

          {/* 2. GEOLOCATION & MAPPING */}
          <Animated.View entering={FadeInDown.duration(400).delay(100)}>
            <SectionHeader title="Geolocation & Address" />
            <View className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm mb-6">
              <InputField 
                label="Street / Village Address" 
                value={formData.address} 
                icon={<MapPin size={18} color="#f43f5e" />} 
                onChange={(val: string) => setFormData({...formData, address: val})} 
              />
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <InputField label="District/State" value={formData.district} icon={<Globe size={18} color="#94a3b8" />} onChange={(val: string) => setFormData({...formData, district: val})} />
                </View>
                <View className="flex-1">
                  <InputField label="Pincode" value={formData.pincode} icon={<Map size={18} color="#94a3b8" />} onChange={(val: string) => setFormData({...formData, pincode: val})} />
                </View>
              </View>

              {/* GPS Coordinates */}
              <View className="mt-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <Text className="text-slate-500 text-[10px] font-bold uppercase mb-3">GPS Coordinates</Text>
                <View className="flex-row gap-3 mb-4">
                  <View className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 flex-row items-center">
                    <Crosshair size={14} color="#3b82f6" />
                    <TextInput value={formData.latitude} onChangeText={(val: string) => setFormData({...formData, latitude: val})} className="ml-2 font-bold text-slate-700 text-xs flex-1" />
                  </View>
                  <View className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 flex-row items-center">
                    <Crosshair size={14} color="#3b82f6" />
                    <TextInput value={formData.longitude} onChangeText={(val: string) => setFormData({...formData, longitude: val})} className="ml-2 font-bold text-slate-700 text-xs flex-1" />
                  </View>
                </View>
                <TouchableOpacity className="bg-blue-50 py-3 rounded-xl border border-blue-100 flex-row justify-center items-center">
                  <MapPin size={16} color="#3b82f6" />
                  <Text className="text-blue-600 font-bold ml-2">Pick on Map</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>

          {/* 3. LAND PROFILE */}
          <Animated.View entering={FadeInDown.duration(400).delay(200)}>
            <SectionHeader title="Land Profile" />
            <View className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm mb-6">
              <InputField 
                label="Total Area (Acres)" 
                value={formData.area} 
                icon={<Maximize size={18} color="#10b981" />} 
                onChange={(val: string) => setFormData({...formData, area: val})} 
                keyboardType="numeric"
              />
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <DropdownField label="Soil Type" value={formData.soilType} icon={<Leaf size={18} color="#84cc16" />} />
                </View>
                <View className="flex-1">
                  <DropdownField label="Topography" value={formData.topography} icon={<Globe size={18} color="#8b5cf6" />} />
                </View>
              </View>
            </View>
          </Animated.View>

          {/* 4. IRRIGATION & HARDWARE */}
          <Animated.View entering={FadeInDown.duration(400).delay(300)}>
            <SectionHeader title="Irrigation & Hardware" />
            <View className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm mb-6">
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <DropdownField label="Water Source" value={formData.waterSource} icon={<Droplets size={18} color="#0ea5e9" />} />
                </View>
                <View className="flex-1">
                  <DropdownField label="Pump Capacity" value={formData.pumpPower} icon={<Zap size={18} color="#eab308" />} />
                </View>
              </View>

              {/* Smart Automation Toggle */}
              <View className="mt-4 bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex-row items-center justify-between">
                <View className="flex-1 pr-4">
                  <Text className="text-emerald-900 font-black text-sm">Smart Automation</Text>
                  <Text className="text-emerald-700/70 text-[10px] font-bold mt-1 leading-tight">Allow AI to auto-start pump based on soil moisture sensors.</Text>
                </View>
                <Switch 
                  value={formData.isSmartPumpActive} 
                  onValueChange={(val: boolean) => setFormData({...formData, isSmartPumpActive: val})} 
                  trackColor={{ false: '#cbd5e1', true: '#34d399' }}
                  thumbColor={formData.isSmartPumpActive ? '#10b981' : '#f8fafc'}
                />
              </View>
            </View>
          </Animated.View>

          {/* 5. SOIL NUTRIENTS */}
          <Animated.View entering={FadeInDown.duration(400).delay(400)}>
            <SectionHeader title="Soil Nutrients (N-P-K)" />
            <View className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm mb-6">
              <View className="flex-row gap-4">
                <View className="flex-1"><NutrientField label="Nitrogen (N)" value={formData.nitrogen} onChange={(val: string) => setFormData({...formData, nitrogen: val})} /></View>
                <View className="flex-1"><NutrientField label="Phos. (P)" value={formData.phosphorus} onChange={(val: string) => setFormData({...formData, phosphorus: val})} /></View>
                <View className="flex-1"><NutrientField label="Potas. (K)" value={formData.potassium} onChange={(val: string) => setFormData({...formData, potassium: val})} /></View>
              </View>
            </View>
          </Animated.View>

          {/* 6. DANGER ZONE */}
          <Animated.View entering={FadeInDown.duration(400).delay(500)}>
            <TouchableOpacity 
              onPress={() => Alert.alert("Warning", "Kya aap farm ka saara data reset karna chahte hain?")}
              className="bg-rose-50 border border-rose-100 p-5 rounded-[28px] flex-row items-center justify-center mb-4"
            >
              <Trash2 size={20} color="#e11d48" />
              <Text className="text-rose-600 font-bold ml-2 text-base">Reset All Farm Data</Text>
            </TouchableOpacity>
          </Animated.View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ─── REUSABLE COMPONENTS ───

const SectionHeader = ({ title }: { title: string }) => (
  <Text className="text-slate-400 font-bold text-[11px] uppercase mb-3 ml-2 tracking-widest">{title}</Text>
);

const InputField = ({ label, value, icon, onChange, keyboardType = "default" }: any) => (
  <View className="mb-4">
    <Text className="text-slate-500 text-[11px] font-bold mb-2 ml-1">{label}</Text>
    <View className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 flex-row items-center">
      {icon}
      <TextInput 
        value={value} 
        onChangeText={onChange} 
        keyboardType={keyboardType}
        className="flex-1 ml-3 font-bold text-slate-800 text-[15px]" 
      />
    </View>
  </View>
);

const DropdownField = ({ label, value, icon }: any) => (
  <View className="mb-4">
    <Text className="text-slate-500 text-[11px] font-bold mb-2 ml-1">{label}</Text>
    <TouchableOpacity className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 flex-row items-center justify-between">
      <View className="flex-row items-center flex-1">
        {icon}
        <Text className="ml-3 font-bold text-slate-800 text-[14px] flex-1" numberOfLines={1}>{value}</Text>
      </View>
      <ChevronDown size={16} color="#94a3b8" />
    </TouchableOpacity>
  </View>
);

const NutrientField = ({ label, value, onChange }: any) => (
  <View>
    <Text className="text-slate-500 text-[10px] font-bold mb-2 text-center">{label}</Text>
    <View className="bg-slate-50 border border-slate-100 rounded-2xl px-2 py-4 flex-row items-center justify-center">
      <TextInput 
        value={value} 
        onChangeText={onChange} 
        keyboardType="numeric"
        className="font-black text-slate-800 text-lg text-center" 
      />
    </View>
  </View>
);