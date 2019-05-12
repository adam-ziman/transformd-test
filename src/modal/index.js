import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = (theme) => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

class SimpleModal extends React.Component {
  state = {
    open: false,
    character: {}
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidUpdate(prevProps) {
    const { character } = this.props;
    
    if (JSON.stringify(character) !== JSON.stringify(prevProps.character)) {
      this.setState({ character: character });
      this.setState({ open: true });
    }
  }

  render() {
    const { classes } = this.props;
    const { character } = this.state;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              {character.name}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Bio data:
            </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={`Height: ${character.height}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Weight: ${character.mass}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Hair colour: ${character.hair_color}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Skin colour: ${character.skin_color}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Eye colour: ${character.eye_color}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Birth year: ${character.birth_year}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Gender: ${character.gender}`}
                  />
                </ListItem>
              </List>
            <CharacterModal />
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
  character: PropTypes.object
};

// We need an intermediary variable for handling the recursive nesting.
const CharacterModal = withStyles(styles)(SimpleModal);

export default CharacterModal;