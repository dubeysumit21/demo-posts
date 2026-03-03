import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchPosts } from '../api';
import PostItem from '../components/PostItem';
import { Post, RootStackParamList } from '../types';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Posts'>;

const PostsScreen = () => {
  const navigation = useNavigation<NavProp>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch(e => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, []);

  const handlePostPress = useCallback(
    (post: Post) => navigation.navigate('Comments', { post }),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Post>) => (
      <PostItem post={item} onPress={handlePostPress} />
    ),
    [handlePostPress],
  );

  const keyExtractor = useCallback((item: Post) => String(item.id), []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6c63ff" />
        <Text style={styles.loadingText}>Loading posts…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>⚠ {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  list: { paddingVertical: 12 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    gap: 12,
  },
  loadingText: { color: '#6c63ff', fontSize: 14 },
  errorText: {
    color: '#e74c3c',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});

export default PostsScreen;
