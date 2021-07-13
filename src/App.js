import PropTypes from 'prop-types';
import React, { } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Main from './Main';

const styles = theme => ({
  app: {
    position: 'relative',
    width: '95%',
    height: '100%'
  }
})

const customTheme = createMuiTheme({
  typography: {
    fontSize: 12,
    fontFamily: 'TitilliumWeb, sans-serif'
  }
})

const mapStateToProps = state => {
  return {

  }
}

const App = props => {
  const { classes } = props;

  return (
    <div className={classes.app}>
      <MuiThemeProvider them={customTheme}>
        <Main />
      </MuiThemeProvider>

    </div>
  )
};

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(connect(mapStateToProps, {

}), withStyles(styles))(App);
