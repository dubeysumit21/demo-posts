import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import PostItem from '../src/components/PostItem';
import { Post } from '../src/types';

const mockPost: Post = {
  userId: 1,
  id: 1,
  title: 'Test Post Title',
  body: 'Test post body content',
};

describe('PostItem', () => {
  it('renders without crashing', () => {
    const onPress = jest.fn();
    render(<PostItem post={mockPost} onPress={onPress} />);
    expect(screen.getByText('Test Post Title')).toBeTruthy();
  });

  it('displays post id, title and body', () => {
    const onPress = jest.fn();
    render(<PostItem post={mockPost} onPress={onPress} />);
    expect(screen.getByText('#1')).toBeTruthy();
    expect(screen.getByText('Test Post Title')).toBeTruthy();
    expect(screen.getByText('Test post body content')).toBeTruthy();
  });

  it('calls onPress with the post when tapped', () => {
    const onPress = jest.fn();
    render(<PostItem post={mockPost} onPress={onPress} />);
    fireEvent.press(screen.getByText('Test Post Title'));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith(mockPost);
  });
});
