
import Hls from 'hls.js';

export const PlayerUpdate = options => {
    return dispatch => {
        options.forEach(opt => {
            dispatch({ type: "PLAYER_UPDATE", payload: { attribute: opt[0], value: opt[1] } });
        })
    }
}

export const selectPlayer_action = (obj) => {
    return dispatch => {
        dispatch(
            PlayerUpdate([
                ['url', obj.url],
                ['title', obj.title],
                ['playId', obj.id]
            ])
        )
    }
}

export const getQualityLevels_action = (video) => {
    return (dispatch, getState) => {

        let { url } = getState()['Player'];

        let hls = new Hls();
        hls.attachMedia(video);
        hls.loadSource(url);

        let levels_ = [];
        
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            levels_.push(data.levels);
            dispatch(PlayerUpdate([
                ['qualityLevels', levels_],
                ['currentQualityLevel', levels_[0][0].bitrate] // *TODO. Need to find current level and set the value
            ]))
        });
     
    }
}

// export const switchQualityLevel_action = (video) => {
//     return (dispatch, getState) => {

//         let { url } = getState()['Player'];
//         let hls = new Hls();
//         hls.attachMedia(video);
//         hls.loadSource(url);

//         let levels_ = [];
//         hls.on(Hls.Events.LEVEL_SWITCHING, function (eventName, data) {
//             console.log('data: ', data)
//             levels_.push({
//                 time: self.performance.now() - events.t0,
//                 id: data.level,
//                 bitrate: Math.round(hls.levels[data.level].bitrate / 1000),
//                 height: data.height,
//                 width: data.width
//             });
//             console.log('levels_', levels_)
//         });
//     }
// }