import PropTypes from 'prop-types';
import React, { } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { Grid, IconButton } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { VolumeOffOutlined, VolumeUp } from '@material-ui/icons';

import { PlayerUpdate } from '../../redux/actions/PlayerActions';

const styles = theme => ({
})

const mapStateToProps = state => {
    return {
        volume: state.Player.volume,
        muted: state.Player.muted
    }
}

const VolumeControl = props => {
    const { volume, muted } = props;
    const { PlayerUpdate } = props;

    const volumeHandler = (event, newValue) => {
        PlayerUpdate([
            ['volume', parseFloat(newValue/100)],
            ['muted', newValue === 0 ? true : false]
        ])
    }

    const mutedHandler = () => {
        PlayerUpdate([['muted', !muted]])
    }

    return (
        <div>
            <Grid container spacing={2} direction="row" alignItems="center" justify="space-between">
                <Grid item>
                    <IconButton style={{ color: '#fff' }} onClick={mutedHandler}>
                        {
                            Boolean(muted) ? <VolumeOffOutlined /> : <VolumeUp />
                        }
                    </IconButton>
                </Grid>
                <Grid item xs>
                    <Slider style={{ color: '#fff', width: 100 }} min={0} max={100} value={muted ? 0 : volume * 100} onChange={volumeHandler} />
                </Grid>

            </Grid>

        </div>
    )
};

VolumeControl.propTypes = {
    classes: PropTypes.object.isRequired
}

export default compose(connect(mapStateToProps, {
    PlayerUpdate
}), withStyles(styles))(VolumeControl);