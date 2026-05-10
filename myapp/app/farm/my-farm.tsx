import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import {
    ArrowLeft, Map as MapIcon, Layers, Package, Plus,
    ChevronRight, Thermometer, Droplets, Wind,
    ShoppingBag, Bell, User, Hash, Crosshair,
    Leaf, Zap, Activity, Globe, TestTube,
    Calendar, Sprout
} from 'lucide-react-native';

export default function MyFarmScreen() {
    const router = useRouter();

    // 🚀 Massive Integrated Farm Context
    const farmData = {
        identity: {
            name: "Kushwaha Farms",
            owner: "Pawan Kushwaha",
            id: "FS-MP-2026-892",
        },
        location: {
            address: "Village Goharganj, Bhopal",
            coords: "23.2599° N, 77.4126° E"
        },
        land: {
            totalArea: "12.5 Acres",
            soilType: "Black Cotton Soil",
            topography: "Flat",
        },
        nutrients: { N: 45, P: 30, K: 25 },
        irrigation: {
            source: "Borewell (Deep)",
            pump: "5 HP",
            smartAuto: true
        },
        sensors: { temp: "28°C", humidity: "62%", moisture: "42%" },
        stats: { activeCrops: 3, overallHealth: "94%" },
        crops: [
            { id: '1', name: 'Wheat', variety: 'Sharbati', area: '5 Acres', planted: '15 Nov 2025', harvest: '10 Apr 2026', health: 'Excellent' },
            { id: '2', name: 'Soybean', variety: 'JS 335', area: '4 Acres', planted: '05 Jul 2025', harvest: '20 Oct 2025', health: 'Good' },
            { id: '3', name: 'Tomato', variety: 'Hybrid-89', area: '3.5 Acres', planted: '10 Jan 2026', harvest: '15 May 2026', health: 'Needs Attention' }
        ]
    };

    return (
        <View className="flex-1 bg-[#F4F8F1]">
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            <SafeAreaView className="flex-1" edges={['top']}>

                {/* ── HEADER ── */}
                <View className="px-5 py-4 flex-row items-center justify-between bg-white border-b border-slate-200 z-10">
                    <View className="flex-row items-center">
                        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center border border-slate-200">
                            <ArrowLeft size={22} color="#475569" />
                        </TouchableOpacity>
                        <View className="ml-4">
                            <Text className="text-xl font-black text-slate-800">My Farm</Text>
                            <Text className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{farmData.location.address}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => router.push('/notifications/alert' as any)} className="w-10 h-10 bg-white rounded-full items-center justify-center border border-slate-200">
                        <Bell size={20} color="#64748b" />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }}>

                    {/* 1. POWER STATS CARD (Hero Section) */}
                    <Animated.View entering={FadeInDown.duration(500)} className="px-5">
                        <View className="bg-slate-900 p-6 rounded-[36px] shadow-2xl relative overflow-hidden">
                            <View className="flex-row justify-between items-start z-10">
                                <View>
                                    <View className="flex-row items-center mb-1">
                                        <Activity size={12} color="#4ade80" />
                                        <Text className="text-emerald-400 font-bold text-[10px] uppercase tracking-widest ml-1.5">Digital Twin Active</Text>
                                    </View>
                                    <Text className="text-white text-3xl font-black">{farmData.identity.name}</Text>
                                    <View className="flex-row items-center mt-1.5">
                                        <User size={12} color="#94a3b8" />
                                        <Text className="text-slate-400 text-xs font-medium ml-1.5">{farmData.identity.owner} • {farmData.identity.id}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => router.push('/farm/edit-farm' as any)} className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                                    <Plus size={20} color="#10b981" />
                                </TouchableOpacity>
                            </View>

                            <View className="flex-row justify-between mt-8 z-10 bg-white/5 p-4 rounded-2xl border border-white/10">
                                <View className="items-center flex-1">
                                    <Text className="text-slate-400 text-[10px] font-bold uppercase mb-1">Area</Text>
                                    <Text className="text-white text-sm font-black">{farmData.land.totalArea}</Text>
                                </View>
                                <View className="w-[1px] h-full bg-slate-700" />
                                <View className="items-center flex-1">
                                    <Text className="text-slate-400 text-[10px] font-bold uppercase mb-1">Crops</Text>
                                    <Text className="text-white text-sm font-black">{farmData.stats.activeCrops} Active</Text>
                                </View>
                                <View className="w-[1px] h-full bg-slate-700" />
                                <View className="items-center flex-1">
                                    <Text className="text-slate-400 text-[10px] font-bold uppercase mb-1">Health</Text>
                                    <Text className="text-emerald-400 text-sm font-black">{farmData.stats.overallHealth}</Text>
                                </View>
                            </View>
                        </View>
                    </Animated.View>

                    {/* 2. LIVE SENSOR FEEDS (IoT Integration) */}
                    <Animated.View entering={FadeInDown.duration(500).delay(100)} className="mt-8 px-5">
                        <SectionHeader title="Live IoT Sensors" />
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                            <SensorCard icon={<Thermometer size={20} color="#f43f5e" />} label="Temp" value={farmData.sensors.temp} bg="bg-rose-50" />
                            <SensorCard icon={<Droplets size={20} color="#0ea5e9" />} label="Moisture" value={farmData.sensors.moisture} bg="bg-sky-50" />
                            <SensorCard icon={<Wind size={20} color="#6366f1" />} label="Humidity" value={farmData.sensors.humidity} bg="bg-indigo-50" />
                        </ScrollView>
                    </Animated.View>

                    {/* 3. SOIL & LAND PROFILE */}
                    <Animated.View entering={FadeInDown.duration(500).delay(200)} className="px-5 mt-8">
                        <SectionHeader title="Soil & Land Profile" />
                        <View className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm flex-row flex-wrap">
                            <View className="w-1/2 mb-4">
                                <Text className="text-slate-400 text-[10px] font-bold uppercase mb-1">Soil Type</Text>
                                <View className="flex-row items-center"><Leaf size={14} color="#84cc16" /><Text className="text-slate-800 font-bold ml-1.5">{farmData.land.soilType}</Text></View>
                            </View>
                            <View className="w-1/2 mb-4">
                                <Text className="text-slate-400 text-[10px] font-bold uppercase mb-1">Topography</Text>
                                <View className="flex-row items-center"><Globe size={14} color="#8b5cf6" /><Text className="text-slate-800 font-bold ml-1.5">{farmData.land.topography}</Text></View>
                            </View>

                            <View className="w-full mt-2 pt-4 border-t border-slate-100">
                                <View className="flex-row items-center mb-2">
                                    <TestTube size={14} color="#94a3b8" />
                                    <Text className="text-slate-500 text-[10px] font-bold uppercase ml-1.5">Nutrient Levels (N-P-K)</Text>
                                </View>
                                <View className="flex-row justify-between gap-3">
                                    <NutrientBadge label="Nitrogen" value={farmData.nutrients.N} color="bg-blue-100 text-blue-700" />
                                    <NutrientBadge label="Phosphorus" value={farmData.nutrients.P} color="bg-amber-100 text-amber-700" />
                                    <NutrientBadge label="Potassium" value={farmData.nutrients.K} color="bg-purple-100 text-purple-700" />
                                </View>
                            </View>
                        </View>
                    </Animated.View>

                    {/* 4. IRRIGATION & HARDWARE */}
                    <Animated.View entering={FadeInDown.duration(500).delay(300)} className="px-5 mt-6">
                        <SectionHeader title="Irrigation Network" />
                        <View className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm">
                            <View className="flex-row justify-between items-center mb-4">
                                <View>
                                    <Text className="text-slate-400 text-[10px] font-bold uppercase mb-1">Water Source</Text>
                                    <Text className="text-slate-800 font-black">{farmData.irrigation.source}</Text>
                                </View>
                                <View className="items-end">
                                    <Text className="text-slate-400 text-[10px] font-bold uppercase mb-1">Pump Power</Text>
                                    <View className="flex-row items-center"><Zap size={14} color="#eab308" /><Text className="text-slate-800 font-black ml-1">{farmData.irrigation.pump}</Text></View>
                                </View>
                            </View>
                            <View className={`p-3 rounded-xl flex-row items-center justify-between ${farmData.irrigation.smartAuto ? 'bg-emerald-50 border border-emerald-100' : 'bg-slate-50 border border-slate-100'}`}>
                                <Text className={`font-bold text-xs ${farmData.irrigation.smartAuto ? 'text-emerald-700' : 'text-slate-500'}`}>Smart Pump Automation</Text>
                                <View className={`px-2 py-1 rounded-md ${farmData.irrigation.smartAuto ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                                    <Text className="text-white text-[10px] font-black uppercase">{farmData.irrigation.smartAuto ? 'Active' : 'Off'}</Text>
                                </View>
                            </View>
                        </View>
                    </Animated.View>

                    {/* 5. GEOLOCATION */}
                    <Animated.View entering={FadeInDown.duration(500).delay(400)} className="px-5 mt-6">
                        <View className="bg-blue-50 p-4 rounded-[24px] border border-blue-100 flex-row items-center justify-between shadow-sm">
                            <View className="flex-1">
                                <Text className="text-blue-800 font-black text-sm mb-1">GPS Coordinates Linked</Text>
                                <View className="flex-row items-center">
                                    <Crosshair size={12} color="#3b82f6" />
                                    <Text className="text-blue-600 text-xs font-bold ml-1">{farmData.location.coords}</Text>
                                </View>
                            </View>
                            <View className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
                                <MapIcon size={18} color="#3b82f6" />
                            </View>
                        </View>
                    </Animated.View>

                    {/* 6. 🚀 CROP DETAILS SECTION */}
                    <Animated.View entering={FadeInDown.duration(500).delay(500)} className="px-5 mt-8">
                        <View className="flex-row justify-between items-center mb-3">
                            <SectionHeader title="Active Crops & Harvests" />
                            <TouchableOpacity onPress={() => router.push('/farm/crops') as any}>
                                <Text className="text-emerald-600 text-xs font-bold mr-1">Manage</Text>
                            </TouchableOpacity>
                        </View>
                        {farmData.crops.map((crop) => (
                            <CropCard
                                key={crop.id}
                                crop={crop}
                                // 🚀 URL string properly template literals se pass ki gayi hai
                                // 🚀 'crops-details' kar diya aur 'as any' laga diya TS ko shant rakhne ke liye
                                onPress={() => router.push({ pathname: '/farm/crops-details' as any, params: { id: crop.id } })} />
                        ))}
                    </Animated.View>

                    {/* 7. FIELD INVENTORY */}
                    <Animated.View entering={FadeInDown.duration(500).delay(600)} className="px-5 mt-8">
                        <SectionHeader title="Active Fields" />
                        <FieldRow name="North Block" crop="Wheat" health="92%" status="Growing" onPress={() => router.push('/404' as any)} />
                        <FieldRow name="East Side" crop="Soybean" health="85%" status="Growing" onPress={() => router.push('/404' as any)} />
                        <FieldRow name="Home Field" crop="Tomato" health="98%" status="Harvest Ready" onPress={() => router.push('/404' as any)} />
                    </Animated.View>

                    {/* 8. STOCK & MARKET */}
                    <Animated.View entering={FadeInDown.duration(500).delay(700)} className="px-5 mt-6 flex-row gap-4">
                        <View className="flex-1 bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm">
                            <Package size={22} color="#f59e0b" className="mb-3" />
                            <Text className="text-slate-800 font-black text-base">Stock</Text>
                            <Text className="text-slate-400 text-[10px] font-bold uppercase mt-1">40 Bags Urea</Text>
                        </View>
                        <View className="flex-1 bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm">
                            <ShoppingBag size={22} color="#10b981" className="mb-3" />
                            <Text className="text-slate-800 font-black text-base">Mandi</Text>
                            <Text className="text-slate-400 text-[10px] font-bold uppercase mt-1">Wheat: ₹2,400/q</Text>
                        </View>
                    </Animated.View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

// ─── INTERNAL UI COMPONENTS ───

const SectionHeader = ({ title }: { title: string }) => (
    <Text className="text-slate-400 font-bold text-[11px] uppercase mb-1 ml-2 tracking-widest">{title}</Text>
);

const SensorCard = ({ icon, label, value, bg }: any) => (
    <View className={`${bg} p-4 rounded-[24px] mr-3 items-center w-28 border border-white/50 shadow-sm`}>
        {icon}
        <Text className="text-slate-500 text-[10px] font-bold mt-2 uppercase">{label}</Text>
        <Text className="text-slate-800 font-black text-base mt-0.5">{value}</Text>
    </View>
);

const NutrientBadge = ({ label, value, color }: any) => (
    <View className={`flex-1 p-2 rounded-xl items-center justify-center ${color.split(' ')[0]}`}>
        <Text className={`text-[10px] font-bold uppercase mb-1 ${color.split(' ')[1]}`}>{label}</Text>
        <Text className={`text-sm font-black ${color.split(' ')[1]}`}>{value}</Text>
    </View>
);

const FieldRow = ({ name, crop, health, status, onPress }: any) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} className="bg-white p-4 rounded-[24px] mb-3 border border-slate-100 flex-row items-center shadow-sm">
        <View className="w-12 h-12 bg-emerald-50 rounded-2xl items-center justify-center mr-4">
            <Layers size={22} color="#10b981" />
        </View>
        <View className="flex-1">
            <Text className="text-base font-black text-slate-800">{name}</Text>
            <Text className="text-xs font-medium text-slate-500 mt-0.5">{crop} • {status}</Text>
        </View>
        <View className="items-end mr-2">
            <Text className="text-xs font-black text-emerald-600">{health}</Text>
            <Text className="text-[10px] font-bold text-slate-300 uppercase mt-0.5">Health</Text>
        </View>
        <ChevronRight size={18} color="#cbd5e1" />
    </TouchableOpacity>
);

const CropCard = ({ crop, onPress }: any) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm mb-3">
        <View className="flex-row justify-between items-start mb-4">
            <View className="flex-row items-center">
                <View className="w-10 h-10 bg-amber-50 rounded-full items-center justify-center mr-3">
                    <Sprout size={18} color="#f59e0b" />
                </View>
                <View>
                    <Text className="text-base font-black text-slate-800">{crop.name}</Text>
                    <Text className="text-xs font-bold text-slate-400">{crop.variety} • {crop.area}</Text>
                </View>
            </View>
            <View className={`px-2 py-1 rounded-md ${crop.health === 'Excellent' ? 'bg-emerald-100' : crop.health === 'Good' ? 'bg-blue-100' : 'bg-rose-100'}`}>
                <Text className={`text-[10px] font-bold ${crop.health === 'Excellent' ? 'text-emerald-700' : crop.health === 'Good' ? 'text-blue-700' : 'text-rose-700'}`}>{crop.health}</Text>
            </View>
        </View>

        <View className="flex-row justify-between pt-3 border-t border-slate-50">
            <View className="flex-row items-center">
                <Calendar size={12} color="#94a3b8" />
                <Text className="text-[10px] font-bold text-slate-400 ml-1.5 uppercase">Planted: <Text className="text-slate-700">{crop.planted}</Text></Text>
            </View>
            <View className="flex-row items-center">
                <Calendar size={12} color="#94a3b8" />
                <Text className="text-[10px] font-bold text-slate-400 ml-1.5 uppercase">Est. Harvest: <Text className="text-slate-700">{crop.harvest}</Text></Text>
            </View>
        </View>
    </TouchableOpacity>
);