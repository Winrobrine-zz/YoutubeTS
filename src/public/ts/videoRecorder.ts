const recorderContainer = document.getElementById(
    "jsRecordContainer"
) as HTMLDivElement;
const recordButton = document.getElementById(
    "jsRecordButton"
) as HTMLButtonElement;
const videoPreview = document.getElementById(
    "jsVideoPreview"
) as HTMLVideoElement;

let videoRecorder: MediaRecorder;

function onDataAvailable(event: BlobEvent) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(event.data);
    link.download = "recorded.webm";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}

function stopRecording() {
    videoRecorder.stop();

    videoPreview.pause();
    (<MediaStream>videoPreview.srcObject)
        .getTracks()
        .forEach(track => track.stop());
    videoPreview.srcObject = null;

    recordButton.onclick = startRecording;
    recordButton.innerHTML = "Start Recording";
}

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

        videoRecorder = new MediaRecorder(stream);
        videoRecorder.ondataavailable = onDataAvailable;
        videoRecorder.start();

        recordButton.innerHTML = "Stop Recording";
        recordButton.onclick = stopRecording;
    } catch (err) {
        recordButton.innerHTML = `Cannot Record: ${err}`;
        recordButton.onclick = null;
    }
}

function init() {
    recordButton.onclick = startRecording;
}

if (recorderContainer) {
    init();
}
