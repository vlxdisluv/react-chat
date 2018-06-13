import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import ChatListItem from './ChatListItem';

jest.mock('moment', () => () => ({ fromNow: () => 'a few seconds ago' }));

const mockProps = {
  disabled: false,
  active: false,
  chatId: '12345',
  title: 'myChat',
  createdAt: '2018-06-13T20:48:03.200Z',
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <ChatListItem {...mockProps} />
    </MemoryRouter>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
