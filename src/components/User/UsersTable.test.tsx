import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore, {MockStore} from 'redux-mock-store';
import thunk from 'redux-thunk';
import UsersTable from './UsersTable';
import {deleteUser} from '../../redux/user/userSlice';
import {BrowserRouter as Router} from 'react-router-dom';

jest.mock('../../redux/user/userSlice', () => ({
    deleteUser: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const users = [
    {id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', gender: 'Male'},
    {id: 2, first_name: 'Jane', last_name: 'Doe', email: 'jane.doe@example.com', gender: 'Female'},
];

describe('UsersTable', () => {
    let store: MockStore;

    beforeEach(() => {
        store = mockStore({});
    });

    it('renders correctly with no users', () => {
        render(
            <Provider store={store}>
                <Router>
                    <UsersTable users={[]} onUserClick={jest.fn()}/>
                </Router>
            </Provider>
        );

        expect(screen.getByText('No users available')).toBeInTheDocument();
    });

    it('renders the list of users correctly', () => {
        render(
            <Provider store={store}>
                <Router>
                    <UsersTable users={users} onUserClick={jest.fn()}/>
                </Router>
            </Provider>
        );

        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('Jane')).toBeInTheDocument();
    });

});