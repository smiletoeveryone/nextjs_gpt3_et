import { useState } from 'react';


const TextToSpeech = ({ text }: { text: string }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'zh-CN'
    window.speechSynthesis.speak(speech);
    setIsSpeaking(true);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div>
      <button onClick={handleSpeak} disabled={isSpeaking}>
        Speak
      </button>
      <button onClick={handleStop} disabled={!isSpeaking}>
        Stop
      </button>
      </div>
  );
};

export default TextToSpeech;

