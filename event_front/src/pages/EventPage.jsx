import { useState } from 'react';
import { CDBStepper, CDBStep } from 'cdbreact';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3 from '../components/Step3';
import Step4 from '../components/Step4';
import Step5 from '../components/Step5';
import Step6 from '../components/Step6';
import Step7 from '../components/Step7';
import Step8 from '../components/Step8';
import Step9 from '../components/Step9';
import NavbarComponent from '../components/NavbarComponent';
import FooterMain from '../components/FooterMain';

const Stepper = () => {
  const [active, setActive] = useState(1);

  const handleNextPrevClick = (a) => {
    setActive(a);
  };

  return (
    <>
      <NavbarComponent />
      <CDBStepper direction="horizontal" stepSize={60}>
        {/* Step9 added here */}
        <CDBStep
          id={1}
          icon="calendar-alt"
          name="Event Date"
          handleClick={() => handleNextPrevClick(1)}
          active={active}
          component={<Step9 handleNextPrevClick={handleNextPrevClick} />}
        />
        <CDBStep
          id={2}
          icon="map-marker-alt"
          name="Venue Details"
          handleClick={() => handleNextPrevClick(2)}
          active={active}
          component={<Step1 handleNextPrevClick={handleNextPrevClick} />}
        />
        <CDBStep
          id={3}
          icon="brush"
          name="Decorations"
          handleClick={() => handleNextPrevClick(3)}
          active={active}
          component={<Step2 handleNextPrevClick={handleNextPrevClick} />}
        />
        <CDBStep
          id={4}
          icon="camera"
          name="Photography"
          handleClick={() => handleNextPrevClick(4)}
          active={active}
          component={<Step3 handleNextPrevClick={handleNextPrevClick} />}
        />
        <CDBStep
          id={5}
          icon="birthday-cake"
          name="Cakes"
          handleClick={() => handleNextPrevClick(5)}
          active={active}
          component={<Step4 handleNextPrevClick={handleNextPrevClick} />}
        />
        <CDBStep
          id={6}
          icon="microphone"
          name="Entertainment"
          handleClick={() => handleNextPrevClick(6)}
          active={active}
          component={<Step5 handleNextPrevClick={handleNextPrevClick} />}
        />
        <CDBStep
          id={7}
          icon="gift"
          name="Return Gifts"
          handleClick={() => handleNextPrevClick(7)}
          active={active}
          component={<Step6 handleNextPrevClick={handleNextPrevClick} />}
        />
        <CDBStep
          id={8}
          icon="utensils"
          name="Food"
          handleClick={() => handleNextPrevClick(8)}
          active={active}
          component={<Step7 handleNextPrevClick={handleNextPrevClick} />}
        />
        <CDBStep
          id={9}
          icon="eye"
          name="Preview"
          handleClick={() => handleNextPrevClick(9)}
          active={active}
          component={<Step8 handleNextPrevClick={handleNextPrevClick} />}
        />
      </CDBStepper>
      <FooterMain />
    </>
  );
};

export default Stepper;
