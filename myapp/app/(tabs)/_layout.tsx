import { Tabs } from 'expo-router';
import { View, Platform } from 'react-native';
import { Home, Droplets, Scan, MessageSquare, User } from 'lucide-react-native';
import { HapticTab } from '@/components/haptic-tab'; // Agar ho toh rakhein, warna hata dein

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,       
        tabBarShowLabel: true,    // Labels ON
        tabBarButton: HapticTab,  // Premium haptic feedback
        tabBarActiveTintColor: '#10b981', // Active text/icon color (Emerald)
        tabBarInactiveTintColor: '#94a3b8', // Inactive color (Gray)
        tabBarLabelStyle: {
          fontFamily: 'Poppins_700Bold', // Bold text for better readability
          fontSize: 10,
          marginTop: 2, // Icon aur text ke beech thoda gap
        },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: Platform.OS === 'ios' ? 85 : 70, 
          paddingBottom: Platform.OS === 'ios' ? 24 : 10,
          paddingTop: 8, 
          borderTopWidth: 1,
          borderTopColor: '#f1f5f9', 
          elevation: 10, 
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
      }}
    >
      {/* 1. HOME TAB */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />

      {/* 2. IRRIGATION TAB (Name is 'irrigation' to match file) */}
      <Tabs.Screen
        name="irrigation"
        options={{
          tabBarLabel: 'Irrigation',
          tabBarIcon: ({ color, focused }) => (
            <Droplets size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />

      {/* 3. CENTER FAB SCANNER TAB (Name is 'scanner' to match file) */}
      <Tabs.Screen
        name="scanner"
        options={{
          tabBarLabel: () => null, // Center FAB ke niche text hatane ke liye
          tabBarIcon: ({ focused }) => (
            <View style={{
              top: Platform.OS === 'ios' ? -20 : -25, // Button ko upar push kiya
              justifyContent: 'center',
              alignItems: 'center',
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#10b981', // Emerald Green
              borderWidth: 4,
              borderColor: '#ffffff', // Cutout effect (White border matches tab bar)
              shadowColor: '#10b981',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 8,
              elevation: 5, 
            }}>
              <Scan size={26} color="white" strokeWidth={2.5} />
            </View>
          ),
        }}
      />

      {/* 4. CHAT TAB */}
      <Tabs.Screen
        name="chat"
        options={{
          tabBarLabel: 'Ask AI',
          tabBarIcon: ({ color, focused }) => (
            <MessageSquare size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />

      {/* 5. PROFILE TAB */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <User size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
    </Tabs>
  );
}