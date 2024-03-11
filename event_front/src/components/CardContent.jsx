const CardContent = ({ title, label, maxWidth, children }) => {
  return (
    <div style={{ width: '100%', background: '#f9f9f9', padding: '30px 10px', height: '100%' }}>
      <div style={{ margin: '0 auto', maxWidth: maxWidth || '500px', borderRadius: '10px', background: '#f5f5f5', boxShadow: '0px 4px 10px 0 rgba(0, 0, 0, 0.05)' }}>
        <div style={{ textAlign: 'center', padding: '20px 0 10px 0', color: '#939393', fontSize: '30px', fontWeight: 'bold' }}>
          {title}
        </div>
        <div style={{ marginTop: '20px' }}>
          {children}
        </div>
        {label && (
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }}>
            <label>{label}</label>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardContent;
