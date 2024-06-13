import React, { useEffect, useRef, useState } from 'react';
import styles from './carousel.module.scss';
import ArrowButton from '../buttons/arrow/ArrowButton'



export default function carousel(props) {

  const carouselContainerRef = useRef(null);
  const carouselSliderRef = useRef(null);
  const carouselCardsRef = useRef(null);

  const [cardWidth, setCardWidth] = useState(0);
  const [sliderGap, setSliderGap] = useState(0);
  const [totalSliderWidth, setTotalSliderWidth] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [sliderRotationAmount, setSliderRotationAmount] = useState(0);
  const [sliderEndReached, setSliderEndReached] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [carouselMoving, setCarouselMoving] = useState(false);
  const [slidesVisible, setSlidesVisible] = useState(false);



  const handleCardActivityStates = () => {

    setCarouselMoving(false);

    const carouselContainerWidth = carouselContainerRef.current.offsetWidth;
    const carouselOverflowLeft = (windowWidth - carouselContainerWidth) / 2;

    if (!carouselCardsRef.current) return;

    carouselCardsRef.current.map((card) => {
      const cardStyles = card.getBoundingClientRect();

      if (cardStyles.right < carouselOverflowLeft || cardStyles.left > carouselContainerWidth + carouselOverflowLeft) {
        card.classList.remove(styles['carousel__slide--active']);
      } else {
        card.classList.add(styles['carousel__slide--active']);
      }
    });
  }


  const rotateSliderNext = () => {


    const carouselContainerWidth = carouselContainerRef.current.offsetWidth;

    //TOTAL NUMBER OF FULL CARDS THAT FITS IN CONTAINER
    const newSliderPosition = sliderPosition - (sliderRotationAmount);
    const carouselEnd = totalSliderWidth - carouselContainerWidth;

    if (carouselEnd <= (newSliderPosition * -1)) { //IF SLIDER REACHES END
      setSliderPosition(0 - carouselEnd);
      setSliderEndReached(true);
    } else {
      setSliderPosition(newSliderPosition);
    }

    setCarouselMoving(true);

    setTimeout(() => {
      handleCardActivityStates();
    }, 600)

  }


  const rotateSliderPrev = () => { //IF SLIDER TRIES TO GO PAST START
    
    const newSliderPosition = sliderPosition + (sliderRotationAmount);

    if (sliderEndReached) setSliderEndReached(false);

    if (newSliderPosition >= 0) {
      setSliderPosition(0);
    } else {
      setSliderPosition(newSliderPosition);
    }


    setCarouselMoving(true);

    setTimeout(() => {
      handleCardActivityStates();
    }, 600)
    
  }

  const calculateRotationAmount = () => {
    //HOW MANY CARDS + SLIDER GAP GO INTO SLIDER CONTAINER
    //INCLUDES ADDITIONAL SLIDER GAP TO CONTAINER TO REMOVE GAP FROM OTHER SIDE OF EQUATION
    //SETS ROTATION AMOUNT

    const carouselContainerWidth = carouselContainerRef.current.offsetWidth;
    const slideAndGapWidth = cardWidth + sliderGap;

    const fullCardsInContainer = Math.floor((carouselContainerWidth + sliderGap) / slideAndGapWidth);
    const rotationAmount = slideAndGapWidth * fullCardsInContainer;

    setSliderRotationAmount(rotationAmount);
  }


  useEffect(() => {
    //ADDS THE TOTAL WIDTH OF CARDS AND GAPS TOGETHER FOR TOTAL SLIDER WIDTH

    const numberOfCards = carouselSliderRef.current.children.length;
    const widthOfAllCards = (cardWidth * numberOfCards);

    const widthOfAllGaps = ((numberOfCards - 1) * sliderGap);

    setTotalSliderWidth(widthOfAllGaps + widthOfAllCards);
    calculateRotationAmount();
  }, [carouselCardsRef.current, sliderGap]);

  
  useEffect(() => {
    if (carouselCardsRef.current && !slidesVisible && totalSliderWidth) {
        carouselCardsRef.current.forEach((card) => {
            card.classList.add(styles['carousel__slide--visible']);
        });
    }

    handleCardActivityStates();
  }, [totalSliderWidth]);




  const handleResize = () => {
    //INITIAL SETUP WHICH RESETS EVERYTHING WHEN WINDOW RESIZED
    if (!carouselSliderRef) return;

    setWindowWidth(window.innerWidth);

    const cards = carouselSliderRef.current.children;
    const styles = window.getComputedStyle(carouselSliderRef.current);
    const gapValue = styles.getPropertyValue('gap');

    if (gapValue) setSliderGap(parseFloat(gapValue));
    
    if (cards) {
      const cardWidth = cards[0].getBoundingClientRect();
      carouselCardsRef.current = Array.from(cards);
      setCardWidth(cardWidth.width);
    }
  }


  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleResizeDebounced = debounce(handleResize, 300);

  useEffect(() => {
    // Initial setup on component mount
    handleResize()

    // Event listener for window resize
    window.addEventListener('resize', handleResizeDebounced);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResizeDebounced);
    };
  }, [handleResizeDebounced]);



  return (
    <section
      aria-roledescription='carousel'
      role='region'
      className={`carousel ${carouselMoving ? styles['carousel--moving'] : ''}`}
    >
        <div ref={carouselContainerRef} className={styles.carousel__container}>
          <div>
            <div
                style={{
                    width: `${totalSliderWidth}px`,
                    transform: `translate3d(${sliderPosition}px, 0px, 0px)`,
                }}
                ref={carouselSliderRef}
                className={`${ styles.carousel__scroller} ${props.narrow ? styles.carousel__scroller__narrow : ''}`}
                >
                  {props.children}
            </div>
          </div>
        </div>
        <div className={totalSliderWidth < (carouselContainerRef.current?.offsetWidth || 0) ? styles['carousel__buttons--hidden'] : styles.carousel__buttons} role='group' aria-label='slide-controls'>
            <ArrowButton isBackButton={true} disabled={sliderPosition === 0 || carouselMoving} onClickFunction={ rotateSliderPrev} ariaLabel={'Prior Slide'}></ArrowButton>
            <ArrowButton isBackButton={false} disabled={sliderEndReached || carouselMoving} onClickFunction={rotateSliderNext} ariaLabel={'Prior Slide'}></ArrowButton>
        </div>
      </section>
  )
}