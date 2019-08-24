const recorderContainer = document.getElementById(
    "jsRecordContainer"
) as HTMLDivElement;
const recordButton = document.getElementById(
    "jsRecordButton"
) as HTMLButtonElement;
const videoPreview = document.getElementById(
    "jsVideoPreview"
) as HTMLVideoElement;

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {
                width: 1280,
                height: 720
            }
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
    } catch (err) {
        recordButton.innerHTML = "Cannot Record";
        recordButton.removeEventListener("click", startRecording);
    }
}

function init() {
    recordButton.addEventListener("click", startRecording);
}

if (recorderContainer) {
    init();
}
