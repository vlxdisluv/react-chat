import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';

jest.mock('./LoginForm', () => () => 'LoginForm');
jest.mock('./SignupForm', () => () => 'SignupForm');
jest.mock('./ErrorMessage', () => () => './ErrorMessage');

const mockProps = {
  signup: jest.fn(),
  login: jest.fn(),
  isAuthenticated: false,
  error: null,
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter initialEntries={['/']}>
      <Route path="/(welcome)?" render={props => <WelcomePage {...mockProps} {...props} />} />
    </MemoryRouter>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
