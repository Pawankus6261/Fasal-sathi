import React, { useState } from 'react';
import {
    View, Text, ScrollView, TouchableOpacity, StatusBar,
    TextInput, FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
    ArrowLeft, Plus, Search, Sprout, Calendar,
    ChevronRight, Filter, Activity, CheckCircle2
} from 'lucide-react-native';

// 🚀 TypeScript Interfaces
interface CropData {
    id: string;
    name: string;
    variety: string;
    area: string;
    planted: string;
    harvest: string;
    health: 'Excellent' | 'Good' | 'Needs Attention' | string;
    status: 'Active' | 'Harvested';
}

export default function CropsManagementScreen() {
    const router = useRouter();

    // 🚀 Local State
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeTab, setActiveTab] = useState<'Active' | 'Harvested'>('Active');

    // 🚀 Mock Database (Synchronized with previous screens)
    const cropsData: CropData[] = [
        { id: '1', name: 'Wheat', variety: 'Sharbati', area: '5 Acres', planted: '15 Nov 2025', harvest: '10 Apr 2026', health: 'Excellent', status: 'Active' },
        { id: '2', name: 'Soybean', variety: 'JS 335', area: '4 Acres', planted: '05 Jul 2025', harvest: '20 Oct 2025', health: 'Good', status: 'Active' },
        { id: '3', name: 'Tomato', variety: 'Hybrid-89', area: '3.5 Acres', planted: '10 Jan 2026', harvest: '15 May 2026', health: 'Needs Attention', status: 'Active' },
        { id: '4', name: 'Gram (Chana)', variety: 'Desi', area: '2 Acres', planted: '01 Oct 2024', harvest: '15 Mar 2025', health: 'Excellent', status: 'Harvested' },
    ];

    // 🚀 Filter Logic
    const filteredCrops = cropsData.filter(crop => {
        const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            crop.variety.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = crop.status === activeTab;
        return matchesSearch && matchesTab;
    });

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
                            <Text className="text-xl font-black text-slate-800">Crop Management</Text>
                            <Text className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Kushwaha Farms</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => router.push('/404' as any)} // Route to "Add Crop" screen later
                        activeOpacity={0.8}
                        className="flex-row items-center bg-[#10b981] px-4 py-2.5 rounded-2xl shadow-sm shadow-emerald-200"
                    >
                        <Plus size={18} color="white" />
                        <Text className="text-white font-bold ml-1.5">Add New</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-1 px-5 pt-5">

                    {/* ── SEARCH & FILTER ROW ── */}
                    <Animated.View entering={FadeInDown.duration(400)} className="flex-row items-center mb-6 gap-3">
                        <View className="flex-1 flex-row items-center bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                            <Search size={18} color="#94a3b8" />
                            <TextInput
                                value={searchQuery}
                                onChangeText={(val: string) => setSearchQuery(val)}
                                placeholder="Search crops by name or variety..."
                                placeholderTextColor="#94a3b8"
                                className="flex-1 ml-2.5 font-bold text-slate-700 text-sm p-0"
                            />
                        </View>
                        <TouchableOpacity className="w-12 h-12 bg-white border border-slate-200 rounded-2xl items-center justify-center shadow-sm">
                            <Filter size={18} color="#475569" />
                        </TouchableOpacity>
                    </Animated.View>

                    {/* ── TABS ── */}
                    <Animated.View entering={FadeInDown.duration(400).delay(100)} className="flex-row bg-slate-200/50 p-1.5 rounded-[20px] mb-6">
                        <TouchableOpacity
                            onPress={() => setActiveTab('Active')}
                            className={`flex-1 py-3 rounded-[16px] items-center justify-center ${activeTab === 'Active' ? 'bg-white shadow-sm' : 'bg-transparent'}`}
                        >
                            <Text className={`text-sm font-black ${activeTab === 'Active' ? 'text-emerald-700' : 'text-slate-500'}`}>Active Crops</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setActiveTab('Harvested')}
                            className={`flex-1 py-3 rounded-[16px] items-center justify-center ${activeTab === 'Harvested' ? 'bg-white shadow-sm' : 'bg-transparent'}`}
                        >
                            <Text className={`text-sm font-black ${activeTab === 'Harvested' ? 'text-amber-700' : 'text-slate-500'}`}>Past Harvests</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    {/* ── CROP LIST ── */}
                    <FlatList
                        data={filteredCrops}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        ListEmptyComponent={
                            <View className="items-center justify-center mt-20">
                                <View className="w-20 h-20 bg-slate-100 rounded-full items-center justify-center mb-4">
                                    <Sprout size={32} color="#94a3b8" />
                                </View>
                                <Text className="text-slate-500 font-bold text-base">No crops found</Text>
                                <Text className="text-slate-400 text-xs mt-1">Try adjusting your search query.</Text>
                            </View>
                        }
                        renderItem={({ item, index }: { item: CropData; index: number }) => (
                            <Animated.View entering={FadeInDown.duration(400).delay(150 + (index * 50))}>
                                <TouchableOpacity
                                    // 🚀 'crops-details' kar diya aur 'as any' laga diya TS ko shant rakhne ke liye
                                    // 🚀 'crop.id' ki jagah 'item.id' karna hai
                                    onPress={() => router.push({ pathname: '/farm/crops-details' as any, params: { id: item.id } })}
                                    activeOpacity={0.7}
                                    className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm mb-4"
                                >
                                    <View className="flex-row justify-between items-start mb-4">
                                        <View className="flex-row items-center">
                                            <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-3 ${item.status === 'Active' ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                                                {item.status === 'Active' ? <Sprout size={22} color="#10b981" /> : <CheckCircle2 size={22} color="#f59e0b" />}
                                            </View>
                                            <View>
                                                <Text className="text-lg font-black text-slate-800">{item.name}</Text>
                                                <Text className="text-xs font-bold text-slate-400">{item.variety} • {item.area}</Text>
                                            </View>
                                        </View>

                                        {/* Health Indicator (Only for Active) */}
                                        {item.status === 'Active' && (
                                            <View className={`px-2.5 py-1.5 rounded-lg ${item.health === 'Excellent' ? 'bg-emerald-100' : item.health === 'Good' ? 'bg-blue-100' : 'bg-rose-100'}`}>
                                                <Text className={`text-[10px] font-bold uppercase ${item.health === 'Excellent' ? 'text-emerald-700' : item.health === 'Good' ? 'text-blue-700' : 'text-rose-700'}`}>
                                                    {item.health}
                                                </Text>
                                            </View>
                                        )}
                                    </View>

                                    <View className="flex-row justify-between pt-3 border-t border-slate-50">
                                        <View className="flex-row items-center">
                                            <Calendar size={12} color="#94a3b8" />
                                            <Text className="text-[10px] font-bold text-slate-400 ml-1.5 uppercase">
                                                Sown: <Text className="text-slate-700">{item.planted}</Text>
                                            </Text>
                                        </View>
                                        <View className="flex-row items-center">
                                            {item.status === 'Active' ? <Activity size={12} color="#3b82f6" /> : <CheckCircle2 size={12} color="#f59e0b" />}
                                            <Text className="text-[10px] font-bold text-slate-400 ml-1.5 uppercase">
                                                {item.status === 'Active' ? 'Est. Harvest:' : 'Harvested:'} <Text className="text-slate-700">{item.harvest}</Text>
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Animated.View>
                        )}
                    />

                </View>
            </SafeAreaView>
        </View>
    );
}