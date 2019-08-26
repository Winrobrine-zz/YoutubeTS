import axios from "axios";
import videojs from "video.js";
import routes from "../../routes";

async function updateView() {
    const videoId = window.location.href.split(`${routes.videos}/`)[1];

    try {
        await axios.patch(routes.api + routes.videoView(videoId));
    } catch (err) {
        console.log(err);
    }
}

function onVideoEnded() {
    updateView();
}

function init() {
    const player = videojs("youtsplayer", {}, () => {
        player.play();
        player.on("ended", onVideoEnded);
    });
}

if (document.getElementById("youtsplayer")) {
    init();
}
