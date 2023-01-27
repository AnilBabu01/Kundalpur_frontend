import React, { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './cashrecipt.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Reciept.css';
import { Converter, hiIN } from 'any-number-to-words';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Moment from 'moment-js';
import moment from 'moment';
const converter = new Converter(hiIN);
const CashRecipt = ({ setopendashboard, setshowreciept }) => {
  const location = useLocation();
  const componentRef = useRef();
  const [isData, setisData] = React.useState(null);
  const navigation = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  console.log('data form', isData, user);
  useEffect(() => {
    setshowreciept(true);
    setopendashboard(false);
    if (location.state) {
      setisData(location.state?.userdata);
    } else {
      navigation('/');
    }
  }, []);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  function printDiv() {
    var divContents = document.getElementById('receipt').innerHTML;

    a.document.write(divContents);

    a.print();
  }

  function down() {
    console.log('cliii');
    const input = document.getElementById('receipt');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4', false);
      pdf.addImage(imgData, 'PNG', 0, 0, 600, 0, undefined, false);
      pdf.save('download.pdf');
    });
  }

  return (
    <>
      <div>
        <div className="main-certificate" id="receipt" ref={componentRef}>
          <div className="topinfo-flex">
            <p>E-mail:badebaba.kundalpur@gmail.com</p>
            <p>॥ श्री बड़े बाबा नम:॥</p>
            <p>Web:www.shreebadebaba.com</p>
          </div>
          <div className="main-head">
            <div className="main-head-container">
              <span className="head-sn">
                <p>रसीद क्र:</p>
                <h4>0001</h4>
              </span>
              <span className="head-name">
                <h2>श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि</h2>
                <p>(सार्व, न्यास क्रं. 17 - ह)</p>
                <h4>ग्राम- कुण्डलपुर, तह-पटेरा, जिला दमोह 470772 (म.प्र.)</h4>
              </span>
              <span className="head-contact">
                <p>7771835891</p>
                <p>7771834880</p>
                <p>दातार प्रति</p>
              </span>
            </div>
          </div>
          <div className="reciptimg">
            <div className="reciptbody">
              <div className="leftdata">
                <span className="leftitems">
                  <h2>दान रसीद नं :</h2>
                  <p>
                    {isData?.RECEIPT_NO
                      ? isData?.RECEIPT_NO
                      : isData?.ReceiptNo}
                  </p>
                </span>
                <span className="leftitems">
                  <h2>दान दातार :</h2>
                  <p>
                    {isData && isData?.gender}{' '}
                    {isData?.NAME ? isData?.NAME : isData?.name}
                  </p>
                </span>
                <span className="leftitems">
                  <h2>स्थान :</h2>
                  <p>{isData?.ADDRESS ? isData?.ADDRESS : isData?.address}</p>
                </span>
                <span className="leftitems">
                  <h2>दान का मद :</h2>
                  {isData && isData?.TYPE
                    ? isData?.TYPE
                    : isData &&
                      isData.elecItemDetails && (
                        <p>{isData.elecItemDetails[0].type}</p>
                      )}
                </span>

                {isData && isData.modeOfDonation === '4' ? (
                  <>
                    {isData &&
                      isData.elecItemDetails &&
                      isData.modeOfDonation === '4' &&
                      isData.elecItemDetails[0].quantity && (
                        <>
                          <span className="leftitems margin_bittton">
                            <h2>संख्या:</h2>
                            {isData && isData?.TYPE
                              ? isData?.TYPE
                              : isData &&
                                isData.elecItemDetails &&
                                isData.elecItemDetails[0].quantity}
                          </span>
                        </>
                      )}
                  </>
                ) : (
                  <>
                    <span className="leftitems margin_bittton">
                      <h2>दान राशि :</h2>
                      <p>
                        ₹
                        {isData && isData?.AMOUNT
                          ? isData?.AMOUNT
                          : isData &&
                            isData.elecItemDetails.reduce(
                              (n, { amount }) =>
                                parseFloat(n) + parseFloat(amount),
                              0,
                            )}
                        /-
                      </p>
                    </span>
                  </>
                )}
              </div>
              <div className="rightdata">
                <span className="rightitems">
                  <h2>दिनांक :</h2>
                  <p>
                    {isData && isData?.elecItemDetails ? (
                      Moment(isData?.DATE_OF_CHEQUE).format('DD-MM-YYYY')
                    ) : (
                      <>
                        {isData?.DATE_OF_CHEQUE
                          ? Moment(isData?.DATE_OF_CHEQUE).format('DD-MM-YYYY')
                          : Moment(isData?.donation_date).format('DD-MM-YYYY')}
                      </>
                    )}
                  </p>
                </span>
                <span className="rightitems">
                  <p></p>
                </span>
                {isData &&
                  isData.elecItemDetails &&
                  isData.elecItemDetails[0].ChequeNo && (
                    <>
                      <span className="rightitems">
                        <h2>माध्यम :</h2>
                        {isData && isData?.TYPE
                          ? isData?.TYPE
                          : isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].BankName}
                        {isData && isData?.TYPE
                          ? isData?.TYPE
                          : isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].ChequeNo}
                      </span>
                    </>
                  )}
                {isData &&
                  isData.elecItemDetails &&
                  isData.modeOfDonation === '1' &&
                  isData.elecItemDetails[0].BankName && (
                    <>
                      <span className="rightitems">
                        <h2>माध्यम:</h2>
                        {isData && isData?.TYPE
                          ? isData?.TYPE
                          : isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].BankName}
                      </span>
                    </>
                  )}

                <span className="rightitems">
                  <h2>मोबाइल नं :</h2>
                  <p>{isData?.phoneNo ? isData?.phoneNo : user?.mobileNo}</p>
                </span>
                {isData &&
                  isData.elecItemDetails &&
                  isData.modeOfDonation === '4' &&
                  isData.elecItemDetails[0].itemType && (
                    <>
                      <span className="rightitems">
                        <h2>सामग्री का नाम:</h2>
                        {isData && isData?.TYPE
                          ? isData?.TYPE
                          : isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].itemType}
                      </span>
                    </>
                  )}

                {isData &&
                  isData.elecItemDetails &&
                  isData.modeOfDonation === '4' &&
                  isData.elecItemDetails[0].amount && (
                    <>
                      <span className="rightitems">
                        <h2>अंदाजन कीमत:</h2>
                        {isData && isData?.TYPE
                          ? isData?.TYPE
                          : isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].amount}
                      </span>
                    </>
                  )}

                <span className="rightitems">
                  <h2>विवरण :</h2>
                  <p>
                    {/* {isData && isData?.REMARK
                      ? isData?.REMARK
                      : isData && isData.elecItemDetails[0].remark} */}
                    बोली राशि
                    {isData?.DATE_OF_CHEQUE
                      ? Moment(isData?.DATE_OF_CHEQUE).format('DD-MM-YYYY')
                      : Moment(isData?.donation_date).format('DD-MM-YYYY')}
                  </p>
                </span>
              </div>
            </div>

            <span className="rightitems2 ">
              <h2>दान राशि शब्दों में:</h2>
              <p>
                <b>
                  {' '}
                  {converter.toWords(
                    isData?.AMOUNT
                      ? isData?.AMOUNT
                      : Number(
                          isData &&
                            isData.elecItemDetails.reduce(
                              (n, { amount }) =>
                                parseFloat(n) + parseFloat(amount),
                              0,
                            ),
                        ),
                    {
                      comma: true,
                    },
                  )}
                </b>{' '}
                रूपये नगद दान स्वरूप सधन्यवाद प्राप्त हुये।
              </p>
            </span>

            <div className="bankjankari">
              <h3>बैंक द्वारा राशि भेजने संबंधी जानकारी</h3>
            </div>
            <div className="bankdetail-container">
              <div className="bankdetails">
                <div className="banks1">
                  <h5>AXIS BANK, DAMOH</h5>
                  <h4>9100100000535130</h4>
                  <p>UTIB0000770</p>
                </div>
                <div className="banks2">
                  <h5>HDFC BANK, DAMOH</h5>
                  <h4>50100160424129</h4>
                  <p>HDFC0000914</p>
                </div>
                <div className="banks3">
                  <h5>SBI BANK, ADB-DAMOH</h5>
                  <h4>10708180064</h4>
                  <p>SBIN0001832</p>
                </div>
              </div>
            </div>
          </div>

          <div className="note">
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
          <div className="reciept-footer">
            <span>
              इस क्षेत्र को दिया गया दान धारा 80G (5) (VI) के अंतर्गत आयकर मुक्त
              है।
            </span>
            <p>PAN NO- AAHTS0546A</p>
          </div>
          <div className="signature-point">
            <p>हस्ताक्षर दानदातार</p>
            <p>हस्ताक्षर प्राप्तकर्ता</p>
          </div>
        </div>
      </div>
      <div className="button_div_print_download">
        <button onClick={() => down()}>Download</button>
        <button onClick={handlePrint}>Print</button>
      </div>
    </>
  );
};

export default CashRecipt;
