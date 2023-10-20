import { useRef, useState } from "react";
import * as faceapi from 'face-api.js';
import { Button } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

export const Preview = (props) => {
  const { screenshot, turnOnCamera, setter } = props;

  const previewRef = useRef();
  const [isFlashing, setIsFlashing] = useState(true);
  const [confidence, setConfidence] = useState(0);

  const detectFaces = async (previewRef) => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('facenet/models/ssd_mobilenetv1');
    await faceapi.nets.faceLandmark68Net.loadFromUri('facenet/models/face_landmark_68');
    await faceapi.nets.faceRecognitionNet.loadFromUri('facenet/models/face_recognition');
    const faces = await faceapi.detectAllFaces(previewRef.current).withFaceLandmarks().withFaceDescriptors();
    const displaySize = { width: previewRef.current.width, height: previewRef.current.height };
    const resizedDetections = faceapi.resizeResults(faces, displaySize);
    return resizedDetections;
  };

  const handleScreenshot = async () => {
    const faces = await detectFaces(previewRef);
    setIsFlashing(false);
    setConfidence(Math.floor(faces[0].detection.score * 100));
    const descriptorArray = Object.keys(faces[0].descriptor).map(key => {
      return faces[0].descriptor[key];
    });

    setter(descriptorArray);
  }

  return (
    <div className="preview">
      {
        screenshot != null && (
          <>
            <div className="preview-container">
              <img ref={previewRef} src={screenshot} alt="preview" onLoad={handleScreenshot} />
            </div>

            <div className="result-container">
              {
                confidence > 75 ? <DoneIcon style={{ fontSize: 128, color: "lime" }} />
                  : <CloseIcon style={{ fontSize: 128, color: "red" }} />
              }

              <h1>Confidence: {confidence}%</h1>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ padding: "8px 20px" }}
                onClick={turnOnCamera}
              >
                Retake
              </Button>
            </div>
          </>
        )
      }

      {
        isFlashing && (
          <div className="flash-container">
            <img alt="flash" src="/assets/recognition.gif" />
          </div>
        )
      }
    </div>
  )
}