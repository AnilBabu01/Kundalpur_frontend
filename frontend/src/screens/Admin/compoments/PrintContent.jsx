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
    }, 500);
  }, []);

  return (
    <>
      <div className="super_main_divsss" ref={componentRef}>
        <div className="main_print_div">
          <div className="gray_color_div_print_content">
            <p className="common_margin_p">दान रसीद नं :</p>
            <p className="common_margin_p">दान दातार श्री :</p>
            <p className="common_margin_p">स्थान :</p>
            <p className="common_margin_p">दान का मद</p>

            <p className="common_margin_p">मोबाइल नं:</p>
            {isData &&
            isData.elecItemDetails &&
            isData.elecItemDetails[0].itemType ? (
              <>
                <p className="common_margin_p">
                  {isData &&
                    isData.elecItemDetails &&
                    isData.elecItemDetails[0].quantity && <>संख्या : :</>}
                </p>
                <p className="common_margin_p">
                  {isData &&
                    isData.elecItemDetails &&
                    isData.elecItemDetails[0].itemType && (
                      <> सामग्री का नाम :</>
                    )}
                </p>
                <p className="common_margin_p">
                  {isData &&
                    isData.elecItemDetails &&
                    isData.elecItemDetails[0].itemType && <>अंदाजन कीमत ::</>}
                </p>
              </>
            ) : (
              <>
                <p className="common_margin_p">
                  {isData &&
                    isData.elecItemDetails &&
                    isData.elecItemDetails[0].BankName && <>माध्यम :</>}
                </p>
                <p className="common_margin_p">दान राशि अंको में:</p>
                <p className="common_margin_p">दान राशि शब्दों में:</p>
              </>
            )}

            <p className="common_margin_p">विवरण :</p>
          </div>
          <div>
            <p className="common_margin_p">
              {isData?.RECEIPT_NO ? isData?.RECEIPT_NO : isData?.ReceiptNo}
            </p>
            <p className="common_margin_p">
              {isData?.NAME ? isData?.NAME : isData?.name}
            </p>
            <p className="common_margin_p">
              {isData?.ADDRESS ? isData?.ADDRESS : isData?.address}
            </p>
            <p className="common_margin_p">
              {isData && isData?.TYPE
                ? isData?.TYPE
                : isData && isData.elecItemDetails[0].type}
            </p>

            <p className="common_margin_p">
              {isData && isData?.MobileNo
                ? isData?.MobileNo
                : isData && isData.phoneNo}
            </p>

            {isData &&
            isData.elecItemDetails &&
            isData.elecItemDetails[0].itemType ? (
              <>
                <p className="common_margin_p">
                  {isData &&
                    isData.elecItemDetails &&
                    isData.elecItemDetails[0].BankName && <>माध्यम :</>}
                </p>
              </>
            ) : (
              <>
                <p className="common_margin_p">
                  {isData &&
                    isData.elecItemDetails &&
                    isData.elecItemDetails[0].ChequeNo && (
                      <>
                        {isData && isData?.TYPE
                          ? isData?.TYPE
                          : isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].BankName}
                        {isData && isData?.TYPE
                          ? isData?.TYPE
                          : isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].ChequeNo}{' '}
                      </>
                    )}
                </p>
                <p className="common_margin_p">
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

            <p className="common_margin_p">
              {isData &&
                isData.modeOfDonation === '1' &&
                isData.elecItemDetails &&
                isData.elecItemDetails[0].BankName && (
                  <>
                    {isData && isData?.TYPE
                      ? isData?.TYPE
                      : isData &&
                        isData.elecItemDetails &&
                        isData.elecItemDetails[0].BankName}
                  </>
                )}
            </p>
            {isData &&
              isData.elecItemDetails &&
              isData.elecItemDetails[0].itemType && (
                <p className="common_margin_p">
                  {isData &&
                    isData.elecItemDetails &&
                    isData.elecItemDetails[0].quantity}
                </p>
              )}

            {isData &&
              isData.elecItemDetails &&
              isData.elecItemDetails[0].itemType && (
                <p className="common_margin_p">
                  {isData &&
                    isData.elecItemDetails &&
                    isData.elecItemDetails[0].itemType}
                </p>
              )}
            <p className="common_margin_p">
              {isData && isData?.REMARK
                ? isData?.REMARK
                : isData && isData.elecItemDetails[0].remark}
              बोली राशि
              {isData?.DATE_OF_CHEQUE
                ? Moment(isData?.DATE_OF_CHEQUE).format('DD-MM-YYYY')
                : Moment(isData?.donation_date).format('DD-MM-YYYY')}
            </p>
          </div>
          <div>
            <p className="common_margin_p">
              <span className="gray-text">दिनांक:</span>

              {isData?.DATE_OF_CHEQUE
                ? Moment(isData?.DATE_OF_CHEQUE).format('DD-MM-YYYY')
                : Moment(isData?.donation_date).format('DD-MM-YYYY')}
            </p>
          </div>
        </div>

        <div className="gray-text-div">
          <p>(SHASHANK ASATI)</p>
        </div>
        <div className="main_print_div">
          <div className="gray_color_div_print_content">
            <p className="common_margin_p">दान रसीद नं :</p>
            <p className="common_margin_p">दान दातार श्री :</p>
            <p className="common_margin_p">स्थान :</p>
            <p className="common_margin_p">दान का मद</p>

            <p className="common_margin_p">मोबाइल नं:</p>
            <p className="common_margin_p">दान राशि अंको में:</p>
            <p className="common_margin_p">दान राशि शब्दों में:</p>
            <p className="common_margin_p">विवरण :</p>
          </div>
          <div>
            <p className="common_margin_p">
              {isData?.RECEIPT_NO ? isData?.RECEIPT_NO : isData?.ReceiptNo}
            </p>
            <p className="common_margin_p">
              {isData?.NAME ? isData?.NAME : isData?.name}
            </p>
            <p className="common_margin_p">
              {isData?.ADDRESS ? isData?.ADDRESS : isData?.address}
            </p>
            <p className="common_margin_p">
              {isData && isData?.TYPE
                ? isData?.TYPE
                : isData && isData.elecItemDetails[0].type}
            </p>

            <p className="common_margin_p">
              {isData && isData?.MobileNo
                ? isData?.MobileNo
                : isData && isData.phoneNo}
            </p>
            <p className="common_margin_p">
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
            <p className="common_margin_p">
              {isData && isData?.REMARK
                ? isData?.REMARK
                : isData && isData.elecItemDetails[0].remark}
              बोली राशि
              {isData?.DATE_OF_CHEQUE
                ? Moment(isData?.DATE_OF_CHEQUE).format('DD-MM-YYYY')
                : Moment(isData?.donation_date).format('DD-MM-YYYY')}
            </p>
          </div>
          <div>
            <p className="common_margin_p">
              <span className="gray-text">दिनांक:</span>

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
