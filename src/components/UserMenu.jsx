import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import red from '@material-ui/core/colors/red';

const styles = theme => ({
  modalWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    outlineColor: red[500],
    width: '30%',
    minWidth: '300px',
    padding: theme.spacing.unit * 3,
  },
});

class UserMenu extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    disabled: PropTypes.bool.isRequired,
    activeUser: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string,
      isMember: PropTypes.bool.isRequired,
      isCreator: PropTypes.bool.isRequired,
      isChatMember: PropTypes.bool.isRequired,
    }).isRequired,
    logout: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
  };

  state = {
    isModalOpen: false,
    anchorEl: null,
    username: '',
    firstName: '',
    lastName: '',
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      username: nextProps.activeUser.username,
      firstName: nextProps.activeUser.firstName,
      lastName: nextProps.activeUser.lastName,
    });
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogoutClick = () => {
    this.props.logout();
    this.handleClose();
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  toggleEditProfileModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
    this.handleClose();
  };

  handleSaveClick = () => {
    this.props.editUser({
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    });
    this.toggleEditProfileModal();
  };

  render() {
    const { anchorEl, isModalOpen } = this.state;
    const { classes, disabled } = this.props;

    return (
      <React.Fragment>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          disabled={disabled}
          onClick={this.handleClick}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.toggleEditProfileModal}>Edit Profile</MenuItem>
          <MenuItem onClick={this.handleLogoutClick}>LogOut</MenuItem>
        </Menu>

        <Modal
          open={isModalOpen}
          className={classes.modalWrapper}
          onClose={this.toggleEditProfileModal}
        >
          <Paper className={classes.modal}>
            <Typography variant="title" id="modal-title">
              Edit profile
            </Typography>
            <TextField
              required
              fullWidth
              name="username"
              label="Username"
              placeholder="Enter you username..."
              type="text"
              margin="normal"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
            <TextField
              fullWidth
              name="firstName"
              label="First name"
              placeholder="Enter you first name..."
              type="text"
              margin="normal"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
            <TextField
              fullWidth
              name="lastName"
              label="Last name"
              placeholder="Enter you last name..."
              type="text"
              margin="normal"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
            <Button color="primary" onClick={this.handleSaveClick}>
              Save
            </Button>
            <Button onClick={this.toggleEditProfileModal}>Close</Button>
          </Paper>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UserMenu);
