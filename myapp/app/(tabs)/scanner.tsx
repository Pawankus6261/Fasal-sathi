import { useState, useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, ActivityIndicator,
  StyleSheet, Animated, Easing, Image, Dimensions,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Zap, ZapOff, Camera, Image as ImageIcon,
  Sparkles, Info, Sun, ZoomIn, Move,
} from 'lucide-react-native';

const W = {
  Regular:  'Poppins_400Regular',
  SemiBold: 'Poppins_600SemiBold',
  Bold:     'Poppins_700Bold',
  Black:    'Poppins_900Black',
};

const { width: SW } = Dimensions.get('window');
const FRAME       = SW * 0.74;
const GREEN       = '#4ade80';
const CORNER_SIZE = 32;
const CORNER_BW   = 3;
const CORNER_R    = 14;

export default function ScannerScreen() {
  const router = useRouter();
  const cameraRef = useRef<any>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash]             = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [captured, setCaptured]       = useState<string | null>(null);
  const [activeTab, setActiveTab]     = useState<'scan' | 'gallery' | 'history'>('scan');

  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, { toValue: 1, duration: 2400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(scanAnim, { toValue: 0, duration: 2400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const scanY = scanAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: [-(FRAME * 0.38), FRAME * 0.38],
  });

  if (!permission) return <View style={{ flex: 1, backgroundColor: '#f5f7f2' }} />;

  if (!permission.granted) {
    return (
      <SafeAreaView style={s.permScreen}>
        <View style={s.permIconWrap}>
          <Camera size={36} color="#16a34a" />
        </View>
        <Text style={[s.permTitle, { fontFamily: W.Black }]}>Camera Access</Text>
        <Text style={[s.permSub, { fontFamily: W.Regular }]}>
          Fasal Lens needs your camera to scan and identify crop diseases.
        </Text>
        <TouchableOpacity style={s.permBtn} onPress={requestPermission} activeOpacity={0.85}>
          <Text style={[s.permBtnTxt, { fontFamily: W.Bold }]}>Grant Permission</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current || isAnalyzing) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.85 });
    setCaptured(photo.uri);
  };

  const pickGallery = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], allowsEditing: true, quality: 0.85,
    });
    if (!result.canceled) setCaptured(result.assets[0].uri);
  };

  const runAI = () => {
    setIsAnalyzing(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => {
      setIsAnalyzing(false);
      router.push({ pathname: '/scan/scan-result', params: { image: captured } });
    }, 3200);
  };

  const discard = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCaptured(null);
    setIsAnalyzing(false);
  };

  return (
    <View style={s.root}>
      {!captured
        ? <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing="back" enableTorch={flash} />
        : <Image source={{ uri: captured }} style={StyleSheet.absoluteFill} resizeMode="cover" />
      }
      <View style={s.dim} pointerEvents="none" />

      <SafeAreaView style={s.safe} edges={['top', 'bottom']}>

        {/* TOP BAR */}
        <View style={s.topBar}>
          <View style={s.statusPill}>
            <View style={[s.dot, { backgroundColor: isAnalyzing ? '#ef4444' : GREEN }]} />
            <Text style={[s.statusTxt, { fontFamily: W.Bold }]}>
              {isAnalyzing ? 'AI Analyzing' : 'Fasal Lens'}
            </Text>
          </View>
          <TouchableOpacity
            style={[s.flashBtn, flash && s.flashOn]}
            onPress={() => { setFlash(f => !f); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
            activeOpacity={0.75}
          >
            {flash
              ? <Zap size={20} color="#fde047" fill="#fde047" />
              : <ZapOff size={20} color="rgba(255,255,255,0.65)" />
            }
          </TouchableOpacity>
        </View>

        {/* HINT */}
        {!captured && (
          <Text style={[s.hint, { fontFamily: W.Regular }]}>
            Point camera at a leaf or crop area
          </Text>
        )}

        {/* SCAN FRAME */}
        <View style={s.frameArea}>
          <View style={[s.frameOuter, { width: FRAME, height: FRAME }]}>
            <View style={[StyleSheet.absoluteFill, s.frameBorder]} />
            <View style={[s.corner, s.tl]} />
            <View style={[s.corner, s.tr]} />
            <View style={[s.corner, s.bl]} />
            <View style={[s.corner, s.br]} />
            {!captured && (
              <Animated.View
                style={[s.scanLine, { transform: [{ translateY: scanY }] }]}
                pointerEvents="none"
              />
            )}
            {isAnalyzing && (
              <View style={s.analyzingBox}>
                <View style={s.analyzingIconWrap}>
                  <Sparkles size={22} color={GREEN} />
                </View>
                <Text style={[s.analyzingTxt, { fontFamily: W.SemiBold }]}>
                  Detecting disease patterns...
                </Text>
                <View style={s.progressBg}>
                  <View style={[s.progressFill, { width: '68%' }]} />
                </View>
              </View>
            )}
          </View>
          {!captured && !isAnalyzing && (
            <Text style={[s.frameLabel, { fontFamily: W.Regular }]}>
              Center leaf in frame
            </Text>
          )}
        </View>

        {/* TIPS */}
        {!captured && (
          <View style={s.tipsRow}>
            {[
              { Icon: Sun,    label: 'Good light' },
              { Icon: ZoomIn, label: 'Stay close' },
              { Icon: Move,   label: 'Keep steady' },
            ].map(({ Icon, label }) => (
              <View key={label} style={s.tip}>
                <Icon size={15} color="rgba(255,255,255,0.25)" />
                <Text style={[s.tipLbl, { fontFamily: W.Regular }]}>{label}</Text>
              </View>
            ))}
          </View>
        )}

        {/* BOTTOM CONTROLS — adjust paddingBottom here to your liking */}
        <View style={s.bottom}>

         {!captured && (
            <View style={s.tabs}>
              {(['scan', 'gallery', 'history'] as const).map(tab => (
                <TouchableOpacity
                  key={tab}
                  style={[s.tab, activeTab === tab && s.tabActive]}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

                    // 🚀 ROUTING LOGIC YAHAN HAI
                    if (tab === 'history') {
                      // History click hote hi History screen par bhej do
                      router.push('/scan/scan-history'); 
                      
                      // UX Tip: Tab ko wapas 'scan' par set kar dete hain, 
                      // taaki jab user history se wapas aaye toh camera khula mile
                      setActiveTab('scan'); 
                    } 
                    else if (tab === 'gallery') {
                      setActiveTab(tab);
                      pickGallery();
                    } 
                    else {
                      // 'scan' ke liye
                      setActiveTab(tab);
                    }
                  }}
                  activeOpacity={0.75}
                >
                  <Text style={[
                    s.tabTxt,
                    { fontFamily: activeTab === tab ? W.SemiBold : W.Regular },
                    activeTab === tab && s.tabTxtActive,
                  ]}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {captured && isAnalyzing && (
            <View style={[s.analyzeBtn, { backgroundColor: '#15803d', opacity: 0.85 }]}>
              <ActivityIndicator color="#fff" size="small" />
              <Text style={[s.analyzeBtnTxt, { fontFamily: W.Bold }]}>Analyzing...</Text>
            </View>
          )}

          {captured && !isAnalyzing && (
            <View style={s.postWrap}>
              <TouchableOpacity style={s.analyzeBtn} onPress={runAI} activeOpacity={0.85}>
                <Sparkles size={20} color="#fff" />
                <Text style={[s.analyzeBtnTxt, { fontFamily: W.Bold }]}>Identify Disease</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.retakeBtn} onPress={discard} activeOpacity={0.7}>
                <Text style={[s.retakeTxt, { fontFamily: W.Regular }]}>Discard & Retake</Text>
              </TouchableOpacity>
            </View>
          )}

          {!captured && (
            <View style={s.captureRow}>
              <TouchableOpacity style={s.sideBtn} onPress={pickGallery} activeOpacity={0.75}>
                <View style={s.sideIcon}>
                  <ImageIcon size={22} color="rgba(255,255,255,0.65)" />
                </View>
                <Text style={[s.sideLbl, { fontFamily: W.Regular }]}>Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={s.shutter}
                onPress={takePicture}
                activeOpacity={0.85}
                disabled={isAnalyzing}
              >
                <View style={s.shutterInner}>
                  <Camera size={28} color="#fff" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={s.sideBtn}
                onPress={() => router.push('/404' as any)} // Guide screen ka route yahan check kar lena
                activeOpacity={0.75}
              >
                <View style={s.sideIcon}>
                  <Info size={22} color="rgba(255,255,255,0.65)" />
                </View>
                <Text style={[s.sideLbl, { fontFamily: W.Regular }]}>Guide</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root:              { flex: 1, backgroundColor: '#0a0a0a' },
  dim:               { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.32)' },
  safe:              { flex: 1, justifyContent: 'space-between' },

  // Permission screen — light theme
  permScreen:        { flex: 1, backgroundColor: '#f5f7f2', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  permIconWrap:      { width: 80, height: 80, borderRadius: 40, backgroundColor: '#dcfce7', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  permTitle:         { fontSize: 24, color: '#0f1a12', textAlign: 'center', marginBottom: 10 },
  permSub:           { fontSize: 14, color: '#8aab94', textAlign: 'center', lineHeight: 22, marginBottom: 36 },
  permBtn:           { backgroundColor: '#16a34a', width: '100%', paddingVertical: 16, borderRadius: 18, alignItems: 'center' },
  permBtnTxt:        { fontSize: 16, color: '#fff' },

  // Top bar
  topBar:            { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 8 },
  statusPill:        { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 99, paddingHorizontal: 14, paddingVertical: 7 },
  dot:               { width: 7, height: 7, borderRadius: 4 },
  statusTxt:         { fontSize: 11, color: 'rgba(255,255,255,0.85)', letterSpacing: 0.8, textTransform: 'uppercase' },
  flashBtn:          { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  flashOn:           { borderColor: 'rgba(253,224,71,0.4)', backgroundColor: 'rgba(253,224,71,0.08)' },

  // Hint
  hint:              { textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.28)', letterSpacing: 0.3 },

  // Frame
  frameArea:         { flex: 1, alignItems: 'center', justifyContent: 'center' },
  frameOuter:        { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  frameBorder:       { borderRadius: 34, borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)' },
  corner:            { position: 'absolute', width: CORNER_SIZE, height: CORNER_SIZE },
  tl:                { top: 0, left: 0, borderTopWidth: CORNER_BW, borderLeftWidth: CORNER_BW, borderColor: GREEN, borderTopLeftRadius: CORNER_R },
  tr:                { top: 0, right: 0, borderTopWidth: CORNER_BW, borderRightWidth: CORNER_BW, borderColor: GREEN, borderTopRightRadius: CORNER_R },
  bl:                { bottom: 0, left: 0, borderBottomWidth: CORNER_BW, borderLeftWidth: CORNER_BW, borderColor: GREEN, borderBottomLeftRadius: CORNER_R },
  br:                { bottom: 0, right: 0, borderBottomWidth: CORNER_BW, borderRightWidth: CORNER_BW, borderColor: GREEN, borderBottomRightRadius: CORNER_R },
  scanLine:          { position: 'absolute', left: 14, right: 14, height: 2, backgroundColor: GREEN, borderRadius: 2, opacity: 0.8 },
  frameLabel:        { marginTop: 14, fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: 0.5 },

  // Analyzing
  analyzingBox:      { alignItems: 'center', gap: 10 },
  analyzingIconWrap: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(74,222,128,0.1)', borderWidth: 1.5, borderColor: 'rgba(74,222,128,0.3)', alignItems: 'center', justifyContent: 'center' },
  analyzingTxt:      { fontSize: 13, color: 'rgba(255,255,255,0.45)' },
  progressBg:        { width: 130, height: 3, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' },
  progressFill:      { height: '100%', backgroundColor: GREEN, borderRadius: 4 },

  // Tips
  tipsRow:           { flexDirection: 'row', justifyContent: 'center', gap: 28, paddingBottom: 8 },
  tip:               { alignItems: 'center', gap: 4 },
  tipLbl:            { fontSize: 10, color: 'rgba(255,255,255,0.18)', letterSpacing: 0.3 },

  // ─────────────────────────────────────────────────
  // BOTTOM — tune paddingBottom & paddingTop here
  // SafeAreaView 'bottom' edge already handles the
  // home indicator, so paddingBottom adds extra space
  // on top of that. Increase until it looks right.
  // ─────────────────────────────────────────────────
  bottom:            {
    paddingHorizontal: 20,
    paddingTop:        16,   // ← space above tabs / shutter
    paddingBottom:     40,   // ← increase this if still overlapping
  },

  // Tabs
  tabs:              { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: 3, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  tab:               { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 11 },
  tabActive:         { backgroundColor: 'rgba(255,255,255,0.11)' },
  tabTxt:            { fontSize: 12, color: 'rgba(255,255,255,0.3)' },
  tabTxtActive:      { color: '#fff' },

  // Capture row
  captureRow:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sideBtn:           { alignItems: 'center', gap: 6, width: 64 },
  sideIcon:          { width: 52, height: 52, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  sideLbl:           { fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: 0.5, textTransform: 'uppercase' },
  shutter:           { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 3, borderColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  shutterInner:      { width: 60, height: 60, borderRadius: 30, backgroundColor: '#16a34a', alignItems: 'center', justifyContent: 'center' },

  // Post capture
  postWrap:          { gap: 10 },
  analyzeBtn:        { backgroundColor: '#16a34a', borderRadius: 20, paddingVertical: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  analyzeBtnTxt:     { fontSize: 16, color: '#fff' },
  retakeBtn:         { paddingVertical: 10, alignItems: 'center' },
  retakeTxt:         { fontSize: 13, color: 'rgba(255,255,255,0.35)' },
});