import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Comment } from '../types';

interface Props {
  comment: Comment;
  onEdit: (comment: Comment) => void;
}

const CommentItem = memo(({ comment, onEdit }: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name} numberOfLines={1}>
          {comment.name}
        </Text>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => onEdit(comment)}
          activeOpacity={0.8}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.email}>{comment.email}</Text>
      <Text style={styles.body}>{comment.body}</Text>
    </View>
  );
});

CommentItem.displayName = 'CommentItem';

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a2e',
    flex: 1,
    marginRight: 10,
  },
  email: {
    fontSize: 12,
    color: '#6c63ff',
    marginBottom: 8,
  },
  body: {
    fontSize: 13,
    color: '#666',
    lineHeight: 19,
  },
  editBtn: {
    backgroundColor: '#6c63ff',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  editText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CommentItem;
