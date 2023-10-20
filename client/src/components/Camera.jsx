import React, { useRef, useState } from "react";
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import VideocamIcon from '@mui/icons-material/Videocam';
import { IconButton } from "@mui/material";
import { Preview } from "./Preview";

const Camera = (props) => {
  const { setter } = props;
  const webcamRef = useRef();
  const containerRef = useRef();
  const detection = useRef();

  const [outline, setOutline] = useState('#ff0000');
  const [message, setMessage] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [isDetected, setIsDetected] = useState(false);

  const takeScreenshot = () => {
    setScreenshot(webcamRef.current.getScreenshot());
    setCameraOpen(false);
    setIsDetected(true);
  }

  const handleStreamVideo = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('facenet/models/tiny_face_detector');
    let counter = 0;

    detection.current = setInterval(async () => {
      if (counter <= 40) {
        const faces = await faceapi.detectAllFaces(webcamRef.current.video, new faceapi.TinyFaceDetectorOptions())
        if (faces.length === 1 && faces[0].score > 0.5) {
          counter++;
          setOutline('#00ff00');
          setMessage('Stand still for ' + Math.round(4 - (counter / 10)) + ' seconds.');
        } else {
          counter = 0;
          setOutline('#f00000');
          setMessage('Place the face in the oval.');
        }
      } else {
        takeScreenshot();
        clearInterval(detection.current);
      }
    }, 100);
  }

  const handleCameraError = () => {
    setMessage('There was a problem accessing the Webcam. Grant permission and reload the page.');
  }

  const turnOnCamera = () => {
    setCameraOpen(true);
    setIsDetected(false);
  }

  return (
    <div className='camera-container' ref={containerRef}>
      {
        cameraOpen ? (
          <>
            <Webcam
              id="webcam"
              ref={webcamRef}
              className="camera-video"
              screenshotFormat='image/jpeg'
              screenshotQuality={1}
              height={600}
              mirrored={true}
              videoConstraints={{ facingMode: 'user' }}
              onUserMedia={handleStreamVideo}
              onUserMediaError={handleCameraError}
            />

            <div className="camera-overlay" style={{ borderColor: outline }}>
              <p>{message}</p>
            </div>
          </>
        ) : isDetected ? (
          <Preview screenshot={screenshot} turnOnCamera={turnOnCamera} setter={setter} />
        ) : (
          <>
            <img alt='face-placeholder' src='/assets/camera.jpg' />
            <IconButton sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              border: "2px solid white"
            }} onClick={turnOnCamera}>
              <VideocamIcon style={{ color: "white", fontSize: 96 }} />
            </IconButton>
          </>
        )
      }
    </div>
  );
};

export default Camera;