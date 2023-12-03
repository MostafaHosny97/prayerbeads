import React, { useEffect, useState } from 'react';
import './masba7a.css';
import myImage1 from './1.PNG';
import myImage2 from './2.png';
import myImage3 from './3.png';
import myImage4 from './4.png';
import myImage5 from './5.png';
import myImage6 from './6.png';
import alertSound from './alert.mp3'; // تغيير المسار حسب مكان ملف الصوت


export default function Masba7a() {
  const storedCounter = parseInt(localStorage.getItem('counter')) || 0;
  const storedValue = localStorage.getItem('selectedValue') || 'Infinity';
  const [counter, setCounter] = useState(storedCounter);
  const [currentImage, setCurrentImage] = useState(0);
  const [value, setValue] = useState(storedValue);
  const [showSuccessMessage33, setShowSuccessMessage33] = useState(false);
  const [showSuccessMessage99, setShowSuccessMessage99] = useState(false);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  const audioRef = React.createRef();
  



  const images = [ myImage1,myImage2, myImage3, myImage4,myImage5,myImage6];
  const buttonColors = ['#6B1A20', '#D5D8E1', '#232323','#263F88','#000','#49331d']; // Add colors corresponding to each image
  const counterColors = ['#263F88','#21636B', '#6B1A20','#232323','#000','#49331d']; // Add colors corresponding to each image
  
  useEffect(() => {
    // Update localStorage whenever the counter changes
    localStorage.setItem('counter', counter.toString());

    // Check if the counter has reached the desired value
    if (value === 33 && counter === 32) {
      playAlertSound();
    } else if (value === 99 && counter === 98) {
      playAlertSound();
    }
  }, );
  function playAlertSound() {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }

  useEffect(() => {
    // Update localStorage whenever the selected value changes
    localStorage.setItem('selectedValue', value);
  }, [value]);

  function changeCounter() {
    // Check if the navigator and vibrate API are available
    if (window.navigator && window.navigator.vibrate) {
      // Vibrate for 100 milliseconds
      window.navigator.vibrate(100);
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
        }, 2000);
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
        }, 2000);
      }
    } else {
      const increase = counter + 1;
      setCounter(increase);
    }
    // Play alert sound when the counter reaches the desired value
  if ((value === '33' && counter === 32) || (value === '99' && counter === 98)) {
    playAlertSound();
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
    playAlertSound(true);
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
    <section className='text-center h-full mx-auto mt-40 lg:mt-32 py-20'>
            <audio ref={audioRef} src={alertSound} />
      <button className="transform hover:scale-110 scale-100 transition-transform duration-300 custom-color w-12 lg:w-14 h-12 lg:h-14 bg-white rounded-full fixed bottom-14 left-10" style={buttonStyle}  onClick={changeImage}></button>
      <div>
        {/* <h1 className='original-text-shadow' style={counterStyle}>Prayer Beads</h1> */}
        <div className="msb7a flex justify-center items-center relative ">
        {/* mt-20 mb-16 */}
        <div className="imgs relative mx-auto text-center flex flex-col items-center">
        <h3 className='text-blue-900 font-bold text-7xl absolute top-[3.2rem] mb-auto' style={counterStyle}>{counter}</h3>
        <img src={images[currentImage]} className='w-60 shadow-xl' alt="Seb7a" />
        <div className="btns flex justify-center items-center mx-auto text-center">
          <button onClick={changeCounter} className='original-button absolute bottom-[0.7rem] transform scale-105 hover:scale-100 transition-transform duration-300'></button>
          <button onClick={resetCounter} className='original-button2 absolute bottom-[6.3rem] right-[3.2rem] transform scale-105 hover:scale-100 transition-transform duration-300'></button>
        </div>
      </div>

        </div>
      </div>

      <select className='text-3xl flex mt-16 mb-28 lg:my-24 cursor-pointer lg:text-4xl mx-auto font-bold border dark:border-white dark:text-white bg-blue-400 text-white dark:bg-blue-200 rounded-xl py-1 px-3 text-center' style={counterStyle} value={value} onChange={handleSelectChange}>
        <option className='text-center mx-auto' value={'Infinity'}>Infinity</option>
        <option className='text-center mx-auto' value={33}>33</option>
        <option className='text-center mx-auto' value={99}>99</option>
      </select>


      {showSuccessMessage33 && (
        <div role="alert" className="alert alert-success top-0 left-1/4 fixed text-white w-1/2 mx-auto text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-center mx-auto" fill="none" viewBox="0 0 24 24" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
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
          <p className="text-xl font-bold mb-4">هل أنت متأكد أنك تريد إعادة تعيين السبحة؟</p>
          <div className="flex justify-center space-x-4">
            <button onClick={confirmReset} className="bg-blue-500 text-white px-4 py-2 rounded-md">نعم</button>
            <button onClick={cancelReset} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">لا</button>
          </div>
        </div>
      )}

    </section>
  );
}
