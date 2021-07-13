import React, { } from 'react';
import { connect }  from 'react-redux';
import compose from 'recompose/compose';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Routes from './Routes';
import Header from './components/header/Header';

const styles = theme => ({
})

const mapStateToProps = state => {
  return {

  }
}

const Main = props => {

    return(
      <BrowserRouter>
      <Header />
      <Routes />
      </BrowserRouter>
    )
  };
  
  Main.propTypes = {
    classes: PropTypes.object.isRequired
  }
  
  export default compose(connect(mapStateToProps, {  
  }), withStyles(styles))(Main);