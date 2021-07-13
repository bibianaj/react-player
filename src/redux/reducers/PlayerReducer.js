const initialState = {
    playList: [],
    url: "",
    title: "",
    playId: null,

    // player controller
    isControlDisplay: true,
    loop: false,
    isPlay: true,
    muted: false,
    playbackRate: 1,
    isFullscreen: false,
    light: false,
    played: 0,
    volume: 1,
    seeking: false,
    loading: false,
    qualityLevels: [],
    currentQualityLevel: null
};

const Player = (state = initialState, action) => {
    switch (action.type) {
        case "PLAYER_UPDATE":
            //return { ...state, state: state[action.payload.attribute] = action.payload.value };
            let state_ = Object.assign({}, state);
            state_[action.payload.attribute] = action.payload.value;
            return state_
        default:
            return state;
    }
};

export default Player;