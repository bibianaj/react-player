import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Grid, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player';

import PlayerControl from './PlayerControl';
import { PlayerUpdate, selectPlayer_action, getQualityLevels_action } from '../../redux/actions/PlayerActions';
import _ from 'lodash';

const styles = theme => ({
    playerWrapper: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
})

const mapStateToProps = state => {
    return {
        playList: state.Player.playList,
        playId: state.Player.playId,
        loop: state.Player.loop,
        isPlay: state.Player.isPlay,
        muted: state.Player.muted,
        playbackRate: state.Player.playbackRate,
        light: state.Player.light,
        volume: state.Player.volume,
        seeking: state.Player.seeking,
        isControlDisplay: state.Player.isControlDisplay
    }
}

const VideoPlayer = props => {
    const { classes, playList, playId, loop, isPlay, muted, playbackRate, volume, seeking, isControlDisplay, config } = props;
    const { PlayerUpdate, selectPlayer_action, getQualityLevels_action } = props;
    const { url, light } = config;

    const playerContainerRef = useRef(null);
    const playerRef = useRef(null);
    const controlRef = useRef(null);

    const [played, setPlayed] = useState(0);


    const progressHandler = (changeState) => {
        if (!seeking) {
            setPlayed(changeState.played * 100)
        }
    }

    const onEndedHandler = () => {
        if (!loop) {
            let currentIndex = _.findIndex(playList, ['id', playId]);
            let nextObj = playList[currentIndex + 1];

            selectPlayer_action(nextObj)
        }
    }

    const onBufferHandler = () => {
        PlayerUpdate([['loading', true]]);
    }

    const onBufferEndHandler = () => {
        PlayerUpdate([['loading', false]]);
    }

    const controlsDisplayHandler = () => {
        PlayerUpdate([['isControlDisplay', !isControlDisplay]])

    }

    useEffect(() => {
        let video = document.getElementsByTagName('video');
        getQualityLevels_action(video);
    }, [url]);

    return (
        <React.Fragment>
            <div className={classes.playerWrapper} ref={playerContainerRef}>
                <ReactPlayer
                    ref={playerRef}
                    url={url}
                    light={light}
                    width="100%"
                    height="100%"
                    controls={false}
                    loop={loop}
                    playing={isPlay}
                    volume={volume}
                    muted={muted}
                    pip={true}
                    playbackRate={playbackRate}
                    onProgress={progressHandler}
                    onEnded={onEndedHandler}
                    onBuffer={onBufferHandler}
                    onBufferEnd={onBufferEndHandler}
                    config={{
                        file: {
                            hlsOptions: {
                            },
                            attributes: {
                                crossorigin: "anonymous",
                            },
                        },
                    }}
                />
                <PlayerControl ref={controlRef} config={{ playerContainerRef: playerContainerRef, playerRef: playerRef, played: played }} />
            </div>
            <Grid item xs={12} style={{ marginTop: 10 }}>
                <Button variant="outlined" color="primary" onClick={controlsDisplayHandler}>
                    <Typography>SHOW/HIDE CONTROLS</Typography>
                </Button>
            </Grid>
        </React.Fragment>
    )
};

VideoPlayer.propTypes = {
    classes: PropTypes.object.isRequired
}

export default compose(connect(mapStateToProps, {
    PlayerUpdate,
    selectPlayer_action,
    getQualityLevels_action
}), withStyles(styles))(VideoPlayer);