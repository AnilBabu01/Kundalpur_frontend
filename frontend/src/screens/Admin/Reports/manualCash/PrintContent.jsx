import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { Converter, hiIN } from 'any-number-to-words';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Moment from 'moment-js';
const converter = new Converter(hiIN);
function PrintContent({ setopendashboard, setshowreciept }) {
  const location = useLocation();
  const componentRef = useRef();
  const [isData, setisData] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  console.log(isData);
  useEffect(() => {
    setshowreciept(true);
    setopendashboard(false);

    if (location.state) {
      setisData(location.state?.data);
    } else {
      navigation('/');
    }
    setTimeout(() => {
      handlePrint();
    }, 1000);
  }, []);

  return (
    <>
      <div className="super_main_divsss" ref={componentRef}>
        <div className="main_print_div">
          <div>
            <p>दान रसीद नं :</p>
            <p>दान दातार श्री :</p>
            <p>स्थान :</p>
            <p>दान का मद</p>
            <p>विवरण :</p>
            <p>दान राशि अंको में:</p>
            <p>दान राशि शब्दों में:</p>
          </div>
          <div className="gray_color_div_print_content">
            <p>{isData?.RECEIPT_NO ? isData?.RECEIPT_NO : isData?.ReceiptNo}</p>
            <p>{isData?.NAME ? isData?.NAME : isData?.name}</p>
            <p>{isData?.ADDRESS ? isData?.ADDRESS : isData?.address}</p>
            <p>
              {isData && isData?.TYPE
                ? isData?.TYPE
                : isData && isData.elecItemDetails[0].type}
            </p>
            <p>
              {isData && isData?.AMOUNT
                ? isData?.AMOUNT
                : isData &&
                  isData.elecItemDetails.reduce(
                    (n, { amount }) => parseFloat(n) + parseFloat(amount),
                    0,
                  )}
              .00/-
            </p>
            <p>
              {isData && isData?.AMOUNT
                ? converter.toWords(isData?.AMOUNT ? isData?.AMOUNT : 0, {
                    comma: true,
                  })
                : isData &&
                  converter.toWords(
                    isData.elecItemDetails.reduce(
                      (n, { amount }) => parseFloat(n) + parseFloat(amount),
                      0,
                    )
                      ? isData.elecItemDetails.reduce(
                          (n, { amount }) => parseFloat(n) + parseFloat(amount),
                          0,
                        )
                      : 0,
                    {
                      comma: true,
                    },
                  )}
            </p>
          </div>
          <div>
            <p>
              दिनांक:
              <span className="gray-text">
                {isData?.DATE_OF_CHEQUE
                  ? Moment(isData?.DATE_OF_CHEQUE).format('DD-MM-YYYY')
                  : Moment(isData?.donation_date).format('DD-MM-YYYY')}
              </span>
            </p>
          </div>
        </div>
        <div className="gray-text-div">
          <p>(SHASHANK ASATI)</p>
        </div>

        <div className="main_print_div">
          <div>
            <p>दान रसीद नं :</p>
            <p>दान दातार श्री :</p>
            <p>स्थान :</p>
            <p>दान का मद</p>
            <p>विवरण :</p>
            <p>दान राशि अंको में:</p>
            <p>दान राशि शब्दों में:</p>
          </div>
          <div className="gray_color_div_print_content">
            <p>{isData?.RECEIPT_NO ? isData?.RECEIPT_NO : isData?.ReceiptNo}</p>
            <p>{isData?.NAME ? isData?.NAME : isData?.name}</p>
            <p>{isData?.ADDRESS ? isData?.ADDRESS : isData?.address}</p>
            <p>
              {isData && isData?.TYPE
                ? isData?.TYPE
                : isData && isData.elecItemDetails[0].type}
            </p>
            <p>
              {isData && isData?.AMOUNT
                ? isData?.AMOUNT
                : isData &&
                  isData.elecItemDetails.reduce(
                    (n, { amount }) => parseFloat(n) + parseFloat(amount),
                    0,
                  )}
              .00/-
            </p>
            <p>
              {isData && isData?.AMOUNT
                ? converter.toWords(isData?.AMOUNT ? isData?.AMOUNT : 0, {
                    comma: true,
                  })
                : isData &&
                  converter.toWords(
                    isData.elecItemDetails.reduce(
                      (n, { amount }) => parseFloat(n) + parseFloat(amount),
                      0,
                    )
                      ? isData.elecItemDetails.reduce(
                          (n, { amount }) => parseFloat(n) + parseFloat(amount),
                          0,
                        )
                      : 0,
                    {
                      comma: true,
                    },
                  )}
            </p>
          </div>
          <div>
            <p>
              दिनांक:
              <span className="gray-text">
                {isData?.DATE_OF_CHEQUE
                  ? Moment(isData?.DATE_OF_CHEQUE).format('DD-MM-YYYY')
                  : Moment(isData?.donation_date).format('DD-MM-YYYY')}
              </span>
            </p>
          </div>
        </div>
        <div className="gray-text-div">
          <p>(SHASHANK ASATI)</p>
        </div>
      </div>
    </>
  );
}

export default PrintContent;
