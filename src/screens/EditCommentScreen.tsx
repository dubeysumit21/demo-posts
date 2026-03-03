import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { updateComment } from '../api';
import { RootStackParamList } from '../types';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'EditComment'>;
type RoutePropType = RouteProp<RootStackParamList, 'EditComment'>;

const EditCommentScreen = () => {
  const route = useRoute<RoutePropType>();
  const navigation = useNavigation<NavProp>();
  const { comment } = route.params;

  const [name, setName] = useState(comment.name);
  const [email, setEmail] = useState(comment.email);
  const [body, setBody] = useState(comment.body);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!name.trim() || !email.trim() || !body.trim()) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }
    setLoading(true);
    try {
      await updateComment({ ...comment, name: name.trim(), email: email.trim(), body: body.trim() });
      Alert.alert('Success', 'Comment updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert('Error', 'Failed to update comment. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [comment, name, email, body, navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Post ID</Text>
          <Text style={styles.infoValue}>#{comment.postId}</Text>
          <Text style={styles.infoLabel}>Comment ID</Text>
          <Text style={styles.infoValue}>#{comment.id}</Text>
        </View>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
          placeholderTextColor="#aaa"
          returnKeyType="next"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          returnKeyType="next"
        />

        <Text style={styles.label}>Comment</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={body}
          onChangeText={setBody}
          placeholder="Enter comment body"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity
          style={[styles.submitBtn, loading && styles.disabledBtn]}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.85}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Submit Changes</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  content: { padding: 20, paddingBottom: 40 },
  infoCard: {
    backgroundColor: '#ede9fe',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
  },
  infoLabel: { fontSize: 11, color: '#7c6cff', fontWeight: '600' },
  infoValue: {
    fontSize: 12,
    color: '#1a1a2e',
    fontWeight: '700',
    marginRight: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1a1a2e',
  },
  textArea: { height: 140, paddingTop: 12 },
  submitBtn: {
    backgroundColor: '#6c63ff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  disabledBtn: { opacity: 0.65 },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
});

export default EditCommentScreen;
