import { comments, setIsLoading, setSuccessfully } from '../reducers/comments';

describe('Reducer: COMMENTS', () => {
  it('without additional parameters should return initial state', () => {
    expect(comments.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        isLoading: true,
        isSuccessfully: false,
      });
  });
  it('should update comments by loading comments', () => {
    const state = {
      isLoading: true,
      isSuccessfully: false,
    };
    expect(comments.reducer(state, setIsLoading(false)))
      .toEqual({
        isLoading: false,
        isSuccessfully: false,
      });
  });
  it('should update comments by load comments', () => {
    const state = {
      isLoading: true,
      isSuccessfully: false,
    };
    expect(comments.reducer(state, setSuccessfully(true)))
      .toEqual({
        isLoading: true,
        isSuccessfully: true,
      });
  });
});
