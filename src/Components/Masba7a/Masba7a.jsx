import React, { useEffect, useRef, useState } from 'react';
import './masba7a.css';
import myImage2 from './2.png';
import myImage1 from './1.PNG';
import myImage3 from './3.png';
import myImage4 from './4.png';
import myImage5 from './5.png';
import myImage6 from './6.png';

export default function Masba7a() {
  const storedCounter = parseInt(localStorage.getItem('counter')) || 0;
  const storedValue = localStorage.getItem('selectedValue') || 'Infinity';
  const [counter, setCounter] = useState(storedCounter);
  const [currentImage, setCurrentImage] = useState(0);
  const [value, setValue] = useState(storedValue);
  const audioRef = useRef(null);
  const [showSuccessMessage33, setShowSuccessMessage33] = useState(false);
  const [showSuccessMessage99, setShowSuccessMessage99] = useState(false);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);



  const images = [myImage2, myImage1, myImage3, myImage4,myImage5,myImage6];
  const buttonColors = ['#C9A416', '#D5D8E1', '#232323','#263F88','#42A100','#C44E2F']; // Add colors corresponding to each image
  const counterColors = ['#21636B', '#263F88', '#C9A416','#232323','#42A100','#C44E2F']; // Add colors corresponding to each image
  
  useEffect(() => {
    // Update localStorage whenever the counter changes
    localStorage.setItem('counter', counter.toString());
  }, [counter]);


  function changeCounter() {
    // Check if vibration is supported
    if ('vibrate' in navigator) {
      // Attempt to vibrate for 100 milliseconds
      try {
        navigator.vibrate(1000);
        console.log('Vibration successful!');
      } catch (error) {
        console.error('Vibration failed.', error);
      }
    } else {
      console.warn('Vibration API not supported.');
    }
  
    // Play the click sound
    if (audioRef.current) {
      // Make sure the audio is loaded before playing
      audioRef.current.load();
      audioRef.current.play();
    }

    if (value === '33') {
      const increase = counter === 33 ? 1 : counter + 1;
      setCounter(increase);
      if (increase === 33) {
        // Show success message
        setShowSuccessMessage33(true);
        // Hide the success message after 2 seconds
        setTimeout(() => {
          setShowSuccessMessage33(false);
        }, 1000);
      }
    } else if (value === '99') {
      const increase = counter === 99 ? 1 : counter + 1;
      setCounter(increase);
      if (increase === 99) {
        // Show success message
        setShowSuccessMessage99(true);
        // Hide the success message after 2 seconds
        setTimeout(() => {
          setShowSuccessMessage99(false);
        }, 1000);
      }
    } else {
      const increase = counter + 1;
      setCounter(increase);
    }
  }
  

  function handleSelectChange(event) {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    setCurrentImage(0); // Reset image index when a new value is selected
    if (selectedValue > '0') {
      setCounter(0);
    }
  }

  function resetCounter() {
    setShowResetConfirmation(true);
  }

  function confirmReset() {
    // Reset the counter
    setCounter(0);
    setShowResetConfirmation(false);
  }

  function cancelReset() {
    // Hide the reset confirmation dialog
    setShowResetConfirmation(false);
  }

  function changeImage() {
    // Cycle through images when the button is clicked
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  }
  const buttonStyle = {
    backgroundColor: buttonColors[currentImage],
  };

  const counterStyle = {
    color: counterColors[currentImage],
  };


  return (
    <section className='text-center h-full mx-auto my-20'>
      <button className="custom-color w-10 lg:w-14 h-10 lg:h-14 bg-white rounded-full fixed bottom-14 left-10" style={buttonStyle}  onClick={changeImage}></button>
      <div>
        <h1 className='original-text-shadow' style={counterStyle}>Prayer Beads</h1>
        <div className="msb7a flex justify-center items-center relative mt-20 mb-16">
          <div className="imgs relative mx-auto text-center ">
            <h3 className='text-blue-900 font-extrabold text-7xl absolute right-[4.6rem] lg:right-[5.5rem] top-[3.2rem]  shadow-2xl' style={counterStyle}>{counter}</h3>
            <img src={images[currentImage]} className='w-60' alt="Seb7a" />
            <div className="btns flex justify-center items-center mx-auto text-center">
              <button onClick={changeCounter} className='original-button absolute bottom-[0.7rem]'></button>
              <button onClick={resetCounter} className='original-button2 absolute bottom-[6.2rem] right-[3.2rem] '></button>
            </div>
          </div>
        </div>
      </div>

      <select className='text-3xl cursor-pointer lg:text-4xl mx-auto font-bold border dark:border-white dark:text-white bg-blue-400 text-white dark:bg-blue-200  rounded-xl py-1 px-3 text-center' style={counterStyle} value={value} onChange={handleSelectChange}>
        <option className='text-center mx-auto' value={'Infinity'}>Infinity</option>
        <option className='text-center mx-auto' value={33}>33</option>
        <option className='text-center mx-auto' value={99}>99</option>
      </select>


      {showSuccessMessage33 && (
        <div role="alert" className="alert alert-success top-0 left-1/4 fixed text-white w-1/2 mx-auto text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-center mx-auto" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className='text-center mx-auto'>أكتمل التسبيح 33 مرة</span>
        </div>
      )}
      {showSuccessMessage99 && (
        <div role="alert" className="alert alert-success top-0 left-1/4 fixed text-white w-1/2 mx-auto text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-center mx-auto" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className='text-center mx-auto'>أكتمل التسبيح 99 مرة</span>
        </div>
      )}

      {/* Reset confirmation dialog */}
      {showResetConfirmation && (
        <div className="fixed font-bold rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 border border-gray-300 shadow-lg">
          <p className="text-xl font-bold mb-4">هل أنت متأكد أنك تريد إعادة تعيين العداد؟</p>
          <div className="flex justify-center space-x-4">
            <button onClick={confirmReset} className="bg-blue-500 text-white px-4 py-2 rounded-md">نعم</button>
            <button onClick={cancelReset} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">لا</button>
          </div>
        </div>
      )}

    </section>
  );
}
