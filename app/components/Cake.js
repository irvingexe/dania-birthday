'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Confetti } from "../utils/confetti.min.js";
import { ConfettiRandom } from "../utils/ConfettiRandom.min.js";
import Image from "next/image.js";
import mazapan from "@/assets/mazapan.png";
import mazapan1 from "@/assets/mazapan1.png";
import mazapan2 from "@/assets/mazapan2.png";
import dania from "@/assets/dania.png";
import bg from "@/assets/bg.jpg";
import balloons from "@/assets/balloons2.webp"
import Vara from "vara";

export default function Cake() {
  const [outAnimation, setOutAnimation] = useState(false);
  const [mazapanOpen, setMazapanOpen] = useState(false);
  const [start, setStart] = useState(false);
  const [preAnim, setPreAnim] = useState(false);
  const happyBirthday = useRef(null);
  const blowText = useRef(null);
  const cake = useRef(null);
  const fireworks = useRef(null);
  const candleCount = useRef(9);
  const pop = useRef(new Audio("./pop.mp3"));
  const cepillin = useRef(new Audio("./cepillin.mp3"));
  let candles = useMemo(() => [], []);
  let audioContext;
  let analyser;
  let microphone;

  function updateCandleCount() {
    const activeCandles = candles.filter(
      (candle) => !candle.classList.contains("out")
    ).length;
    candleCount.current = activeCandles;
    if (!activeCandles) playPop();
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

  const enableMic = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function (stream) {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
          analyser = audioContext.createAnalyser();
          microphone = audioContext.createMediaStreamSource(stream);
          microphone.connect(analyser);
          analyser.fftSize = 256;
          setTimeout(() => { setInterval(blowOutCandles, 300) }, 3000);
          setStart(true);
        })
        .catch(function (err) {
          console.log("Unable to access microphone: " + err);
        });
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  }

  /*
  useEffect(() => {
    cake.current.addEventListener("click", function (event) {
      const rect = cake.current.getBoundingClientRect();
      const left = event.clientX - rect.left;
      const top = event.clientY - rect.top;
      console.log(left, top);
      addCandle(left, top);
    });
  }, [addCandle])
  */

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

  useEffect(() => {
    let confetti = new Confetti({
      particleCount: 100,
      spread: 70,
    });
    confetti.setupElement("cake");
    confetti.setFade(false);
    confetti.setSize(1.5);
    confetti.setPower(50);
  }, [])

  useEffect(() => {
    let confetti = new ConfettiRandom({
      particleCount: 100,
      spread: 70,
    });
    confetti.setupElement("fireworks");
    confetti.setFade(true);
    confetti.setSize(1.5);
    confetti.setPower(50);
  }, [])

  useEffect(() => {
    if (mazapanOpen) {
      setInterval(() => {
        fireworks.current.click();
      }, 700);
    }
  }, [mazapanOpen])

  const playPop = () => {
    pop.current.pause();
    pop.current.currentTime = 0;
    pop.current.volume = 1;
    pop.current.play();

    document.querySelector('.surprise').classList.add('rotate');

    setTimeout(() => {
      cake.current.click();
    }, 500);
    setTimeout(() => {
      setPreAnim(true);
    }, 1500);
    setTimeout(() => {
      setMazapanOpen(true);
    }, 4000);
    setTimeout(() => {
      setOutAnimation(true);

      cepillin.current.pause();
      cepillin.current.currentTime = 0;
      cepillin.current.volume = 1;
      cepillin.current.play();
    }, 3700);
  };

  useEffect(() => {
    const text = "HAPPY BIRTHDAY!";

    happyBirthday.current.innerHTML = text
      .split("")
      .map(letter => {
        if (letter === " ") {
          return `<div class="space"></div>`;
        }
        return `<div>` + letter + `</div>`;
      })
      .join("");

    Array.from(happyBirthday.current.children).forEach((div) => {
      div.classList.add("wavy");
    });
  }, [])

  useEffect(() => {
    const text = "Sopla las velas :)";

    blowText.current.innerHTML = text
      .split("")
      .map(letter => {
        if (letter === " ") {
          return `<div class="space"></div>`;
        }
        return `<div>` + letter + `</div>`;
      })
      .join("");

    Array.from(blowText.current.children).forEach((div) => {
      div.classList.add("wavy");
    });
  }, [])

  useEffect(() => {
    if (start) {
      new Vara(".birthday-text", "https://rawcdn.githack.com/akzhy/Vara/ed6ab92fdf196596266ae76867c415fa659eb348/fonts/Satisfy/SatisfySL.json", [{
        text: "Feliz dia Dania!",
        duration: 1500,
        y: 3,
      }], {
        fontSize: 62,
        strokeWidth: 2,
        color: "#fff",
        textAlign: "center"
      });
    }
  }, [start])

  useEffect(() => {
    pop.current.volume = 0;
    cepillin.current.volume = 0;
  }, [])

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="lights-container" />
      <div id="fireworks" ref={fireworks} />
      {/*<div className="candle-count-display">
        Candles on the Cake: <span id="candleCount">{candleCount}</span>
      </div>*/}
      <div className="w-full h-full">
        <Image src={bg} alt="bg" className={`bg opacity-0 ${outAnimation ? "opacity-100" : ""}`} />
      </div>
      <div className={`surprise ${start ? 'visible' : ''} ${preAnim ? "move" : ""}`}>
        <div className="relative h-full">
          <div >
            <Image src={mazapan} alt="mazapan" className={`mazapan-mini2 ${outAnimation ? "animate" : ""}`} />
            <Image src={mazapan} alt="mazapan" className={`mazapan-mini3 ${outAnimation ? "animate" : ""}`} />
          </div>
          <div className={`dania ${outAnimation ? "animate" : ""}`} >
            <div className="relative h-full">
              <div className={`balloons absolute ${outAnimation ? "animate" : ""}`} >
                <Image src={balloons} alt="balloons" />
                <h1 className="absolute happy-birthday flex justify-center" ref={happyBirthday} />
              </div>
              <Image src={dania} alt="Dania" className="absolute" />
            </div>
          </div>
          <div className={`mazapan`} >
            <div className="relative h-full">
              <Image src={mazapan1} alt="mazapan" className={`mazapan1 ${mazapanOpen ? "open" : ""}`} />
              <Image src={mazapan2} alt="mazapan" className={`mazapan2 ${mazapanOpen ? "open" : ""}`} />
            </div>
          </div>
        </div>
      </div>
      <div id="cake" className={`cake ${start ? 'visible' : ''}`} ref={cake}>
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>
      </div>
      <div className={`birthday-text absolute left-1/2 top-[15%] -translate-x-1/2 ${!candleCount.current ? 'opacity-0' : ''}`}>
      </div>
      <p className={`blow-text absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-56 opacity-0 ${start ? 'visible opacity-100' : ''} ${!candleCount.current ? '!opacity-0' : ''}`} ref={blowText}>{'Sopla las velas :)'}</p>
      <div className={`hello ${start ? 'hidden' : ''}`}>
        <span>
          Para comenzar, asegurate de subir el volumen y aceptar el uso del microfono
        </span>
        <button onClick={() => { pop.current.play(); cepillin.current.play(); enableMic() }}>
          Continuar
        </button>
      </div>
    </div>
  );
}
