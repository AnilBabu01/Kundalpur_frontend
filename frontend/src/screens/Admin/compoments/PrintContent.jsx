import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const navigation = useNavigate();
  const adminName = sessionStorage.getItem('adminName');

  const empName = sessionStorage.getItem('empName');

  const [isData, setisData] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  console.log(isData);
  useEffect(() => {
    setopendashboard(true);

    if (location.state) {
      setisData(location.state?.data);
    } else {
      navigation('/');
    }
    setTimeout(() => {
      handlePrint();
    }, 50);
  }, []);

  return (
    <>
      <div style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
        <div className="button_div_print_download10">
          <button onClick={() => navigation(-1)}>Back</button>

          <div />
        </div>
        <div className="super_main_divsss" ref={componentRef}>
          <div>
            <div style={{ marginTop: '10%' }}>
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
                  <p className="common_margin_pp">
                    <span className="gray-tedxt">
                      दान रसीद नं -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                    </span>
                    {isData?.RECEIPT_NO
                      ? isData?.RECEIPT_NO
                      : isData?.ReceiptNo}
                  </p>
                  <p className="common_margin_pp">
                    <span className="grady-text">
                      दान दातार - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      &nbsp;
                    </span>
                    {isData?.gender}&nbsp;
                    {isData?.NAME ? isData?.NAME : isData?.name}
                  </p>
                  <p className="common_margin_pp">
                    <span className="grady-text">
                      स्थान - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      &nbsp; &nbsp; &nbsp; &nbsp;
                    </span>
                    {isData?.ADDRESS ? isData?.ADDRESS : isData?.address}
                  </p>
                  {isData && isData.CHEQUE_NO && (
                    <>
                      <p className="common_margin_pp">
                        <span className="gray-dtext">
                          दान का मद - &nbsp; &nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        {isData && isData?.TYPE}
                      </p>
                    </>
                  )}

                  {isData && isData.CHEQUE_NO === '' && (
                    <>
                      <p className="common_margin_pp">
                        <span className="grady-text">
                          दान का मद - &nbsp; &nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        {isData && isData?.TYPE}
                      </p>
                    </>
                  )}
                  {isData &&
                  isData.elecItemDetails &&
                  isData.elecItemDetails[0].itemType ? (
                    <></>
                  ) : (
                    <>{isData && isData.modeOfDonation && <></>}</>
                  )}

                  {isData &&
                    isData.elecItemDetails &&
                    isData.elecItemDetails[0].itemType && (
                      <>
                        <p className="common_margin_pp">
                          <span className="grday-text">
                            मद -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          </span>
                          {isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].type}
                        </p>

                        <p className="common_margin_pp">
                          <span className="grday-text">
                            संख्या-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                          </span>
                          {isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].quantity}
                        </p>
                        <p
                          className="common_margin_pp"
                          style={{ marginBottom: '-1rem' }}
                        >
                          <span className="grday-text">
                            वजन -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                          </span>
                          {isData && isData.elecItemDetails[0].size} &nbsp;
                          {isData && isData.elecItemDetails[0].unit}
                        </p>
                      </>
                    )}
                </div>
                <div>
                  <p className="common_margin_pp">
                    <span className="grady-text">
                      दिनांक - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </span>
                    {isData && isData?.elecItemDetails ? (
                      <>
                        {Moment(isData?.donation_date).format('DD-MM-YYYY')}:
                        {moment(isData?.donation_time, 'HH:mm:ss').format(
                          'hh:mm A',
                        )}
                      </>
                    ) : (
                      <>
                        {Moment(isData?.DATE_OF_DAAN).format('DD-MM-YYYY')}:
                        {moment(isData?.TIME_OF_DAAN, 'HH:mm:ss').format(
                          'hh:mm A',
                        )}
                      </>
                    )}
                  </p>
                  <p className="common_margin_pp">
                    <span className="gdray-text">
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

                  {isData && isData.CHEQUE_NO && (
                    <>
                      <p className="common_margin_pp">
                        <span className="grday-text">माध्यम -</span>
                        {isData?.CHEQUE_NO}
                        {isData?.NAME_OF_BANK}
                      </p>
                    </>
                  )}
                  {isData && isData.CHEQUE_NO && (
                    <>
                      <p className="common_margin_pp">
                        <span className="grday-text">विवरण - &nbsp;</span>
                        {isData && isData?.REMARK}
                      </p>
                    </>
                  )}
                  {isData && isData.CHEQUE_NO === '' && (
                    <>
                      <p className="common_margin_pp">
                        <span className="grday-text">विवरण - &nbsp;</span>
                        {isData && isData?.REMARK}
                      </p>
                    </>
                  )}
                  <div>
                    <div>
                      {isData &&
                        isData.elecItemDetails &&
                        isData.elecItemDetails[0].ChequeNo && (
                          <>
                            <p className="common_margin_pp">
                              <span className="grday-text">
                                माध्यम - &nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              </span>
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
                    </div>
                  </div>

                  <div>
                    {isData &&
                      isData.modeOfDonation === '1' &&
                      isData.elecItemDetails &&
                      isData.elecItemDetails[0].BankName && (
                        <>
                          <p className="common_margin_pp">
                            <span className="grady-text">
                              माध्यम - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              &nbsp; &nbsp; &nbsp;
                            </span>
                            {isData && isData?.TYPE
                              ? isData?.TYPE
                              : isData &&
                                isData.elecItemDetails &&
                                isData.elecItemDetails[0].BankName}
                          </p>
                        </>
                      )}
                  </div>
                  {isData &&
                    isData.elecItemDetails &&
                    isData.elecItemDetails[0].itemType && (
                      <p className="common_margin_pp">
                        <span className="grday-text">सामग्री का नाम -</span>
                        {isData &&
                          isData.elecItemDetails &&
                          isData.elecItemDetails[0].itemType}
                      </p>
                    )}

                  {isData && isData?.modeOfDonation === '4' ? (
                    <>
                      <p className="common_margin_pp">
                        <span className="grday-text">
                          विवरण - &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                        </span>
                        {isData && isData?.TYPE
                          ? isData?.TYPE
                          : isData && isData.elecItemDetails[0].remark}
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
                    <p style={{ textAlign: 'center' }} className="grway-text">
                      आपके द्वारा प्रदत्त उपहार दान स्वरूप सधन्यवाद प्राप्त हुआ।
                    </p>
                  </>
                ) : (
                  <>
                    <div className="div_center_text_is">
                      {isData && isData.elecItemDetails && (
                        <>
                          <div className="gray-text_div">
                            <p>दान का मद -</p>
                          </div>
                          <div className="wrap_div_child_div">
                            {isData &&
                              isData.elecItemDetails &&
                              isData.elecItemDetails.map((item) => {
                                return (
                                  <p className="common_margin_pp">
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
                      <p className="common_margin_pp">
                        <span className="gray-tsext">
                          दान राशि अंको में - &nbsp;
                        </span>
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
                      {isData && isData.modeOfDonation === '2' && (
                        <>
                          <p className="common_margin_pp common_margin_pp margin_left_is">
                            <span className="grday-text">
                              विवरण - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              &nbsp;&nbsp;
                            </span>
                            {isData && isData?.REMARK
                              ? isData?.REMARK
                              : isData && isData.elecItemDetails[0].remark}
                          </p>
                        </>
                      )}
                      {isData && isData.modeOfDonation === 2 && (
                        <>
                          <p className="common_margin_pp common_margin_pp margin_left_is">
                            <span className="grday-text">
                              विवरण - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              &nbsp;&nbsp;
                            </span>
                            {isData && isData?.REMARK
                              ? isData?.REMARK
                              : isData && isData.elecItemDetails[0].remark}
                          </p>
                        </>
                      )}
                      {isData && isData.modeOfDonation === '3' && (
                        <>
                          <p className="common_margin_pp margin_left_is">
                            <span className="grsay-text">
                              विवरण - &nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                            {isData && isData?.REMARK
                              ? isData?.REMARK
                              : isData && isData.elecItemDetails[0].remark}
                          </p>
                        </>
                      )}

                      {isData && isData.modeOfDonation === 3 && (
                        <>
                          <p className="common_margin_pp margin_left_is">
                            <span className="grays-text">
                              विवरण - &nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                            {isData && isData?.REMARK
                              ? isData?.REMARK
                              : isData && isData.elecItemDetails[0].remark}
                          </p>
                        </>
                      )}

                      {isData && isData.modeOfDonation === '1' && (
                        <>
                          <p className="common_margin_pp margin_left_is">
                            <span className="grays-text">विवरण - &nbsp;</span>
                            {isData && isData?.REMARK
                              ? isData?.REMARK
                              : isData && isData.elecItemDetails[0].remark}
                          </p>
                        </>
                      )}

                      {isData && isData.modeOfDonation === 1 && (
                        <>
                          <p className="common_margin_pp margin_left_is">
                            <span className="grsay-text">विवरण - &nbsp;</span>
                            {isData && isData?.REMARK
                              ? isData?.REMARK
                              : isData && isData.elecItemDetails[0].remark}
                          </p>
                        </>
                      )}
                    </div>
                    <p className="common_margin_pp">
                      <span className="gsray-text">
                        दान राशि शब्दों में - &nbsp;
                      </span>

                      {isData && isData.elecItemDetails ? (
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
                                  isData.elecItemDetails.reduce(
                                    (n, { amount }) =>
                                      parseFloat(n) + parseFloat(amount),
                                    0,
                                  )
                                  ? isData &&
                                      isData.elecItemDetails.reduce(
                                        (n, { amount }) =>
                                          parseFloat(n) + parseFloat(amount),
                                        0,
                                      )
                                  : 0,
                                {
                                  comma: true,
                                },
                              )}

                          {isData && isData?.modeOfDonation === '2' && (
                            <span className="grsay-text">
                              {' '}
                              रूपये नगद दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === 2 && (
                            <span className="gsray-text">
                              {' '}
                              रूपये नगद दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === '1' && (
                            <span className="grasy-text">
                              रूपये बैंक द्वारा दान स्वरूप सधन्यवाद प्राप्त
                              हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === 1 && (
                            <span className="grsay-text">
                              रूपये बैंक द्वारा दान स्वरूप सधन्यवाद प्राप्त
                              हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === '3' && (
                            <span className="gsray-text">
                              &nbsp; चैक द्वारा दान स्वरूप सधन्यवाद प्राप्त
                              हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === 3 && (
                            <span className="grsay-text">
                              &nbsp; चैक द्वारा दान स्वरूप सधन्यवाद प्राप्त
                              हुये।{' '}
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          {isData && isData?.MODE_OF_DONATION === 'ONLINE' && (
                            <span className="grsay-text">
                              {isData && converter.toWords(isData?.AMOUNT)},
                              रूपये ऑनलाइन द्वारा दान स्वरूप सधन्यवाद प्राप्त
                              हुये।
                            </span>
                          )}
                          {isData && isData?.MODE_OF_DONATION === 'CHEQUE' && (
                            <span span className="grsay-text">
                              {isData && converter.toWords(isData?.AMOUNT)},
                              रूपये ऑनलाइन चैक द्वारा दान स्वरूप सधन्यवाद
                              प्राप्त हुये।
                            </span>
                          )}
                        </>
                      )}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div
              className="gray-text-div10 extra_bottom_margin"
              style={{ marginTop: '23%' }}
            >
              <p>({isData?.createdBy})</p>
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

              <div style={{ marginTop: '17%' }} className="main_print_div">
                <div>
                  <p className="common_margin_pp">
                    <span className="grsay-text">
                      दान रसीद नं -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                    </span>
                    {isData?.RECEIPT_NO
                      ? isData?.RECEIPT_NO
                      : isData?.ReceiptNo}
                  </p>
                  <p className="common_margin_pp">
                    <span className="grsay-text">
                      दान दातार - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      &nbsp;
                    </span>
                    {isData?.gender}&nbsp;
                    {isData?.NAME ? isData?.NAME : isData?.name}
                  </p>
                  <p className="common_margin_pp">
                    <span className="grasy-text">
                      स्थान - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      &nbsp; &nbsp; &nbsp; &nbsp;
                    </span>
                    {isData?.ADDRESS ? isData?.ADDRESS : isData?.address}
                  </p>
                  {isData && isData.CHEQUE_NO && (
                    <>
                      <p className="common_margin_pp">
                        <span className="gsray-text">
                          दान का मद - &nbsp; &nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        {isData && isData?.TYPE}
                      </p>
                    </>
                  )}

                  {isData && isData.CHEQUE_NO === '' && (
                    <>
                      <p className="common_margin_pp">
                        <span className="grsay-text">
                          दान का मद - &nbsp; &nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        {isData && isData?.TYPE}
                      </p>
                    </>
                  )}
                  {isData &&
                  isData.elecItemDetails &&
                  isData.elecItemDetails[0].itemType ? (
                    <></>
                  ) : (
                    <>{isData && isData.modeOfDonation && <></>}</>
                  )}

                  {isData &&
                    isData.elecItemDetails &&
                    isData.elecItemDetails[0].itemType && (
                      <>
                        <p className="common_margin_pp">
                          <span className="grsay-text">
                            मद -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          </span>
                          {isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].type}
                        </p>

                        <p className="common_margin_pp">
                          <span className="grasy-text">
                            संख्या-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                          </span>
                          {isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].quantity}
                        </p>
                        <p className="common_margin_pp">
                          <span className="grsay-text">
                            वजन -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                          </span>
                          {isData && isData.elecItemDetails[0].size} &nbsp;
                          {isData && isData.elecItemDetails[0].unit}
                        </p>
                      </>
                    )}
                </div>
                <div>
                  <p className="common_margin_pp">
                    <span className="grasy-text">
                      दिनांक - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </span>
                    {isData && isData?.elecItemDetails ? (
                      <>
                        {Moment(isData?.donation_date).format('DD-MM-YYYY')}:
                        {moment(isData?.donation_time, 'HH:mm:ss').format(
                          'hh:mm A',
                        )}
                      </>
                    ) : (
                      <>
                        {Moment(isData?.DATE_OF_DAAN).format('DD-MM-YYYY')}:
                        {moment(isData?.TIME_OF_DAAN, 'HH:mm:ss').format(
                          'hh:mm A',
                        )}
                      </>
                    )}
                  </p>
                  <p className="common_margin_pp">
                    <span className="grasy-text">
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

                  {isData && isData.CHEQUE_NO && (
                    <>
                      <p className="common_margin_pp">
                        <span className="gsray-text">माध्यम -</span>
                        {isData?.CHEQUE_NO}
                        {isData?.NAME_OF_BANK}
                      </p>
                    </>
                  )}
                  {isData && isData.CHEQUE_NO && (
                    <>
                      <p className="common_margin_pp">
                        <span className="grsay-text">विवरण - &nbsp;</span>
                        {isData && isData?.REMARK}
                      </p>
                    </>
                  )}
                  {isData && isData.CHEQUE_NO === '' && (
                    <>
                      <p className="common_margin_pp">
                        <span className="grsay-text">विवरण - &nbsp;</span>
                        {isData && isData?.REMARK}
                      </p>
                    </>
                  )}
                  <div>
                    <div>
                      {isData &&
                        isData.elecItemDetails &&
                        isData.elecItemDetails[0].ChequeNo && (
                          <>
                            <p className="common_margin_pp">
                              <span className="grsay-text">
                                माध्यम - &nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              </span>
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
                    </div>
                  </div>

                  <div>
                    {isData &&
                      isData.modeOfDonation === '1' &&
                      isData.elecItemDetails &&
                      isData.elecItemDetails[0].BankName && (
                        <>
                          <p className="common_margin_pp">
                            <span className="grsay-text">
                              माध्यम - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              &nbsp; &nbsp; &nbsp;
                            </span>
                            {isData && isData?.TYPE
                              ? isData?.TYPE
                              : isData &&
                                isData.elecItemDetails &&
                                isData.elecItemDetails[0].BankName}
                          </p>
                        </>
                      )}
                  </div>
                  {isData &&
                    isData.elecItemDetails &&
                    isData.elecItemDetails[0].itemType && (
                      <p className="common_margin_pp">
                        <span className="grasy-text">सामग्री का नाम -</span>
                        {isData &&
                          isData.elecItemDetails &&
                          isData.elecItemDetails[0].itemType}
                      </p>
                    )}

                  {isData && isData?.modeOfDonation === '4' ? (
                    <>
                      <p className="common_margin_pp">
                        <span className="grsay-text">
                          विवरण - &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                        </span>
                        {isData && isData?.TYPE
                          ? isData?.TYPE
                          : isData && isData.elecItemDetails[0].remark}
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
                    <p style={{ textAlign: 'center' }} className="gracy-text">
                      आपके द्वारा प्रदत्त उपहार दान स्वरूप सधन्यवाद प्राप्त हुआ।
                    </p>
                  </>
                ) : (
                  <>
                    <div className="div_center_text_is">
                      {isData && isData.elecItemDetails && (
                        <>
                          <div className="gray-text_div">
                            <p>दान का मद -</p>
                          </div>
                          <div className="wrap_div_child_div">
                            {isData &&
                              isData.elecItemDetails &&
                              isData.elecItemDetails.map((item) => {
                                return (
                                  <p className="common_margin_pp">
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
                      <p className="common_margin_pp">
                        <span className="grsay-text">
                          दान राशि अंको में - &nbsp;
                        </span>
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
                      {isData && isData.modeOfDonation === '2' && (
                        <>
                          <p className="common_margin_pp common_margin_pp margin_left_is">
                            <span className="gsray-text">
                              विवरण - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              &nbsp;&nbsp;
                            </span>
                            {isData && isData?.REMARK
                              ? isData?.REMARK
                              : isData && isData.elecItemDetails[0].remark}
                          </p>
                        </>
                      )}
                      {isData && isData.modeOfDonation === 2 && (
                        <>
                          <p className="common_margin_pp common_margin_pp margin_left_is">
                            <span className="grsay-text">
                              विवरण - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              &nbsp;&nbsp;
                            </span>
                            {isData && isData?.REMARK
                              ? isData?.REMARK
                              : isData && isData.elecItemDetails[0].remark}
                          </p>
                        </>
                      )}
                      {isData && isData.modeOfDonation === '3' && (
                        <>
                          <p className="common_margin_pp margin_left_is">
                            <span className="grsay-text">
                              विवरण - &nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                            {isData && isData?.REMARK
                              ? isData?.REMARK
                              : isData && isData.elecItemDetails[0].remark}
                          </p>
                        </>
                      )}

                      {isData && isData.modeOfDonation === 3 && (
                        <>
                          <p className="common_margin_pp margin_left_is">
                            <span className="grsay-text">
                              विवरण - &nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                            {isData && isData?.REMARK
                              ? isData?.REMARK
                              : isData && isData.elecItemDetails[0].remark}
                          </p>
                        </>
                      )}

                      {isData && isData.modeOfDonation === '1' && (
                        <>
                          <p className="common_margin_pp margin_left_is">
                            <span className="grsay-text">विवरण - &nbsp;</span>
                            {isData && isData?.REMARK
                              ? isData?.REMARK
                              : isData && isData.elecItemDetails[0].remark}
                          </p>
                        </>
                      )}

                      {isData && isData.modeOfDonation === 1 && (
                        <>
                          <p className="common_margin_pp margin_left_is">
                            <span className="grsay-text">विवरण - &nbsp;</span>
                            {isData && isData?.REMARK
                              ? isData?.REMARK
                              : isData && isData.elecItemDetails[0].remark}
                          </p>
                        </>
                      )}
                    </div>
                    <p className="common_margin_pp">
                      <span className="grsay-text">
                        दान राशि शब्दों में - &nbsp;
                      </span>

                      {isData && isData.elecItemDetails ? (
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
                                  isData.elecItemDetails.reduce(
                                    (n, { amount }) =>
                                      parseFloat(n) + parseFloat(amount),
                                    0,
                                  )
                                  ? isData &&
                                      isData.elecItemDetails.reduce(
                                        (n, { amount }) =>
                                          parseFloat(n) + parseFloat(amount),
                                        0,
                                      )
                                  : 0,
                                {
                                  comma: true,
                                },
                              )}

                          {isData && isData?.modeOfDonation === '2' && (
                            <span className="gsray-text">
                              {' '}
                              रूपये नगद दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === 2 && (
                            <span className="grsay-text">
                              {' '}
                              रूपये नगद दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === '1' && (
                            <span className="grsay-text">
                              रूपये बैंक द्वारा दान स्वरूप सधन्यवाद प्राप्त
                              हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === 1 && (
                            <span className="gray-text">
                              रूपये बैंक द्वारा दान स्वरूप सधन्यवाद प्राप्त
                              हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === '3' && (
                            <span className="grsay-text">
                              &nbsp; चैक द्वारा दान स्वरूप सधन्यवाद प्राप्त
                              हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === 3 && (
                            <span className="grsay-text">
                              &nbsp; चैक द्वारा दान स्वरूप सधन्यवाद प्राप्त
                              हुये।{' '}
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          {isData && isData?.MODE_OF_DONATION === 'ONLINE' && (
                            <span className="grsay-text">
                              {isData && converter.toWords(isData?.AMOUNT)},
                              रूपये ऑनलाइन द्वारा दान स्वरूप सधन्यवाद प्राप्त
                              हुये।
                            </span>
                          )}
                          {isData && isData?.MODE_OF_DONATION === 'CHEQUE' && (
                            <span span className="grsay-text">
                              {isData && converter.toWords(isData?.AMOUNT)},
                              रूपये ऑनलाइन चैक द्वारा दान स्वरूप सधन्यवाद
                              प्राप्त हुये।
                            </span>
                          )}
                        </>
                      )}
                    </p>
                  </>
                )}
              </div>
            </div>

            <p> &nbsp;</p>
            <p> &nbsp;</p>
            <p> &nbsp;</p>
            <p> &nbsp;</p>
            <p> &nbsp;</p>
            <p> &nbsp;</p>

            <p className="text_alijdshfhd" style={{ marginTop: '20px' }}>
              ({isData?.createdBy})
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrintContent;
