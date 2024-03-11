import { Button, Card, ProgressBar } from 'react-bootstrap';

const steps = [
  'Venues',
  'Decorations',
  'Photography',
  'Cakes',
  'Entertainment',
  'Return Gifts',
  'Food',
];

const EventStepper = ({ activeStep, setActiveStep, onNextClick, onPrevClick }) => {
  const progress = ((activeStep + 1) / steps.length) * 100;

  return (
    <Card className="mt-4">
      <Card.Body>
        <ProgressBar now={progress} />
        <div className="mt-4">
          {steps.map((step, index) => (
            <Button
              key={index}
              variant={index === activeStep ? 'primary' : 'secondary'}
              onClick={() => setActiveStep(index)}
              className="mb-2"
              block
            >
              {step}
            </Button>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="primary" onClick={onPrevClick} disabled={activeStep === 0} block>
            Previous
          </Button>
          <Button variant="primary" onClick={onNextClick} className="mt-2" block>
            Next
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EventStepper;
