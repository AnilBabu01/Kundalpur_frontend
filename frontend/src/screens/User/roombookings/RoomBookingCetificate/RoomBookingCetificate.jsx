import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './RoomBookingCetificate.css';
function RoomBookingCetificate() {
  const navigate = useNavigate();
  const location = useLocation();
  const componentRef = useRef();
  const [isData, setisData] = useState('');

  console.log('data from certifucate', isData);

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
  useEffect(() => {
    if (location.state) {
      setisData(location.state?.data);
    }
  }, []);
  return (
    <>
      <div className="main_room_receipt">
        <div className="print_ddd" id="receipt" ref={componentRef}>
          <div className="main_room_receipt_innear">
            <p className="yadda_text">यात्री आगमन रसीद</p>
            <div className="innear_div_texx">
              <div className="innear_div_texx_dd">
                <div>
                  <p>आवास क्र</p>
                  <p>यात्री का नाम-</p>
                  <p>पिता/पति श्री-</p>
                </div>
                <div>
                  <p>1234</p>
                  <p>{isData?.fullname}</p>
                  <p>........</p>
                </div>
              </div>
              <div className="innear_div_texx_dd">
                <div>
                  <p>आगमन दिनांक</p>
                  <p>मोबाईल न.-</p>
                  <p>पता-</p>
                </div>
                <div>
                  <p>13-03-2023/10:45</p>
                  <p>{isData?.mobile}</p>
                  <p>{isData?.address}</p>
                </div>
              </div>
            </div>
            <div className="yyy_text_div">
              <p>यात्री संख्या</p>
              <p>Male: 1</p>
              <p>Female: 1</p>
              <p>Child: 1</p>
              <p>Total:3</p>
            </div>

            <div>
              <table className="table_ddd">
                <tbody>
                  <tr>
                    <td className="table_tddd">धर्मशाला नाम</td>
                    <td className="table_tddd">रूम टाईप</td>
                    <td className="table_tddd">रुम न.</td>
                    <td className="table_tddd">सहयोग राशि</td>
                    <td className="table_tddd">अमानत राशि</td>
                  </tr>
                  <tr>
                    <td className="table_tddd">अयोध्या</td>
                    <td className="table_tddd">AC 2Bed</td>
                    <td className="table_tddd">1</td>
                    <td className="table_tddd">990.00 </td>
                    <td className="table_tddd">2000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="button_div_print_download">
        <button onClick={() => down()}>Download</button>
      </div>
    </>
  );
}

export default RoomBookingCetificate;
