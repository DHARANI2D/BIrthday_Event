// FeatureCard.js
const FeatureCard = ({ imgSrc, title, description }) => {
  return (
    <div className="col-md-3">
      <div className="card mb-3">
        <img src={imgSrc} alt="Card" className="img-fluid" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
