import {ReactFlvPlayer} from 'react-flv-player';

export const Live = () => {
    return (
        <>
        <ReactFlvPlayer
            type="flv"
            url="ws://localhost:8000/livesaku/saku.flv"
        />
        </>
    );
}