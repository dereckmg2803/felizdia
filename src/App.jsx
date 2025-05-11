import { useState, useEffect, useRef } from 'react';
import './App.css';
import phrases from './utils/phrases.json';
import bgArr from './utils/bgArr.json';
import getRandomFromArr from './services/getRandomFromArr';
import Phrase from './components/Phrase';
import ButtonPhrase from './components/ButtonPhrase';
import gsap from 'gsap';
import { img1, img2, img3, img4, cookiesound, cookieleft, cookieright } from './assets';
import Title from './components/Title';
import { Modal } from 'antd';

const images = [img1, img2, img3, img4];

function App() {
  const quote = getRandomFromArr(phrases);
  const [phraseRandom, setPhraseRandom] = useState(quote);
  const [bgApp, setBgApp] = useState(getRandomFromArr(bgArr));
  const [image, setImage] = useState(getRandomFromArr(images));
  const [clickCount, setClickCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);


  // Refs para las animaciones
  const textRef = useRef(null);
  const cookieLeftRef = useRef(null);
  const cookieRightRef = useRef(null);
  const audioRef = useRef(new Audio(cookiesound));

  // Función para animar las cookies
  const animateCookies = () => {
    if (cookieLeftRef.current) {
      gsap.fromTo(
        cookieLeftRef.current,
        { opacity: 1, x: 0, y: 0 },
        { opacity: 0, x: -150, duration: 3.5, ease: 'power2.out' }
      );
    }
    if (cookieRightRef.current) {
      gsap.fromTo(
        cookieRightRef.current,
        { opacity: 1, x: 0, y: 0 },
        { opacity: 0, x: 150, duration: 3.5, ease: 'power2.out' }
      );
    }
  };

  useEffect(() => {
    animateCookies();
  }, []);
  

  // Animación con GSAP para el texto
  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 6, ease: 'elastic.out(1, 0.5)' }
      );
    }
  }, [bgApp]);

  // Cambiar el fondo del body cuando cambie la imagen de fondo
  useEffect(() => {
    document.body.style.backgroundImage = `url('${image}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.transition = 'background 0.5s ease-in-out';
  }, [image]);

const handleChangePhrase = () => {
  setClickCount(prev => {
    const newCount = prev + 1;
    if (newCount === 10) {
      setIsModalVisible(true);
    }
    return newCount;
  });

  setPhraseRandom(prev => getRandomFromArr(phrases, prev));
  setBgApp(prev => getRandomFromArr(bgArr, prev));
  setImage(prev => getRandomFromArr(images, prev));
  animateCookies();
};


  return (
    <>
      <Title />
      <div ref={cookieLeftRef} className="cookieleft">
        <img src={cookieleft} alt="cookie left animation" />
      </div>
      <div ref={cookieRightRef} className="cookieright">
        <img src={cookieright} alt="cookie right animation" />
      </div>
      <div className="galleta_container" ref={textRef}>
        <Phrase phraseRandom={phraseRandom} />
      </div>
      <ButtonPhrase handlePhrase={handleChangePhrase} />
      <Modal
  title="¡Felicidades!"
  open={isModalVisible}
  onOk={() => {
    setIsModalVisible(false);
    setClickCount(0); // reinicia el contador si quieres
  }}
  onCancel={() => {
    setIsModalVisible(true);
    setClickCount(0); // opcional también
  }}
>
  <p>¡Has recibido una sorpresa por ser el dia de las madres, presiona OK para reclamar!</p>
</Modal>

    </>
  );
}

export default App;
