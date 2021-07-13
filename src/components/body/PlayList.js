import PropTypes from 'prop-types';
import React, { } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Card, CardActions, CardActionArea, CardContent, Typography, Button, Chip } from '@material-ui/core';
import PlayCircleFilledOutlined from '@material-ui/icons/PlayCircleFilledOutlined';
import Face from '@material-ui/icons/Face';
import { selectPlayer_action } from './../../redux/actions/PlayerActions';

import VideoPlayer from './../body/VideoPlayer';

const styles = theme => ({
})

const mapStateToProps = state => {
    return {
        playId: state.Player.playId
    }
}

const PlayList = props => {
    const { config, selectPlayer_action, playId } = props;
    const { playList } = config;

    const selectAndPlayVideo = (obj) => {
        selectPlayer_action(obj)
    }

    return (
        <React.Fragment>
            <Paper style={{ maxHeight: 500, overflow: 'auto', marginBottom: 10, marginLeft: 10 }}>
                {
                    playList.map(option => (
                        <Card style={{ width: '100%' }}>
                            <CardActionArea style={{ backgroundColor: playId == option.id ? 'mistyrose' : '' }}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">{option.title}</Typography>
                                    {/* <VideoPlayer config={{ url: option.url, title: '', light: true }} /> */}
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button variant="outlined" size="medium" color="primary"
                                    startIcon={<PlayCircleFilledOutlined style={{ color: 'red' }} />}
                                    disabled={playId == option.id ? true : false}
                                    onClick={() => { selectAndPlayVideo(option) }}
                                > PLAY
                                </Button>
                                {
                                    Boolean(playId == option.id) &&
                                    <Chip
                                        icon={<Face />}
                                        label={'You are watching this Video Now !'}
                                        color="secondary"
                                    />
                                }
                            </CardActions>
                        </Card>
                    ))
                }
            </Paper>

        </React.Fragment>
    )
};

PlayList.propTypes = {
    classes: PropTypes.object.isRequired
}

export default compose(connect(mapStateToProps, {
    selectPlayer_action
}), withStyles(styles))(PlayList);