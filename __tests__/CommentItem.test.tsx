import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import CommentItem from '../src/components/CommentItem';
import { Comment } from '../src/types';

const mockComment: Comment = {
  postId: 1,
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  body: 'This is a test comment body.',
};

describe('CommentItem', () => {
  it('renders without crashing', () => {
    const onEdit = jest.fn();
    render(<CommentItem comment={mockComment} onEdit={onEdit} />);
    expect(screen.getByText('Test User')).toBeTruthy();
  });

  it('displays name, email and body', () => {
    const onEdit = jest.fn();
    render(<CommentItem comment={mockComment} onEdit={onEdit} />);
    expect(screen.getByText('Test User')).toBeTruthy();
    expect(screen.getByText('test@example.com')).toBeTruthy();
    expect(screen.getByText('This is a test comment body.')).toBeTruthy();
  });

  it('calls onEdit with the comment when Edit is pressed', () => {
    const onEdit = jest.fn();
    render(<CommentItem comment={mockComment} onEdit={onEdit} />);
    fireEvent.press(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(mockComment);
  });
});
