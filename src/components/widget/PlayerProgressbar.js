import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { Slider, Tooltip } from '@material-ui/core';

import { PlayerUpdate } from '../../redux/actions/PlayerActions';

const styles = theme => ({
})

function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

const PrettoSlider = withStyles({
    root: {
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

const mapStateToProps = state => {
    return {

    }
}

const PlayerProgressbar = props => {
    const { config } = props;
    const { playerRef, elapsedTime, totalDuration, played } = config;
    const { PlayerUpdate } = props;

    const [played_, setPlayed_] = useState(played);

    const onSeekHandler = (event, newValue) => {
        setPlayed_(newValue/100)
    };

    const onSeekMouseDownHandler = (event) => {
        PlayerUpdate([['seeking', true]])
    }

    const onSeekMouseUp = (event, newValue) => {
        PlayerUpdate([['seeking', false]]);
        playerRef.current.seekTo(newValue/100, 'fraction');
    }


    useEffect(() => {
        setPlayed_(played)
    },[played]);

    return (
        <div>
            <PrettoSlider
                min={0}
                max={100}
                defaultValue={0}
                value={played_}
                ValueLabelComponent={(props) => (
                    <ValueLabelComponent {...props} value={elapsedTime} />
                )}
                onDuration={totalDuration}
                onChange={onSeekHandler}
                onMouseDown={onSeekMouseDownHandler}
                onChangeCommitted={onSeekMouseUp}
            />
        </div>
    )
};

PlayerProgressbar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default compose(connect(mapStateToProps, {
    PlayerUpdate
}), withStyles(styles))(PlayerProgressbar);