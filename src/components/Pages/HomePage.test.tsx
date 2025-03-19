import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore, {MockStore} from 'redux-mock-store';
import thunk from 'redux-thunk';
import {HomePage} from './HomePage';
import {HelmetProvider} from 'react-helmet-async';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    user: {
        users: [],
        usersCount: 0,
    },
    blog: {
        blogs: [],
    },
};

describe('HomePage', () => {
    let store: MockStore;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders the HomePage component', () => {
        render(
            <Provider store={store}>
                <HelmetProvider>
                    <HomePage/>
                </HelmetProvider>
            </Provider>
        );

        expect(screen.getByText('Home Page - List Of Users')).toBeInTheDocument();
    });

    it('displays the loader initially', () => {
        render(
            <Provider store={store}>
                <HelmetProvider>
                    <HomePage/>
                </HelmetProvider>
            </Provider>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('displays the users table after loading', async () => {
        store = mockStore({
            user: {
                users: [{id: 1, name: 'John Doe'}],
                usersCount: 1,
            },
            blog: {
                blogs: [],
            },
        });

        render(
            <Provider store={store}>
                <HelmetProvider>
                    <HomePage/>
                </HelmetProvider>
            </Provider>
        );

        await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
    });

    it('handles page change', async () => {
        store = mockStore({
            user: {
                users: Array.from({length: 20}, (_, i) => ({id: i + 1, name: `User ${i + 1}`})),
                usersCount: 20,
            },
            blog: {
                blogs: [],
            },
        });

        render(
            <Provider store={store}>
                <HelmetProvider>
                    <HomePage/>
                </HelmetProvider>
            </Provider>
        );

        fireEvent.click(screen.getByText('2'));

        await waitFor(() => expect(screen.getByText('User 11')).toBeInTheDocument());
    });
});