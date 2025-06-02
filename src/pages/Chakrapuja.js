const Chakrapuja = () => {
  return (
    <div>
      <div className="about-detail text-center">
        <h3>चक्रपूजा</h3>
        <p></p>
      </div>
      <div
        style={{ textAlign: "center", width: "fit-content", margin: "auto" }}
      >
        <ol>
          steps
          <li>त्रिशूळ</li>
          <li> त्रिकोण</li>
          <li>पान</li>
          <li>फूल (chokhaliya)</li>
          <li>फळ (केरी)</li>
          <li>दरवाजा </li>
        </ol>
        <ol>
          4 दरवाजा
          <li>गणपती</li>
          <li>दरिया</li>
          <li>राक्षस</li>
          <li>हनुमान</li>
          {/* <li>उत्तर - गणपती</li>
          <li> दक्षिण - दरिया</li>
          <li>पूर्व - राक्षस</li>
          <li>पश्चिम - हनुमान</li> */}
        </ol>
      </div>
      <div style={{ textAlign: "center" }}>
        <img
          src="./chakrapuja.png"
          style={{ width: "800px", height: "600px" }}
          alt="chakrapuja"
        />
      </div>
    </div>
  );
};

export default Chakrapuja;
