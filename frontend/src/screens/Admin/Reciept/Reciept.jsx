import React, { useEffect } from "react";
import CallIcon from "@mui/icons-material/Call";
import "./Reciept.css";
import { useLocation, useNavigate } from "react-router-dom";
const Reciept = ({ setopendashboard, setshowreciept }) => {
  const location = useLocation();
  const [isData, setisData] = React.useState(null);
  const navigation = useNavigate();

  console.log("data form", isData);
  useEffect(() => {
    setshowreciept(true);
    setopendashboard(false);
  }, []);

  const down = () => {
    const re = document.getElementById("receipt");
    var opt = {
      margin: 1,
      filename: "myfile.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "A4", orientation: "landscape" },
    };
    html2pdf().from(re).set(opt).save();
  };

  function printDiv() {
    var divContents = document.getElementById("receipt").innerHTML;

    a.document.write(divContents);

    a.print();
  }

  React.useEffect(() => {
    if (location.state) {
      setisData(location.state?.userdata);
    } else {
      navigation("/");
    }
  }, []);
  console.log(isData);
  return (
    <>
      <div className="receipt-main-div">
        <div id="receipt">
          <div className="absolute-div-call">
            <CallIcon />
          </div>
          <div className="receipt-header-div">
            <div className="email-header-div">
              <p className="emil-font-size">
                ईमेल: badebabakundalpur@gmail.com
              </p>
              <div className="serial-div">
                <p>क्र: 95801</p>
              </div>
            </div>
            <div className="center-div-header">
              <p className="shree-text">॥ श्री बड़े बाबा नम:॥</p>
              <p className="shree-second-text">
                श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि{" "}
              </p>
              <p className="shree-third-text"> सार्व, न्यास क्रं. 17 - ह</p>
              <p className="shree-four-text">
                ग्राम- कुण्डलपुर, तह-पटेरा, जिला दमोह (म.प्र.) 470772
              </p>
            </div>
            <div className="number-div-header">
              <p>7771835891 </p>
              <p>7771835891 </p>
              <div className="dal-datar">
                <p>दातार प्रति</p>
              </div>
            </div>
          </div>
          <div className="mainbghomediv-receipt">
            <div className="overlay-div-receipt">
              <div className="recipt-info-div">
                <h2>दान रसीद नं :</h2>
                <p>{isData?.RECEIPT_NO}</p>
              </div>
              <div className="recipt-info-div">
                <h2>दान दातार श्री :</h2>
                <p>श्री {isData?.NAME ? isData?.NAME : isData?.name}</p>
                {/* <p>श्री दिगम्बर जैन सर्वोदय तीर्थक्षेत्र अमरकंटक</p> */}
              </div>
              <div className="recipt-info-div">
                <h2>स्थान :</h2>
                <p>{isData?.ADDRESS ? isData?.ADDRESS : isData?.address}</p>
              </div>
              <div className="recipt-info-div">
                <h2>दान का मदः:</h2>
                {isData && isData?.TYPE
                  ? isData?.TYPE
                  : isData &&
                    isData.elecItemDetails.map((item) => {
                      return <p key={item.id}>{item.type}</p>;
                    })}{" "}
              </div>
              <div className="recipt-info-div">
                <h2>विवरण :</h2>
                <p>
                  {isData?.REMARK
                    ? isData?.REMARK
                    : isData &&
                      isData.elecItemDetails.map((item) => {
                        return `${item.remark} , `;
                      })}
                </p>
              </div>
              <div className="recipt-info-div">
                <h2>राशि अंको में :</h2>
                <p>
                  ₹
                  {isData?.AMOUNT
                    ? isData?.AMOUNT
                    : isData &&
                      isData.elecItemDetails.reduce(
                        (n, { amount }) => parseFloat(n) + parseFloat(amount),
                        0
                      )}
                </p>
              </div>
            </div>
          </div>
          <div>
            <table style={{ width: "100%" }} className="table-receipt-donation">
              <tr>
                <td rowspan="2" className="td-reciept">
                  STATE BANK OF INDIA DAMOH <br />
                  A/C No: 10708180064 IFSC: SBIN0001832
                </td>
                <td className="bank-color td-reciept">
                  बैंक से राशि भेजने हेतु
                </td>
                <td rowspan="2" className="td-reciept">
                  AXIS BANK DAMOH
                  <br />
                  A/C No: 910010000535130 IFSC: UTIB0000770
                </td>
              </tr>
              <tr>
                <td className="td-reciept">PAN No. AAHTS0546A</td>
              </tr>
            </table>
          </div>
          <div className="note-text-div">
            <p>
              नोट: 1 यहां अतिशयकारी" बड़े बाबा" की 1500 वर्ष प्राचीन प्रतिमा है
              तथा 63 जिनालय है व अंतिम अनुबुद्ध केवली श्रीधर स्वामी का निर्वाण
              स्थल है। 2. यात्रियों / श्रावकों से क्षेत्र में जिनागम अनुकूल आचरण
              / चरित्र अपेक्षित है। 3. उपरोक्त प्राप्त दान राशि दिग. जैन
              तेरापंथी आम्नाओं अनुसार क्षेत्र के उद्देश्य की पूर्ति हेतु व्यय की
              जावेगी 14 क्षेत्र के अंतर्गत संचालित उदासीन आश्रम, औषधालय आदि अन्य
              चल/अचल सम्पतियाँ एवं प्राप्त दानराशि पर पूर्ण नियंत्रण व स्वामित्व
              केवल श्री दिग. जैन सिद्धक्षेत्र कुण्डलगिरि, कुण्डलपुर क्षेत्र
              ट्रस्ट का हैव रहेगा 15. क्षेत्र को दिये गये विशेष दान ट्रस्ट के
              कॉरपस फण्ड का हिस्सा रहेंगे।
            </p>
          </div>
          <div className="iss-test-div">
            <p>
              इस क्षेत्र को दिया गया दान आदेश क्र. FNo.
              CIT-1/JBP/TECH/80G/09/2007-08 के अनुसार धारा 80G (5) (VI) के
              अंतर्गत आयकर मुक्त है।
            </p>
          </div>
        </div>
        <div className="download-print-div">
          <button onClick={() => down()} className="down-btn">
            Download Receipt
          </button>
          <button onClick={() => printDiv()} className="down-btn">
            Print Receipt
          </button>
        </div>
      </div>
    </>
  );
};

export default Reciept;
