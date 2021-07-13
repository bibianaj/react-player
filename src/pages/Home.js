import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core';
import { PlayerUpdate, selectPlayer_action } from '../redux/actions/PlayerActions';
import VideoPlayer from '../components/body/VideoPlayer';
import PlayList from '../components/body/PlayList';
import VideoJSON from '../JSON/VideoJSON.json';

const styles = theme => ({
})

const mapStateToProps = state => {
    return {
        playList: state.Player.playList,
        url: state.Player.url
    }
}

const Home = props => {
    const { playList, url } = props;
    const { PlayerUpdate } = props;

    useEffect(() => {
        PlayerUpdate([['playList', VideoJSON.data]]);
        let tempObj = VideoJSON.data[0];
        selectPlayer_action(tempObj)
        PlayerUpdate([['url', tempObj.url]])
    }, [])


    return (
        <React.Fragment>
            <Grid container xs={12} style={{ marginTop: 100, marginLeft: 30 }}>
                <Grid item xs={8}>
                    {
                        Boolean(url) &&
                        <Container>
                            <VideoPlayer config={{ url: url }} />
                        </Container>
                    }
                </Grid>
                <Grid item xs={4}>
                    <PlayList config={{ playList: playList }} />
                </Grid>         
            </Grid>
        </React.Fragment>
    )
};

Home.propTypes = {
    classes: PropTypes.object.isRequired
}

export default compose(connect(mapStateToProps, {
    PlayerUpdate,
    selectPlayer_action
}), withStyles(styles))(Home);