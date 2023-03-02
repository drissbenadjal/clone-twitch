import {ReactFlvPlayer} from 'react-flv-player';

export const Live = ({name}) => {
    return (
        <>
        <ReactFlvPlayer
            type="flv"
            url={"ws://localhost:8000//" + name + ".flv"}
        />
        </>
    );
}