import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Typography, Button } from '@material-ui/core';
import VolumeControl from '../widget/VolumeControl';
import { PlayerUpdate } from '../../redux/actions/PlayerActions';
import { PlayArrow, Pause, Fullscreen, FullscreenExit, Loop, HourglassEmpty } from '@material-ui/icons';
import screenful from "screenfull";
import PlayerProgressbar from '../widget/PlayerProgressbar';
import PlaybackRateSelector from '../widget/PlaybackRateSelector';
import QualityLevelsSelector from '../widget/QualityLevelsSelector';

import { TimeFormatter } from '../../Utils/TimeUtils';

const styles = theme => ({
    controlWrapper: {
        position: 'absolute',
        top: 0, bottom: 0, right: 0, left: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    controlIcons: {
        color: "#777",
        fontSize: 50,
        transform: 'scale(0.9)',
        "&:hover": {
            color: '#fff',
            transform: 'scale(1.2)'
        }
    }
});

const mapStateToProps = state => {
    return {
        title: state.Player.title,
        loop: state.Player.loop,
        isPlay: state.Player.isPlay,
        isFullscreen: state.Player.isFullscreen,
        loading: state.Player.loading,
        isControlDisplay: state.Player.isControlDisplay,
    }
}


const PlayerControl = props => {
    const { classes, title, loop, isPlay, isFullscreen, loading, isControlDisplay, config } = props;
    const { PlayerUpdate } = props;
    const { playerContainerRef, playerRef, played } = config;
    const [elapsedTime, setElapsedTime] = useState(null);
    const [totalDuration, setTotalDuration] = useState(null);

    const duration = playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
    const currentTime = playerRef && playerRef.current ? playerRef.current.getCurrentTime() : "00:00";

    const loopHandler = () => {
        PlayerUpdate([['loop', !loop]])
    }

    const isPlayHandler = () => {
        PlayerUpdate([['isPlay', !isPlay]])
    }

    const fullScreenHandler = () => {
        PlayerUpdate([['isFullscreen', !isFullscreen]])
        screenful.toggle(playerContainerRef.current);
    };

    useEffect(() => {
        const elapsedTime = TimeFormatter(currentTime);
        const totalDuration = TimeFormatter(duration);

        setElapsedTime(elapsedTime);
        setTotalDuration(totalDuration);

    }, [currentTime]);


    return (
        <div className={classes.controlWrapper} style={{ display: isControlDisplay ? '' : 'none'}}>
            <Grid container direction="row" alignItems="center" justify="space-between" style={{ padding: 16 }} >
                <Grid item>
                    <Typography variant="h5" style={{ color: '#fff', marginLeft: 20 }}>{title}</Typography>
                </Grid>
            </Grid>
            {/* Middle */}
            <Grid container direction="row" alignItems="center" justify="center" style={{ padding: 16 }} >
                <Grid item>             
                    {
                        !Boolean(loading) &&
                        <IconButton className={classes.controlIcons} onClick={isPlayHandler}>
                            {
                                Boolean(isPlay) ? <Pause fontSize="inherit" /> : <PlayArrow fontSize="inherit" />
                            }
                        </IconButton>
                    }
                    {
                        Boolean(loading) &&
                        <IconButton className={classes.controlIcons} onClick={isPlayHandler}>
                            <Typography variant="h5" style={{ color: '#fff' }}><HourglassEmpty fontSize="inherit" />Loading...</Typography>
                        </IconButton>
                    }
                </Grid>
            </Grid>

            {/* Bottom */}
            <Grid container spacing={2} direction="row" alignItems="center" justify="space-between" style={{ padding: 16 }}>
                
                <Grid item xs={12}>
                    <PlayerProgressbar config={{ playerRef: playerRef, elapsedTime: elapsedTime, totalDuration: totalDuration, played: played }} />
                </Grid>

                <Grid item>
                    <Grid container alignItem="center">
                        <IconButton style={{ color: '#fff' }} onClick={isPlayHandler}>
                            { Boolean(isPlay) ? <Pause fontSize="inherit" /> : <PlayArrow fontSize="inherit" /> }
                        </IconButton>

                        <VolumeControl />
                        <Button varient="text" style={{ color: '#fff', marginLeft: 15 }}>
                            <Typography>{elapsedTime} / {totalDuration}</Typography>
                        </Button>
                    </Grid>
                </Grid>


                <Grid item>
                    <PlaybackRateSelector />
                    <QualityLevelsSelector />
                    <IconButton style={{ color: '#fff' }} onClick={fullScreenHandler}>
                        { Boolean(isFullscreen) ? <FullscreenExit fontSize="inherit" /> : <Fullscreen fontSize="inherit" /> }
                    </IconButton>                    
                    <IconButton style={{ color: loop ? 'cornflowerblue' : '#fff' }} onClick={loopHandler}>
                        <Loop fontSize="inherit" />                        
                    </IconButton>
                </Grid>
                
            </Grid>
        </div>
    )
};

PlayerControl.propTypes = {
    classes: PropTypes.object.isRequired
}

export default compose(connect(mapStateToProps, {
    PlayerUpdate
}), withStyles(styles))(PlayerControl);