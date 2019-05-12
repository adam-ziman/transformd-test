import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import CharacterModal from '../modal';
import noImage from './image-not-found.png';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: 'auto',
  },
  // had problems placeing this where i wanted it to go
  tooltip: {
    position: 'relative',
    bottom: -50,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  button: {
    margin: theme.spacing.unit,
  },
  pagination: {
    'text-align': 'centre'
  }
});

const getData = async (fetchURL='https://swapi.co/api/people/') => {

  const resp = await fetch(fetchURL);

  if (resp.status === 200) {
    const characters = await resp.json();

    return characters;
  } else {
    // Need to decide what to do here
  }
};

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      selectedCharacter: {},
      nextPageURL: null,
      prevPageURL: null,
      clicks: 0
    };
  }

  selectCharacter(character) {
    this.setState({ selectedCharacter: character });
    this.setState((prevState) => ({
      clicks: prevState.clicks + 1
    }));
  };

  async newPage(pageURL) {
    const data = await getData(pageURL);

    this.setState({ characters: data.results });
    this.setState({ nextPageURL: data.next ? data.next : null });
    this.setState({ prevPageURL: data.previous ? data.next : null });
  };

  async componentDidMount() {
    const data = await getData();

    this.setState({ characters: data.results });
    this.setState({ nextPageURL: data.next });
  }

  render() {
    const { 
      characters, selectedCharacter, nextPageURL, prevPageURL, clicks
    } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.pagination}>
          <Button 
            disabled={!prevPageURL} 
            variant='contained' 
            className={classes.button} 
            onClick={()=> this.newPage(prevPageURL)}
          >
            Previous
          </Button>
          <Button 
            disabled={!nextPageURL} 
            variant='contained' 
            className={classes.button} 
            onClick={()=> this.newPage(nextPageURL)}
          >
            Next
          </Button>
        </div>
        <GridList cols={4} cellHeight={300} className={classes.gridList}>
          {characters.map((character) => (
            <GridListTile key={character.name} >
              <img src={noImage} alt={character.name} />
              <GridListTileBar
                title={character.name}
                subtitle={`Viewed ${clicks}`}
                actionIcon={
                  <IconButton className={classes.icon} onClick={()=> this.selectCharacter(character)}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        <CharacterModal character={selectedCharacter} />
      </div>
    );
  }
}

Grid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Grid);
