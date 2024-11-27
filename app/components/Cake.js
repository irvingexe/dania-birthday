'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function Cake() {

  const cake = useRef(null);
  const [candleCount, setCandleCount] = useState(9);
  let candles = useMemo(() => [], []);
  let audioContext;
  let analyser;
  let microphone;

  function updateCandleCount() {
    const activeCandles = candles.filter(
      (candle) => !candle.classList.contains("out")
    ).length;
    setCandleCount(activeCandles);
  }

  const addCandle = useCallback((left, top) => {
    const candle = document.createElement("div");
    candle.className = "candle";
    candle.style.left = left + "px";
    candle.style.top = top + "px";

    const flame = document.createElement("div");
    flame.className = "flame";
    candle.appendChild(flame);

    cake.current.appendChild(candle);
    candles.push(candle);
  }, [candles])

  function isBlowing() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    let average = sum / bufferLength;

    return average > 40; //
  }

  function blowOutCandles() {
    let blownOut = 0;

    if (isBlowing()) {
      candles.forEach((candle) => {
        if (!candle.classList.contains("out") && Math.random() > 0.5) {
          candle.classList.add("out");
          blownOut++;
        }
      });
    }

    if (blownOut > 0) {
      updateCandleCount();
    }
  }

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 256;
        setInterval(blowOutCandles, 200);
      })
      .catch(function (err) {
        console.log("Unable to access microphone: " + err);
      });
  } else {
    console.log("getUserMedia not supported on your browser!");
  }

  useEffect(() => {
    cake.current.addEventListener("click", function (event) {
      const rect = cake.current.getBoundingClientRect();
      const left = event.clientX - rect.left;
      const top = event.clientY - rect.top;
      console.log(left, top);
      addCandle(left, top);
    });
  }, [addCandle])

  useEffect(() => {
    addCandle(23.399993896484375, 8)
    addCandle(117.39999389648438, 4)
    addCandle(160.39999389648438, 5)
    addCandle(71.39999389648438, 9)
    addCandle(50.399993896484375, 27)
    addCandle(182.39999389648438, 34)
    addCandle(147.39999389648438, 46)
    addCandle(92.39999389648438, 42)
    addCandle(230.39999389648438, 15)
  }, [addCandle])

  return (
    <div>
      <div className="candle-count-display">
        Candles on the Cake: <span id="candleCount">{candleCount}</span>
      </div>
      <div className="cake" ref={cake}>
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>
      </div>
    </div>
  );
}
