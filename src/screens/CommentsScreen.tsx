import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchComments } from '../api';
import CommentItem from '../components/CommentItem';
import { Comment, RootStackParamList } from '../types';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Comments'>;
type RoutePropType = RouteProp<RootStackParamList, 'Comments'>;

const CommentsScreen = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RoutePropType>();
  const { post } = route.params;

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComments(post.id)
      .then(setComments)
      .catch(e => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, [post.id]);

  const handleEdit = useCallback(
    (comment: Comment) => navigation.navigate('EditComment', { comment }),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Comment>) => (
      <CommentItem comment={item} onEdit={handleEdit} />
    ),
    [handleEdit],
  );

  const keyExtractor = useCallback((item: Comment) => String(item.id), []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6c63ff" />
        <Text style={styles.loadingText}>Loading comments…</Text>
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
      <View style={styles.postHeader}>
        <Text style={styles.postTitle} numberOfLines={2}>
          {post.title}
        </Text>
        <Text style={styles.commentCount}>
          {comments.length} comment{comments.length !== 1 ? 's' : ''}
        </Text>
      </View>
      <FlatList
        data={comments}
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
  postHeader: {
    backgroundColor: '#6c63ff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  commentCount: { color: '#d4d0ff', fontSize: 12 },
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

export default CommentsScreen;
