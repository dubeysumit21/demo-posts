import { fetchPosts, fetchComments, updateComment } from '../src/api';
import { Post, Comment } from '../src/types';

global.fetch = jest.fn() as jest.Mock;

const mockPost: Post = {
  userId: 1,
  id: 1,
  title: 'Post One',
  body: 'Body one',
};
const mockComment: Comment = {
  postId: 1,
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  body: 'Great post!',
};

beforeEach(() => jest.clearAllMocks());

// ─── fetchPosts ───────────────────────────────────────────────────────────────

describe('fetchPosts', () => {
  it('returns parsed posts on success', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockPost],
    });

    const result = await fetchPosts();

    expect(global.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts',
    );
    expect(result).toEqual([mockPost]);
  });

  it('throws an error when response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(fetchPosts()).rejects.toThrow('Failed to fetch posts');
  });

  it('throws when the network request fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Network error'),
    );

    await expect(fetchPosts()).rejects.toThrow('Network error');
  });
});

describe('fetchComments', () => {
  it('returns parsed comments for a given postId', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockComment],
    });

    const result = await fetchComments(1);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts/1/comments',
    );
    expect(result).toEqual([mockComment]);
  });

  it('throws an error when response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(fetchComments(1)).rejects.toThrow('Failed to fetch comments');
  });
});

describe('updateComment', () => {
  it('sends a PUT request and returns the updated comment', async () => {
    const updated = { ...mockComment, body: 'Updated body' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => updated,
    });

    const result = await updateComment(updated);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/comments/1',
      expect.objectContaining({
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      }),
    );
    expect(result).toEqual(updated);
  });

  it('throws an error when response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(updateComment(mockComment)).rejects.toThrow(
      'Failed to update comment',
    );
  });
});
