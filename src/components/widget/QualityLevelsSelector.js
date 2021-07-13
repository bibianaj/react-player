import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
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
        currentQualityLevel: state.Player.currentQualityLevel,
        qualityLevels: state.Player.qualityLevels
    }
}

const QualityLevelsSelector = props => {
    const { classes, currentQualityLevel, qualityLevels } = props;
    const { PlayerUpdate } = props;
    const [displayLevels, setDisplayLevels] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick  = (event) =>{
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const qualityLevelHandler = (level) => {
        PlayerUpdate([['currentQualityLevel', parseInt(level)]])
    }


    useEffect(() => {
        let tempList = [];  
        qualityLevels.forEach((option) => {            
            option.forEach(option_ => {
                tempList.push(option_.bitrate)
            })
        });
        setDisplayLevels(tempList);
    }, [qualityLevels])

    return (
        <React.Fragment>
            <Button variant="text" className={classes.bottomIcons} onClick={handleClick}>
                <Typography>{currentQualityLevel/1000}p</Typography>
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
                    { displayLevels.map((level) => (
                        <Button
                            key={level}
                            onClick={() => qualityLevelHandler(level)}
                            variant="text"                        >
                            <Typography color={level === currentQualityLevel ? "secondary" : "inherit"}>
                                {level / 1000}p
                            </Typography>
                        </Button>
                    ))}
                </Grid>
            </Popover>
        </React.Fragment>
    )
};

QualityLevelsSelector.propTypes = {
    classes: PropTypes.object.isRequired
}

export default compose(connect(mapStateToProps, {
    PlayerUpdate
}), withStyles(styles))(QualityLevelsSelector);