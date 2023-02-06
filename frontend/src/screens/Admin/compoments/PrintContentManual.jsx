import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { Converter, hiIN } from 'any-number-to-words';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Moment from 'moment-js';
import moment from 'moment';
import './PrintContent.css';

const converter = new Converter(hiIN);
function PrintContent({ setopendashboard, setshowreciept }) {
  const location = useLocation();
  const componentRef = useRef();
  const adminName = sessionStorage.getItem('adminName');

  const empName = sessionStorage.getItem('empName');

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
    }, 100);
  }, []);

  return (
    <>
      <div className="super_main_divsss" ref={componentRef}>
        <div>
          <div>
            {isData?.active === '0' && (
              <>
                <div className="cancel_text1">
                  <p>Cancelled </p>
                </div>
              </>
            )}

            {isData?.isActive === false && (
              <>
                <div className="cancel_text1">
                  <p>Cancelled </p>
                </div>
              </>
            )}

            <div className="main_print_div">
              <div>
                <p className="common_margin_p">
                  <span className="gray-text">
                    दान रसीद नं -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  </span>
                  {isData?.RECEIPT_NO ? isData?.RECEIPT_NO : isData?.ReceiptNo}
                </p>
                <p className="common_margin_p">
                  <span className="gray-text">
                    दान दातार - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  </span>
                  {isData?.gender}&nbsp;
                  {isData?.NAME ? isData?.NAME : isData?.name}
                </p>
                <p className="common_margin_p">
                  <span className="gray-text">
                    स्थान - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp;
                  </span>
                  {isData?.ADDRESS ? isData?.ADDRESS : isData?.address}
                </p>
                {isData && isData.CHEQUE_NO && (
                  <>
                    <p className="common_margin_p">
                      <span className="gray-text">
                        दान का मद - &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                      {isData && isData?.TYPE}
                    </p>
                  </>
                )}

                {isData && isData.CHEQUE_NO === '' && (
                  <>
                    <p className="common_margin_p">
                      <span className="gray-text">
                        दान का मद - &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                      {isData && isData?.TYPE}
                    </p>
                  </>
                )}
                {isData &&
                isData.manualItemDetails &&
                isData.manualItemDetails[0].itemType ? (
                  <></>
                ) : (
                  <>{isData && isData.modeOfDonation && <></>}</>
                )}

                {isData &&
                  isData.manualItemDetails &&
                  isData.manualItemDetails[0].itemType && (
                    <>
                      <p className="common_margin_p">
                        <span className="gray-text">
                          मद -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </span>
                        {isData &&
                          isData.manualItemDetails &&
                          isData.manualItemDetails[0].type}
                      </p>

                      <p className="common_margin_p">
                        <span className="gray-text">
                          संख्या-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                        </span>
                        {isData &&
                          isData.manualItemDetails &&
                          isData.manualItemDetails[0].quantity}
                      </p>
                      <p className="common_margin_p">
                        <span className="gray-text">
                          वजन -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; &nbsp;&nbsp; &nbsp;
                        </span>
                        {isData && isData.manualItemDetails[0].size} &nbsp;
                        {isData && isData.manualItemDetails[0].unit}
                      </p>
                    </>
                  )}
              </div>
              <div>
                <p className="common_margin_p">
                  <span className="gray-text">
                    दिनांक - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  </span>
                  {isData && isData?.manualItemDetails ? (
                    <>
                      {Moment(isData?.donation_date).format('DD-MM-YYYY')}:
                      {moment(isData?.donation_time, 'HH:mm:ss').format(
                        'hh:mm A',
                      )}
                    </>
                  ) : (
                    <>{Moment(isData?.DATE_OF_CHEQUE).format('DD-MM-YYYY')}-</>
                  )}
                </p>
                <p className="common_margin_p">
                  <span className="gray-text">
                    मोबाइल नं - &nbsp; &nbsp; &nbsp;
                  </span>
                  {isData && isData?.MobileNo
                    ? isData?.MobileNo
                    : isData && isData.phoneNo}{' '}
                  &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                  &nbsp;
                </p>
                {isData && isData.modeOfDonation === '2' && (
                  <>
                    <p className="common_margin_p">
                      <span className="gray-text">
                        विवरण - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                      </span>
                      {isData && isData?.REMARK
                        ? isData?.REMARK
                        : isData && isData.manualItemDetails[0].remark}
                    </p>
                  </>
                )}
                {isData && isData.modeOfDonation === 2 && (
                  <>
                    <p className="common_margin_p">
                      <span className="gray-text">
                        विवरण - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                      </span>
                      {isData && isData?.REMARK
                        ? isData?.REMARK
                        : isData && isData.manualItemDetails[0].remark}
                    </p>
                  </>
                )}
                {isData && isData.CHEQUE_NO && (
                  <>
                    <p className="common_margin_p">
                      <span className="gray-text">माध्यम -</span>
                      {isData?.CHEQUE_NO}
                      {isData?.NAME_OF_BANK}
                    </p>
                  </>
                )}
                {isData && isData.CHEQUE_NO && (
                  <>
                    <p className="common_margin_p">
                      <span className="gray-text">विवरण - &nbsp;</span>
                      {isData && isData?.REMARK}
                    </p>
                  </>
                )}
                {isData && isData.CHEQUE_NO === '' && (
                  <>
                    <p className="common_margin_p">
                      <span className="gray-text">विवरण - &nbsp;</span>
                      {isData && isData?.REMARK}
                    </p>
                  </>
                )}
                <div>
                  <div>
                    {isData &&
                      isData.manualItemDetails &&
                      isData.manualItemDetails[0].ChequeNo && (
                        <>
                          <p className="common_margin_p">
                            <span className="gray-text">
                              माध्यम - &nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                            {isData && isData?.TYPE
                              ? isData?.TYPE
                              : isData &&
                                isData.manualItemDetails &&
                                isData.manualItemDetails[0].BankName}
                            {isData && isData?.TYPE
                              ? isData?.TYPE
                              : isData &&
                                isData.manualItemDetails &&
                                isData.manualItemDetails[0].ChequeNo}
                          </p>
                        </>
                      )}
                  </div>
                </div>

                <div>
                  {isData &&
                    isData.modeOfDonation === '1' &&
                    isData.manualItemDetails &&
                    isData.manualItemDetails[0].BankName && (
                      <>
                        <p className="common_margin_p">
                          <span className="gray-text">
                            माध्यम - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp;
                          </span>
                          {isData && isData?.TYPE
                            ? isData?.TYPE
                            : isData &&
                              isData.manualItemDetails &&
                              isData.manualItemDetails[0].BankName}
                        </p>
                      </>
                    )}
                </div>
                {isData &&
                  isData.manualItemDetails &&
                  isData.manualItemDetails[0].itemType && (
                    <p className="common_margin_p">
                      <span className="gray-text">सामग्री का नाम -</span>
                      {isData &&
                        isData.manualItemDetails &&
                        isData.manualItemDetails[0].itemType}
                    </p>
                  )}

                {isData && isData?.modeOfDonation === '4' ? (
                  <>
                    <p className="common_margin_p">
                      <span className="gray-text">
                        विवरण - &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                      </span>
                      {/* {isData && isData?.TYPE
                        ? isData?.TYPE
                        : isData && isData.manualItemDetails
[0].remark} */}
                    </p>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div>
              {(isData && isData?.modeOfDonation === '4') ||
              (isData && isData?.modeOfDonation === 4) ? (
                <>
                  <p style={{ textAlign: 'center' }} className="gray-text">
                    आपके द्वारा प्रदत्त उपहार दान स्वरूप सधन्यवाद प्राप्त हुआ।
                  </p>
                </>
              ) : (
                <>
                  <div className="div_center_text_is">
                    {isData && isData.manualItemDetails && (
                      <>
                        <div className="gray-text_div">
                          <p>दान का मद -</p>
                        </div>
                        <div className="wrap_div_child_div">
                          {isData &&
                            isData.manualItemDetails &&
                            isData.manualItemDetails.map((item) => {
                              return (
                                <p className="common_margin_p">
                                  {' '}
                                  {item.type}-₹ {item.amount} /-
                                </p>
                              );
                            })}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="handle_display_div">
                    <p className="common_margin_p">
                      <span className="gray-text">
                        दान राशि अंको में - &nbsp;
                      </span>
                      ₹
                      {isData && isData?.AMOUNT
                        ? isData?.AMOUNT
                        : isData &&
                          isData.manualItemDetails.reduce(
                            (n, { amount }) =>
                              parseFloat(n) + parseFloat(amount),
                            0,
                          )}
                      /-
                    </p>

                    {isData && isData.modeOfDonation === '3' && (
                      <>
                        <p className="common_margin_p margin_left_is">
                          <span className="gray-text">
                            विवरण - &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>
                          {isData && isData?.REMARK
                            ? isData?.REMARK
                            : isData && isData.manualItemDetails[0].remark}
                        </p>
                      </>
                    )}

                    {isData && isData.modeOfDonation === 3 && (
                      <>
                        <p className="common_margin_p margin_left_is">
                          <span className="gray-text">
                            विवरण - &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>
                          {isData && isData?.REMARK
                            ? isData?.REMARK
                            : isData && isData.manualItemDetails[0].remark}
                        </p>
                      </>
                    )}

                    {isData && isData.modeOfDonation === '1' && (
                      <>
                        <p className="common_margin_p margin_left_is">
                          <span className="gray-text">विवरण - &nbsp;</span>
                          {isData && isData?.REMARK
                            ? isData?.REMARK
                            : isData && isData.manualItemDetails[0].remark}
                        </p>
                      </>
                    )}

                    {isData && isData.modeOfDonation === 1 && (
                      <>
                        <p className="common_margin_p margin_left_is">
                          <span className="gray-text">विवरण - &nbsp;</span>
                          {isData && isData?.REMARK
                            ? isData?.REMARK
                            : isData && isData.manualItemDetails[0].remark}
                        </p>
                      </>
                    )}
                  </div>
                  <p className="common_margin_p">
                    <span className="gray-text">
                      दान राशि शब्दों में - &nbsp;
                    </span>

                    {isData && isData.manualItemDetails ? (
                      <>
                        {isData && isData?.AMOUNT
                          ? converter.toWords(
                              isData?.AMOUNT ? isData?.AMOUNT : 0,
                              {
                                comma: true,
                              },
                            )
                          : isData &&
                            converter.toWords(
                              isData &&
                                isData.manualItemDetails.reduce(
                                  (n, { amount }) =>
                                    parseFloat(n) + parseFloat(amount),
                                  0,
                                )
                                ? isData &&
                                    isData.manualItemDetails.reduce(
                                      (n, { amount }) =>
                                        parseFloat(n) + parseFloat(amount),
                                      0,
                                    )
                                : 0,
                              {
                                comma: true,
                              },
                            )}
                        ,
                        {isData && isData?.modeOfDonation === '2' && (
                          <span className="gray-text">
                            {' '}
                            रूपये नगद दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                          </span>
                        )}
                        {isData && isData?.modeOfDonation === 2 && (
                          <span className="gray-text">
                            {' '}
                            रूपये नगद दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                          </span>
                        )}
                        {isData && isData?.modeOfDonation === '1' && (
                          <span className="gray-text">
                            रूपये बैंक द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                          </span>
                        )}
                        {isData && isData?.modeOfDonation === 1 && (
                          <span className="gray-text">
                            रूपये बैंक द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                          </span>
                        )}
                        {isData && isData?.modeOfDonation === '3' && (
                          <span className="gray-text">
                            चैक द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                          </span>
                        )}
                        {isData && isData?.modeOfDonation === 3 && (
                          <span className="gray-text">
                            चैक द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        {isData && isData?.MODE_OF_DONATION === 'ONLINE' && (
                          <span className="gray-text">
                            {isData && converter.toWords(isData?.AMOUNT)}, रूपये
                            ऑनलाइन द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।
                          </span>
                        )}
                        {isData && isData?.MODE_OF_DONATION === 'CHEQUE' && (
                          <span span className="gray-text">
                            {isData && converter.toWords(isData?.AMOUNT)}, रूपये
                            ऑनलाइन चैक द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।
                          </span>
                        )}
                      </>
                    )}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="gray-text-div extra_bottom_margin">
            <p>( {empName ? empName : adminName})</p>
          </div>
          <div>
            {isData?.active === '0' && (
              <>
                <div className="cancel_text1">
                  <p>Cancelled </p>
                </div>
              </>
            )}

            {isData?.isActive === false && (
              <>
                <div className="cancel_text1">
                  <p>Cancelled </p>
                </div>
              </>
            )}

            <div className="main_print_div">
              <div>
                <p className="common_margin_p">
                  <span className="gray-text">
                    दान रसीद नं -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  </span>
                  {isData?.RECEIPT_NO ? isData?.RECEIPT_NO : isData?.ReceiptNo}
                </p>
                <p className="common_margin_p">
                  <span className="gray-text">
                    दान दातार - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  </span>
                  {isData?.gender}&nbsp;
                  {isData?.NAME ? isData?.NAME : isData?.name}
                </p>
                <p className="common_margin_p">
                  <span className="gray-text">
                    स्थान - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp;
                  </span>
                  {isData?.ADDRESS ? isData?.ADDRESS : isData?.address}
                </p>
                {isData && isData.CHEQUE_NO && (
                  <>
                    <p className="common_margin_p">
                      <span className="gray-text">
                        दान का मद - &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                      {isData && isData?.TYPE}
                    </p>
                  </>
                )}

                {isData && isData.CHEQUE_NO === '' && (
                  <>
                    <p className="common_margin_p">
                      <span className="gray-text">
                        दान का मद - &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                      {isData && isData?.TYPE}
                    </p>
                  </>
                )}
                {isData &&
                isData.manualItemDetails &&
                isData.manualItemDetails[0].itemType ? (
                  <></>
                ) : (
                  <>{isData && isData.modeOfDonation && <></>}</>
                )}

                {isData &&
                  isData.manualItemDetails &&
                  isData.manualItemDetails[0].itemType && (
                    <>
                      <p className="common_margin_p">
                        <span className="gray-text">
                          मद -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </span>
                        {isData &&
                          isData.manualItemDetails &&
                          isData.manualItemDetails[0].type}
                      </p>

                      <p className="common_margin_p">
                        <span className="gray-text">
                          संख्या-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                        </span>
                        {isData &&
                          isData.manualItemDetails &&
                          isData.manualItemDetails[0].quantity}
                      </p>
                      <p className="common_margin_p">
                        <span className="gray-text">
                          वजन -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; &nbsp;&nbsp; &nbsp;
                        </span>
                        {isData && isData.manualItemDetails[0].size} &nbsp;
                        {isData && isData.manualItemDetails[0].unit}
                      </p>
                    </>
                  )}
              </div>
              <div>
                <p className="common_margin_p">
                  <span className="gray-text">
                    दिनांक - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  </span>
                  {isData && isData?.manualItemDetails ? (
                    <>
                      {Moment(isData?.donation_date).format('DD-MM-YYYY')}:
                      {moment(isData?.donation_time, 'HH:mm:ss').format(
                        'hh:mm A',
                      )}
                    </>
                  ) : (
                    <>{Moment(isData?.DATE_OF_CHEQUE).format('DD-MM-YYYY')}-</>
                  )}
                </p>
                <p className="common_margin_p">
                  <span className="gray-text">
                    मोबाइल नं - &nbsp; &nbsp; &nbsp;
                  </span>
                  {isData && isData?.MobileNo
                    ? isData?.MobileNo
                    : isData && isData.phoneNo}{' '}
                  &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                  &nbsp;
                </p>
                {isData && isData.modeOfDonation === '2' && (
                  <>
                    <p className="common_margin_p">
                      <span className="gray-text">
                        विवरण - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                      </span>
                      {isData && isData?.REMARK
                        ? isData?.REMARK
                        : isData && isData.manualItemDetails[0].remark}
                    </p>
                  </>
                )}
                {isData && isData.modeOfDonation === 2 && (
                  <>
                    <p className="common_margin_p">
                      <span className="gray-text">
                        विवरण - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                      </span>
                      {isData && isData?.REMARK
                        ? isData?.REMARK
                        : isData && isData.manualItemDetails[0].remark}
                    </p>
                  </>
                )}
                {isData && isData.CHEQUE_NO && (
                  <>
                    <p className="common_margin_p">
                      <span className="gray-text">माध्यम -</span>
                      {isData?.CHEQUE_NO}
                      {isData?.NAME_OF_BANK}
                    </p>
                  </>
                )}
                {isData && isData.CHEQUE_NO && (
                  <>
                    <p className="common_margin_p">
                      <span className="gray-text">विवरण - &nbsp;</span>
                      {isData && isData?.REMARK}
                    </p>
                  </>
                )}
                {isData && isData.CHEQUE_NO === '' && (
                  <>
                    <p className="common_margin_p">
                      <span className="gray-text">विवरण - &nbsp;</span>
                      {isData && isData?.REMARK}
                    </p>
                  </>
                )}
                <div>
                  <div>
                    {isData &&
                      isData.manualItemDetails &&
                      isData.manualItemDetails[0].ChequeNo && (
                        <>
                          <p className="common_margin_p">
                            <span className="gray-text">
                              माध्यम - &nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                            {isData && isData?.TYPE
                              ? isData?.TYPE
                              : isData &&
                                isData.manualItemDetails &&
                                isData.manualItemDetails[0].BankName}
                            {isData && isData?.TYPE
                              ? isData?.TYPE
                              : isData &&
                                isData.manualItemDetails &&
                                isData.manualItemDetails[0].ChequeNo}
                          </p>
                        </>
                      )}
                  </div>
                </div>

                <div>
                  {isData &&
                    isData.modeOfDonation === '1' &&
                    isData.manualItemDetails &&
                    isData.manualItemDetails[0].BankName && (
                      <>
                        <p className="common_margin_p">
                          <span className="gray-text">
                            माध्यम - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp;
                          </span>
                          {isData && isData?.TYPE
                            ? isData?.TYPE
                            : isData &&
                              isData.manualItemDetails &&
                              isData.manualItemDetails[0].BankName}
                        </p>
                      </>
                    )}
                </div>
                {isData &&
                  isData.manualItemDetails &&
                  isData.manualItemDetails[0].itemType && (
                    <p className="common_margin_p">
                      <span className="gray-text">सामग्री का नाम -</span>
                      {isData &&
                        isData.manualItemDetails &&
                        isData.manualItemDetails[0].itemType}
                    </p>
                  )}

                {isData && isData?.modeOfDonation === '4' ? (
                  <>
                    <p className="common_margin_p">
                      <span className="gray-text">
                        विवरण - &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                      </span>
                      {/* {isData && isData?.TYPE
                        ? isData?.TYPE
                        : isData && isData.manualItemDetails
[0].remark} */}
                    </p>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div>
              {(isData && isData?.modeOfDonation === '4') ||
              (isData && isData?.modeOfDonation === 4) ? (
                <>
                  <p style={{ textAlign: 'center' }} className="gray-text">
                    आपके द्वारा प्रदत्त उपहार दान स्वरूप सधन्यवाद प्राप्त हुआ।
                  </p>
                </>
              ) : (
                <>
                  <div className="div_center_text_is">
                    {isData && isData.manualItemDetails && (
                      <>
                        <div className="gray-text_div">
                          <p>दान का मद -</p>
                        </div>
                        <div className="wrap_div_child_div">
                          {isData &&
                            isData.manualItemDetails &&
                            isData.manualItemDetails.map((item) => {
                              return (
                                <p className="common_margin_p">
                                  {' '}
                                  {item.type}-₹ {item.amount} /-
                                </p>
                              );
                            })}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="handle_display_div">
                    <p className="common_margin_p">
                      <span className="gray-text">
                        दान राशि अंको में - &nbsp;
                      </span>
                      ₹
                      {isData && isData?.AMOUNT
                        ? isData?.AMOUNT
                        : isData &&
                          isData.manualItemDetails.reduce(
                            (n, { amount }) =>
                              parseFloat(n) + parseFloat(amount),
                            0,
                          )}
                      /-
                    </p>

                    {isData && isData.modeOfDonation === '3' && (
                      <>
                        <p className="common_margin_p margin_left_is">
                          <span className="gray-text">
                            विवरण - &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>
                          {isData && isData?.REMARK
                            ? isData?.REMARK
                            : isData && isData.manualItemDetails[0].remark}
                        </p>
                      </>
                    )}

                    {isData && isData.modeOfDonation === 3 && (
                      <>
                        <p className="common_margin_p margin_left_is">
                          <span className="gray-text">
                            विवरण - &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>
                          {isData && isData?.REMARK
                            ? isData?.REMARK
                            : isData && isData.manualItemDetails[0].remark}
                        </p>
                      </>
                    )}

                    {isData && isData.modeOfDonation === '1' && (
                      <>
                        <p className="common_margin_p margin_left_is">
                          <span className="gray-text">विवरण - &nbsp;</span>
                          {isData && isData?.REMARK
                            ? isData?.REMARK
                            : isData && isData.manualItemDetails[0].remark}
                        </p>
                      </>
                    )}

                    {isData && isData.modeOfDonation === 1 && (
                      <>
                        <p className="common_margin_p margin_left_is">
                          <span className="gray-text">विवरण - &nbsp;</span>
                          {isData && isData?.REMARK
                            ? isData?.REMARK
                            : isData && isData.manualItemDetails[0].remark}
                        </p>
                      </>
                    )}
                  </div>
                  <p className="common_margin_p">
                    <span className="gray-text">
                      दान राशि शब्दों में - &nbsp;
                    </span>

                    {isData && isData.manualItemDetails ? (
                      <>
                        {isData && isData?.AMOUNT
                          ? converter.toWords(
                              isData?.AMOUNT ? isData?.AMOUNT : 0,
                              {
                                comma: true,
                              },
                            )
                          : isData &&
                            converter.toWords(
                              isData &&
                                isData.manualItemDetails.reduce(
                                  (n, { amount }) =>
                                    parseFloat(n) + parseFloat(amount),
                                  0,
                                )
                                ? isData &&
                                    isData.manualItemDetails.reduce(
                                      (n, { amount }) =>
                                        parseFloat(n) + parseFloat(amount),
                                      0,
                                    )
                                : 0,
                              {
                                comma: true,
                              },
                            )}
                        ,
                        {isData && isData?.modeOfDonation === '2' && (
                          <span className="gray-text">
                            {' '}
                            रूपये नगद दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                          </span>
                        )}
                        {isData && isData?.modeOfDonation === 2 && (
                          <span className="gray-text">
                            {' '}
                            रूपये नगद दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                          </span>
                        )}
                        {isData && isData?.modeOfDonation === '1' && (
                          <span className="gray-text">
                            रूपये बैंक द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                          </span>
                        )}
                        {isData && isData?.modeOfDonation === 1 && (
                          <span className="gray-text">
                            रूपये बैंक द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                          </span>
                        )}
                        {isData && isData?.modeOfDonation === '3' && (
                          <span className="gray-text">
                            चैक द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                          </span>
                        )}
                        {isData && isData?.modeOfDonation === 3 && (
                          <span className="gray-text">
                            चैक द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        {isData && isData?.MODE_OF_DONATION === 'ONLINE' && (
                          <span className="gray-text">
                            {isData && converter.toWords(isData?.AMOUNT)}, रूपये
                            ऑनलाइन द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।
                          </span>
                        )}
                        {isData && isData?.MODE_OF_DONATION === 'CHEQUE' && (
                          <span span className="gray-text">
                            {isData && converter.toWords(isData?.AMOUNT)}, रूपये
                            ऑनलाइन चैक द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।
                          </span>
                        )}
                      </>
                    )}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="gray-text-div">
            <p>( {empName ? empName : adminName})</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrintContent;
