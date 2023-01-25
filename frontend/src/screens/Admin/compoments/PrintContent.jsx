import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { Converter, hiIN } from 'any-number-to-words';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Moment from 'moment-js';
import './PrintContent.css';
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
    }, 500);
  }, []);

  return (
    <>
      <div className="super_main_divsss" ref={componentRef}>
        {!isData?.isActive && (
          <>
            <div className="cancel_text">
              <p>Cancelled </p>
            </div>
            <div className="cancel_text1">
              <p>Cancelled </p>
            </div>
          </>
        )}

        <div className="main_print_div">
          <div>
            <p className="common_margin_p">
              <span className="gray-text">दान रसीद नं -</span>
              {isData?.RECEIPT_NO ? isData?.RECEIPT_NO : isData?.ReceiptNo}
            </p>
            <p className="common_margin_p">
              <span className="gray-text">दान दातार श्री -</span>
              {isData?.NAME ? isData?.NAME : isData?.name}
            </p>
            <p className="common_margin_p">
              <span className="gray-text">स्थान -</span>
              {isData?.ADDRESS ? isData?.ADDRESS : isData?.address}
            </p>
            <p className="common_margin_p">
              <span className="gray-text">दान का मद -</span>
              {isData && isData?.TYPE
                ? isData?.TYPE
                : isData && isData.elecItemDetails[0].type}
            </p>

            {isData &&
            isData.elecItemDetails &&
            isData.elecItemDetails[0].itemType ? (
              <></>
            ) : (
              <>
                <p className="common_margin_p">
                  <span className="gray-text">दान राशि अंको में -</span>
                  {isData && isData?.AMOUNT
                    ? isData?.AMOUNT
                    : isData &&
                      isData.elecItemDetails.reduce(
                        (n, { amount }) => parseFloat(n) + parseFloat(amount),
                        0,
                      )}
                  .00/-
                </p>

                <p className="common_margin_p">
                  <span className="gray-text">दान राशि शब्दों में -</span>
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
                              (n, { amount }) =>
                                parseFloat(n) + parseFloat(amount),
                              0,
                            )
                          : 0,
                        {
                          comma: true,
                        },
                      )}
                </p>
              </>
            )}

            {isData &&
              isData.elecItemDetails &&
              isData.elecItemDetails[0].itemType && (
                <p className="common_margin_p">
                  <span className="gray-text">संख्या -</span>
                  {isData &&
                    isData.elecItemDetails &&
                    isData.elecItemDetails[0].quantity}
                </p>
              )}
          </div>
          <div>
            <p className="common_margin_p">
              <span className="gray-text">दिनांक -</span>

              {isData?.DATE_OF_CHEQUE
                ? Moment(isData?.DATE_OF_CHEQUE).format('DD-MM-YYYY')
                : Moment(isData?.donation_date).format('DD-MM-YYYY')}
            </p>

            <p className="common_margin_p">
              <span className="gray-text">मोबाइल नं -</span>
              {isData && isData?.MobileNo
                ? isData?.MobileNo
                : isData && isData.phoneNo}
            </p>

            {isData &&
              isData.elecItemDetails &&
              isData.elecItemDetails[0].ChequeNo && (
                <>
                  <p className="common_margin_p">
                    <span className="gray-text">माध्यम -</span>
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
                  </p>
                </>
              )}

            {isData &&
              isData.modeOfDonation === '1' &&
              isData.elecItemDetails &&
              isData.elecItemDetails[0].BankName && (
                <>
                  <p className="common_margin_p">
                    <span className="gray-text">माध्यम -</span>
                    {isData && isData?.TYPE
                      ? isData?.TYPE
                      : isData &&
                        isData.elecItemDetails &&
                        isData.elecItemDetails[0].BankName}
                  </p>
                </>
              )}
            <p className="common_margin_p">
              <span className="gray-text">विवरण -</span>
              {isData && isData?.REMARK
                ? isData?.REMARK
                : isData && isData.elecItemDetails[0].remark}
              बोली राशि
              {isData?.DATE_OF_CHEQUE
                ? Moment(isData?.DATE_OF_CHEQUE).format('DD-MM-YYYY')
                : Moment(isData?.donation_date).format('DD-MM-YYYY')}
            </p>

            {isData &&
              isData.elecItemDetails &&
              isData.elecItemDetails[0].itemType && (
                <p className="common_margin_p">
                  <span className="gray-text">सामग्री का नाम -</span>
                  {isData &&
                    isData.elecItemDetails &&
                    isData.elecItemDetails[0].itemType}
                </p>
              )}
            {isData &&
              isData.elecItemDetails &&
              isData.elecItemDetails[0].itemType && (
                <p className="common_margin_p">
                  <span className="gray-text">अंदाजन कीमत :-</span>
                  {isData &&
                    isData.elecItemDetails &&
                    isData.elecItemDetails[0].amount}
                </p>
              )}
          </div>
        </div>

        <div className="gray-text-div">
          <p>(SHASHANK ASATI)</p>
        </div>

        <div className="main_print_div">
          <div>
            <p className="common_margin_p">
              <span className="gray-text">दान रसीद नं -</span>
              {isData?.RECEIPT_NO ? isData?.RECEIPT_NO : isData?.ReceiptNo}
            </p>
            <p className="common_margin_p">
              <span className="gray-text">दान दातार श्री -</span>
              {isData?.NAME ? isData?.NAME : isData?.name}
            </p>
            <p className="common_margin_p">
              <span className="gray-text">स्थान -</span>
              {isData?.ADDRESS ? isData?.ADDRESS : isData?.address}
            </p>
            <p className="common_margin_p">
              <span className="gray-text">दान का मद -</span>
              {isData && isData?.TYPE
                ? isData?.TYPE
                : isData && isData.elecItemDetails[0].type}
            </p>

            {isData &&
            isData.elecItemDetails &&
            isData.elecItemDetails[0].itemType ? (
              <></>
            ) : (
              <>
                <p className="common_margin_p">
                  <span className="gray-text">दान राशि अंको में -</span>
                  {isData && isData?.AMOUNT
                    ? isData?.AMOUNT
                    : isData &&
                      isData.elecItemDetails.reduce(
                        (n, { amount }) => parseFloat(n) + parseFloat(amount),
                        0,
                      )}
                  .00/-
                </p>

                <p className="common_margin_p">
                  <span className="gray-text">दान राशि शब्दों में -</span>
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
                              (n, { amount }) =>
                                parseFloat(n) + parseFloat(amount),
                              0,
                            )
                          : 0,
                        {
                          comma: true,
                        },
                      )}
                </p>
              </>
            )}

            {isData &&
              isData.elecItemDetails &&
              isData.elecItemDetails[0].itemType && (
                <p className="common_margin_p">
                  <span className="gray-text">संख्या -</span>
                  {isData &&
                    isData.elecItemDetails &&
                    isData.elecItemDetails[0].quantity}
                </p>
              )}

            {isData &&
              isData.elecItemDetails &&
              isData.elecItemDetails[0].itemType && (
                <p className="common_margin_p">
                  <span className="gray-text">सामग्री का नाम -</span>
                  {isData &&
                    isData.elecItemDetails &&
                    isData.elecItemDetails[0].itemType}
                </p>
              )}
          </div>
          <div>
            <p className="common_margin_p">
              <span className="gray-text">दिनांक -</span>

              {isData?.DATE_OF_CHEQUE
                ? Moment(isData?.DATE_OF_CHEQUE).format('DD-MM-YYYY')
                : Moment(isData?.donation_date).format('DD-MM-YYYY')}
            </p>

            <p className="common_margin_p">
              <span className="gray-text">मोबाइल नं -</span>
              {isData && isData?.MobileNo
                ? isData?.MobileNo
                : isData && isData.phoneNo}
            </p>

            {isData &&
              isData.elecItemDetails &&
              isData.elecItemDetails[0].ChequeNo && (
                <>
                  <p className="common_margin_p">
                    <span className="gray-text">माध्यम -</span>
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
                  </p>
                </>
              )}

            {isData &&
              isData.modeOfDonation === '1' &&
              isData.elecItemDetails &&
              isData.elecItemDetails[0].BankName && (
                <>
                  <p className="common_margin_p">
                    <span className="gray-text">माध्यम -</span>
                    {isData && isData?.TYPE
                      ? isData?.TYPE
                      : isData &&
                        isData.elecItemDetails &&
                        isData.elecItemDetails[0].BankName}
                  </p>
                </>
              )}
            <p className="common_margin_p">
              <span className="gray-text">विवरण -</span>
              {isData && isData?.REMARK
                ? isData?.REMARK
                : isData && isData.elecItemDetails[0].remark}
              बोली राशि
              {isData?.DATE_OF_CHEQUE
                ? Moment(isData?.DATE_OF_CHEQUE).format('DD-MM-YYYY')
                : Moment(isData?.donation_date).format('DD-MM-YYYY')}
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
