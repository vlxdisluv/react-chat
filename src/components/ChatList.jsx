import React from 'react';
import { withStyles } from 'material-ui/styles';
import List  from 'material-ui/List';
import ChatListItem from './ChatListItem.jsx';

const styles = theme => ({
  chatsList: {
    height: 'calc(100% - 56px)',
    overflowY: 'scroll',
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  colorAvatar: {
    color: '#fff',
    backgroundColor: '#F44336',
  },
});

const ChatList = ({ classes, chats }) => (
  <List className={classes.chatsList}>
    {chats.map((chat, index) => (
      <ChatListItem key={index} {...chat} />
    ))}
  </List>
);

export default withStyles(styles)(ChatList);
