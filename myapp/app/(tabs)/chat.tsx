import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  KeyboardAvoidingView, Platform, StyleSheet, Animated, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Send, Bot, User, Sparkles, Plus, Mic, Image as ImageIcon,
  MoreHorizontal, CloudSun, Droplets, Info, Share2, History
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const W = {
  Regular: 'Poppins_400Regular',
  SemiBold: 'Poppins_600SemiBold',
  Bold: 'Poppins_700Bold',
  Black: 'Poppins_900Black'
};

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  time: string;
  type?: 'text' | 'card';
  cardData?: any;
};

const SUGGESTIONS = [
  { icon: <Droplets size={14} color="#059669" />, text: "Moisture Check" },
  { icon: <CloudSun size={14} color="#059669" />, text: "Weather Alert" },
  { icon: <Info size={14} color="#059669" />, text: "Pest Control" },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Namaste Pawan! Main aapka AI Agronomist hoon. Aaj aapki kheti mein kya madad kar sakta hoon?", sender: 'bot', time: '10:00 AM' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI Intelligence
    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Pawan, Bhopal mein aaj nami (humidity) 45% hai. Aapke Wheat field mein irrigation ki zaroorat ho sakti hai.",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: textToSend.includes('Moisture') ? 'card' : 'text',
        cardData: { title: "Irrigation Alert", value: "Low Moisture Detected" }
      };
      setMessages(prev => [...prev, botMsg]);
    }, 2000);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isBot = item.sender === 'bot';
    return (
      <View className={`mb-6 flex-row ${isBot ? 'justify-start' : 'justify-end'}`}>
        {isBot && (
          <View className="w-9 h-9 rounded-2xl bg-emerald-100 items-center justify-center mr-3 self-end mb-1 border border-emerald-200">
            <Bot size={18} color="#059669" />
          </View>
        )}
        <View className="max-w-[82%]">
          <View
            className={`p-4 rounded-[26px] ${isBot ? 'bg-white rounded-bl-none shadow-sm' : 'bg-emerald-600 rounded-br-none shadow-lg'
              }`}
            style={isBot ? { borderTopLeftRadius: 26, borderBottomLeftRadius: 4 } : { borderTopRightRadius: 26, borderBottomRightRadius: 4 }}
          >
            <Text
              style={{ fontFamily: W.Regular }}
              className={`text-[15px] leading-6 ${isBot ? 'text-slate-800' : 'text-white'}`}
            >
              {item.text}
            </Text>

            {/* Rich Card Example inside Message */}
            {item.type === 'card' && (
              <View className="mt-3 bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                <Text style={{ fontFamily: W.Bold }} className="text-emerald-800 text-[12px]">{item.cardData.title}</Text>
                <Text style={{ fontFamily: W.Regular }} className="text-emerald-600 text-[11px] mt-0.5">{item.cardData.value}</Text>
              </View>
            )}

            <Text
              className={`text-[9px] mt-2 ${isBot ? 'text-slate-400' : 'text-emerald-100/70'}`}
              style={{ fontFamily: W.Bold, textAlign: isBot ? 'left' : 'right' }}
            >
              {item.time}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }} edges={['top']}>

      {/* ── HEADER ── */}
      <View className="px-6 py-4 bg-white flex-row justify-between items-center border-b border-slate-100 shadow-sm shadow-slate-200/50">
        <View className="flex-row items-center">
          {/* Container ko rounded-full kiya circle ke liye */}
          
            {/* Sparkles ki jagah Bot icon use kiya hai jo AI feel deta hai */}
            <Bot size={36} color="green" strokeWidth={2} />

          <View className="ml-4">
            <Text style={{ fontFamily: W.Black, fontSize: 18, color: '#0f172a' }}>AI Agronomist</Text>
            <View className="flex-row items-center mt-0.5">
              {/* Online indicator dot */}
              <View className="w-2 h-2 bg-emerald-500 rounded-full mr-2 shadow-sm shadow-emerald-500" />
              <Text style={{ fontFamily: W.SemiBold, fontSize: 11, color: '#059669' }}>Online Now</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center border border-slate-200">
          <History size={18} color="#64748b" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* ── CHAT LIST ── */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListFooterComponent={isTyping ? (
            <View className="flex-row items-center ml-2 mb-6">
              <View className="bg-white px-4 py-3 rounded-full border border-slate-100">
                <ActivityIndicator size="small" color="#059669" />
              </View>
            </View>
          ) : null}
        />

        {/* ── BOTTOM PANEL ── */}
        <View className="px-4 pb-6">
          {/* Action Chips */}
          <View className="flex-row mb-4 overflow-hidden">
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={SUGGESTIONS}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => sendMessage(item.text)}
                  className="bg-white px-4 py-2.5 rounded-2xl mr-3 border border-slate-100 flex-row items-center shadow-sm"
                >
                  {item.icon}
                  <Text style={{ fontFamily: W.Bold, color: '#1e293b', fontSize: 12 }} className="ml-2">{item.text}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Premium Input Bar */}
          <BlurView intensity={90} tint="light" className="flex-row items-center bg-white/80 p-2 rounded-[32px] border border-white shadow-2xl shadow-slate-300">
            <TouchableOpacity className="w-11 h-11 bg-slate-100 rounded-full items-center justify-center ml-1 border border-slate-200">
              <Plus size={20} color="#64748b" />
            </TouchableOpacity>

            <TextInput
              placeholder="Sawaal poochein..."
              className="flex-1 px-4 text-[15px] text-slate-900"
              style={{ fontFamily: W.Regular, height: 50 }}
              value={input}
              onChangeText={setInput}
              multiline
            />

            <TouchableOpacity
              onPress={() => sendMessage()}
              className={`${input.trim() ? 'bg-emerald-600' : 'bg-slate-100'} w-11 h-11 rounded-full items-center justify-center mr-1 shadow-sm`}
            >
              <Send size={18} color={input.trim() ? "white" : "#94a3b8"} />
            </TouchableOpacity>
          </BlurView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}