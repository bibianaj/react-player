import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Popover } from '@material-ui/core';

import { PlayerUpdate } from '../../redux/actions/PlayerActions';

const styles = theme => ({
    bottomIcons: {
        color: "#fff",        
    }
})

const mapStateToProps = state => {
    return {
        playbackRate: state.Player.playbackRate
    }
}

const PlaybackRateSelector = props => {
    const { classes, playbackRate } = props;
    const { PlayerUpdate } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick  = (event) =>{
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const playbackRateHandler = (rate) => {
        PlayerUpdate([['playbackRate', rate]])
    }

    return (
        <React.Fragment>
            <Button variant="text" className={classes.bottomIcons} onClick={handleClick}>
                <Typography>{playbackRate}X</Typography>
            </Button>
            <Popover
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <Grid container direction="column-reverse">
                    {[0.5, 1, 1.5, 2].map((rate) => (
                        <Button
                            key={rate}
                            onClick={() => playbackRateHandler(rate)}
                            variant="text"
                        >
                            <Typography color={rate === playbackRate ? "secondary" : "inherit"}>
                                {rate}X
                            </Typography>
                        </Button>
                    ))}
                </Grid>
            </Popover>
        </React.Fragment>
    )
};

PlaybackRateSelector.propTypes = {
    classes: PropTypes.object.isRequired
}

export default compose(connect(mapStateToProps, {
    PlayerUpdate
}), withStyles(styles))(PlaybackRateSelector);