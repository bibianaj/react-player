import PropTypes from 'prop-types';
import React, { } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';

const styles = theme => ({
})

const mapStateToProps = state => {
    return {

    }
}

const Header = props => {

    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar variant="main-toolbar">
                    <IconButton edge="start" color="inherit" aria-label="open drawer">
                    <Menu />
                    </IconButton>
                    <Typography variant="h6" color="inherit">Video Player</Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
};

Header.propTypes = {
    classes: PropTypes.object.isRequired
}

export default compose(connect(mapStateToProps, {

}), withStyles(styles))(Header);