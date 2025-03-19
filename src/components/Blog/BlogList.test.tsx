import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore, {MockStore} from 'redux-mock-store';
import thunk from 'redux-thunk';
import BlogList from './BlogList';
import {selectBlogsByUserId} from '../../redux/blog/blogSlice';
import {useTypedSelector} from '../../hooks/useTypedSelector';

jest.mock('../../redux/blog/blogSlice', () => ({
    selectBlogsByUserId: jest.fn(),
}));

jest.mock('../../hooks/useTypedSelector', () => ({
    useTypedSelector: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const blogs = [
    {id: '1', title: 'Blog 1', datePosted: '2023-01-01T00:00:00Z', userId: 1},
    {id: '2', title: 'Blog 2', datePosted: '2023-01-02T00:00:00Z', userId: 1},
];

describe('BlogList', () => {
    let store: MockStore;

    beforeEach(() => {
        store = mockStore({});
    });

    it('renders correctly when there are no blogs', () => {
        (useTypedSelector as jest.Mock).mockReturnValue([]);
        render(
            <Provider store={store}>
                <BlogList userId={1}/>
            </Provider>
        );

        expect(screen.getByText('No blogs available for this user')).toBeInTheDocument();
    });

});