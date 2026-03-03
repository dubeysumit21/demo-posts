import React, { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Post } from '../types';

interface Props {
  post: Post;
  onPress: (post: Post) => void;
}

const PostItem = memo(({ post, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(post)}
      activeOpacity={0.7}
    >
      <View style={styles.idBadge}>
        <Text style={styles.idText}>#{post.id}</Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {post.title}
      </Text>
      <Text style={styles.body} numberOfLines={3}>
        {post.body}
      </Text>
    </TouchableOpacity>
  );
});

PostItem.displayName = 'PostItem';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  idBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ede9fe',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 8,
  },
  idText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6c63ff',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 6,
    textTransform: 'capitalize',
  },
  body: {
    fontSize: 13,
    color: '#666',
    lineHeight: 19,
  },
});

export default PostItem;
