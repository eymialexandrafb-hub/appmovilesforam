import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, ScrollView,
} from 'react-native';
import { COLORS, RADIUS, SHADOW } from '../theme';
// 1. Importamos la función de persistencia
import { saveLocalData } from '../utils/storage'; 

const OPTIONS = [
  {
    id: 'impeccable',
    title: 'Impecable',
    subtitle: 'Todo en su lugar, siempre.',
    icon: '✨',
    emoji: 'Todo ordenado, sin excepción.',
  },
  {
    id: 'relaxed',
    title: 'Relajado pero limpio',
    subtitle: 'Ordenado, sin obsesión.',
    icon: '😊',
    emoji: 'Un balance saludable entre orden y vivir.',
  },
  {
    id: 'chaos',
    title: 'Caos controlado',
    subtitle: 'Sé dónde está todo.',
    icon: '🌪️',
    emoji: 'Mi sistema funciona a mi manera.',
  },
];

export default function QuestionnaireScreen({ navigation }) {
  const [selected, setSelected] = useState(null);
  const [currentQ, setCurrentQ] = useState(1);
  const totalQ = 5;

  // 2. Creamos la función para guardar y avanzar
  const handleNext = async () => {
    if (selected) {
      // Guardamos la respuesta seleccionada en el almacenamiento local
      await saveLocalData('question_1_order', selected);
      // Avanzamos al Feed
      navigation.navigate('Feed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${(currentQ / totalQ) * 100}%` }]} />
          </View>
          <Text style={styles.progressLabel}>{currentQ}/{totalQ}</Text>
        </View>

        {/* Category badge */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryIcon}>🏠</Text>
          <Text style={styles.categoryText}>Convivencia</Text>
        </View>

        {/* Question */}
        <Text style={styles.question}>
          ¿Cómo manejas el orden en los espacios comunes?
        </Text>
        <Text style={styles.questionSubtext}>
          Elige la opción que mejor te describe a ti de forma honesta.
        </Text>

        {/* Options */}
        <View style={styles.optionsList}>
          {OPTIONS.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                onPress={() => setSelected(opt.id)}
                activeOpacity={0.8}
              >
                <View style={styles.optionLeft}>
                  <View style={[styles.optionIconWrap, isSelected && styles.optionIconWrapSelected]}>
                    <Text style={styles.optionIcon}>{opt.icon}</Text>
                  </View>
                  <View style={styles.optionTextWrap}>
                    <Text style={[styles.optionTitle, isSelected && styles.optionTitleSelected]}>
                      {opt.title}
                    </Text>
                    <Text style={styles.optionSubtitle}>{opt.subtitle}</Text>
                  </View>
                </View>

                <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                  {isSelected && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Info box */}
        {selected && (
          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>💡</Text>
            <Text style={styles.infoText}>
              {OPTIONS.find(o => o.id === selected)?.emoji} Te conectaremos con roomies compatibles con tu estilo.
            </Text>
          </View>
        )}

        {/* Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.primaryBtn, !selected && styles.primaryBtnDisabled]}
            // 3. Conectamos el botón con nuestra nueva función
            onPress={handleNext}
            activeOpacity={selected ? 0.85 : 1}
          >
            <Text style={styles.primaryBtnText}>
              {selected ? 'Siguiente →' : 'Selecciona una opción'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => navigation.navigate('Feed')}
          >
            <Text style={styles.skipBtnText}>Omitir por ahora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 },

  header: {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, marginBottom: 28,
  },
  backText: { fontSize: 22, color: COLORS.dark, fontWeight: '600' },
  progressBarBg: {
    flex: 1, height: 6, backgroundColor: COLORS.gray200, borderRadius: 100, overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%', backgroundColor: COLORS.purple, borderRadius: 100,
  },
  progressLabel: { fontSize: 13, color: COLORS.gray400, fontWeight: '600' },

  categoryBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: COLORS.purpleLight, alignSelf: 'flex-start',
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 100, marginBottom: 20,
  },
  categoryIcon: { fontSize: 14 },
  categoryText: { color: COLORS.purpleDark, fontSize: 13, fontWeight: '700' },

  question: {
    fontSize: 26, fontWeight: '800', color: COLORS.dark,
    lineHeight: 34, marginBottom: 10,
  },
  questionSubtext: {
    fontSize: 14, color: COLORS.gray600, lineHeight: 20, marginBottom: 28,
  },

  optionsList: { gap: 12, marginBottom: 20 },
  optionCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: COLORS.gray100, borderRadius: RADIUS.lg,
    padding: 18, borderWidth: 2, borderColor: 'transparent',
  },
  optionCardSelected: {
    backgroundColor: COLORS.purpleLight, borderColor: COLORS.purple, ...SHADOW.soft,
  },
  optionLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  optionIconWrap: {
    width: 46, height: 46, borderRadius: 14,
    backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center',
  },
  optionIconWrapSelected: { backgroundColor: COLORS.purple + '22' },
  optionIcon: { fontSize: 22 },
  optionTextWrap: { flex: 1 },
  optionTitle: {
    fontSize: 16, fontWeight: '700', color: COLORS.dark, marginBottom: 3,
  },
  optionTitleSelected: { color: COLORS.purpleDark },
  optionSubtitle: { fontSize: 13, color: COLORS.gray600, lineHeight: 18 },

  radioCircle: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: COLORS.gray400,
    alignItems: 'center', justifyContent: 'center',
  },
  radioCircleSelected: { borderColor: COLORS.purple },
  radioDot: {
    width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.purple,
  },

  infoBox: {
    flexDirection: 'row', gap: 10, alignItems: 'flex-start',
    backgroundColor: '#FFF9E6', borderRadius: RADIUS.md,
    padding: 14, marginBottom: 20, borderWidth: 1, borderColor: '#FFE082',
  },
  infoIcon: { fontSize: 16 },
  infoText: { flex: 1, fontSize: 13, color: '#7A6000', lineHeight: 18 },

  buttons: { gap: 12 },
  primaryBtn: {
    backgroundColor: COLORS.dark, paddingVertical: 18,
    borderRadius: RADIUS.lg, alignItems: 'center',
  },
  primaryBtnDisabled: { backgroundColor: COLORS.gray400, opacity: 0.6 },
  primaryBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  skipBtn: { alignItems: 'center', paddingVertical: 10 },
  skipBtnText: { color: COLORS.gray400, fontSize: 14, fontWeight: '500' },
});