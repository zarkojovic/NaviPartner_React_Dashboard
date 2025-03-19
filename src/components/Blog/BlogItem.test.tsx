import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import configureStore, {MockStore} from 'redux-mock-store';
import thunk from 'redux-thunk';
import BlogItem from './BlogItem';
import {deleteBlog} from '../../redux/blog/blogSlice';
import {useNavigate} from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const blog = {
    id: '1',
    title: 'Test Blog Title',
    datePosted: '2023-01-01T00:00:00Z',
};

const initialState = {};

describe('BlogItem', () => {
    let store: MockStore;
    const navigate = jest.fn();

    beforeEach(() => {
        store = mockStore(initialState);
        (useNavigate as jest.Mock).mockReturnValue(navigate);
    });

    it('renders the BlogItem component', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <BlogItem blog={blog} onDeleteMessage={jest.fn()}/>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Test Blog Title')).toBeInTheDocument();
        expect(screen.getByText('Created at: 1/1/2023')).toBeInTheDocument();
    });

    it('navigates to blog detail page on title click', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <BlogItem blog={blog} onDeleteMessage={jest.fn()}/>
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText('Test Blog Title'));
        expect(navigate).toHaveBeenCalledWith(`/blog/${blog.id}`);
    });

 
    it('shows and hides the modal', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <BlogItem blog={blog} onDeleteMessage={jest.fn()}/>
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByRole('button', {name: /ellipsis/i}));
        fireEvent.click(screen.getByText('Delete Blog'));
        expect(screen.getByText('Are you sure you want to delete this blog post?')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Cancel'));
        expect(screen.queryByText('Are you sure you want to delete this blog post?')).not.toBeInTheDocument();
    });

    it('dispatches deleteBlog action on confirm delete', () => {
        const onDeleteMessage = jest.fn();
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <BlogItem blog={blog} onDeleteMessage={onDeleteMessage}/>
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByRole('button', {name: /ellipsis/i}));
        fireEvent.click(screen.getByText('Delete Blog'));
        fireEvent.click(screen.getByText('Confirm'));

        const actions = store.getActions();
        expect(actions).toContainEqual(deleteBlog(blog.id));
        expect(onDeleteMessage).toHaveBeenCalledWith('Blog has been deleted.');
    });
});