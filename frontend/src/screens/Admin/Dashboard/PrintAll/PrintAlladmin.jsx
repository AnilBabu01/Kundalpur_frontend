import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Group224 from '../../../../assets/Group224.png';
import Group225 from '../../../../assets/Group225.png';
import Group227 from '../../../../assets/Group227.png';
import Group228 from '../../../../assets/Group228.png';
import { serverInstance } from '../../../../API/ServerInstance';
import DonationTotal from '../../TotalDashboardFun/DonationTotal';
import ManaulTotal from '../../TotalDashboardFun/ManaulTotal';
import OnlineTotal from '../../TotalDashboardFun/OnlineTotal';
import EmpelecTotal from '../../TotalDashboardFun/EmpelecTotal';
import EmpmanulTotal from '../../TotalDashboardFun/EmpmanulTotal';

function PrintAlladmin({ handleClose }) {
  const componentRef = useRef();
  const [userrole, setuserrole] = useState('');
  const [isData1, setisData1] = useState('');
  const [isData2, setisData2] = useState('');
  const [isData3, setisData3] = useState('');
  const [isData4, setisData4] = useState('');
  const [isData5, setisData5] = useState('');
  const getallelec = () => {
    serverInstance('admin/dash-admin-total-elec', 'get').then((res) => {
      console.log('ele data', res.data.data);
      setisData1(res.data.data);
    });
  };

  const getallmanual = () => {
    serverInstance('admin/dash-admin-total-manual', 'get').then((res) => {
      console.log('ele data', res.data.data);
      setisData2(res.data.data);
    });
  };

  const getallonline = () => {
    serverInstance('admin/dash-admin-total-online', 'get').then((res) => {
      console.log('ele data', res.data.data);
      setisData3(res.data.data);
    });
  };

  const getallempelec = () => {
    serverInstance('admin/dash-employee-total-elec', 'get').then((res) => {
      console.log('ele data', res.data.data);
      setisData4(res.data.data);
    });
  };

  const getallempmanual = () => {
    serverInstance('admin/dash-employee-total-manual', 'get').then((res) => {
      console.log('ele data', res.data.data);
      setisData5(res.data.data);
    });
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    setuserrole(Number(sessionStorage.getItem('userrole')));
    getallelec(),
      getallmanual(),
      getallonline(),
      getallempelec(),
      getallempmanual();
  }, []);
  return (
    <>
      <div style={{ maxHeight: 'calc(80vh - 4rem)', overflowY: 'auto' }}>
        <div ref={componentRef} style={{ padding: '1rem' }}>
          <div>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि कुण्डलपुर दमोह (म.प्र.)
            </p>
          </div>
          <div style={{ width: '100%' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                marginTop: '1rem',
              }}
            >
              {userrole === 1 ? (
                <>
                  <div
                    className="main_card_amount"
                    style={{
                      background: '#FE0000',
                      color: 'white',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '9px',
                      }}
                    >
                      Donation
                    </p>
                    <div className="main_repue_img">
                      <p
                        style={{
                          fontSize: '9px',
                        }}
                      >
                        {' '}
                        <DonationTotal data={isData1} />{' '}
                      </p>
                      <img
                        style={{
                          width: '20px',
                        }}
                        src={Group225}
                        alt="dd"
                      />
                    </div>
                  </div>
                  <div
                    className="main_card_amount"
                    style={{ background: '#FECE00', color: 'white' }}
                  >
                    <p
                      style={{
                        fontSize: '9px',
                      }}
                    >
                      Manual Donation
                    </p>
                    <div className="main_repue_img">
                      <p
                        style={{
                          fontSize: '9px',
                        }}
                      >
                        {' '}
                        <ManaulTotal data={isData2} />
                      </p>

                      <img
                        style={{
                          width: '20px',
                        }}
                        src={Group225}
                        alt="dd"
                      />
                    </div>
                  </div>
                  <div
                    className="main_card_amount"
                    style={{ background: '#009430', color: 'white' }}
                  >
                    <p
                      style={{
                        fontSize: '9px',
                      }}
                    >
                      Online Donation
                    </p>
                    <div className="main_repue_img">
                      <p
                        style={{
                          fontSize: '9px',
                        }}
                      >
                        {' '}
                        <OnlineTotal data={isData3} />
                      </p>

                      <img
                        style={{
                          width: '20px',
                        }}
                        src={Group224}
                        alt="dd"
                      />
                    </div>
                  </div>
                  <div
                    className="main_card_amount"
                    style={{ background: '#3C5FFE', color: 'white' }}
                  >
                    <p
                      style={{
                        fontSize: '9px',
                      }}
                    >
                      Room Booking
                    </p>
                    <div className="main_repue_img">
                      <p
                        style={{
                          fontSize: '9px',
                        }}
                      >
                        ₹ 10,000
                      </p>
                      <img
                        style={{
                          width: '20px',
                        }}
                        src={Group227}
                        alt="dd"
                      />
                    </div>
                  </div>
                  <div
                    className="main_card_amount"
                    style={{ background: '#FF6332', color: 'white' }}
                  >
                    <p
                      style={{
                        fontSize: '9px',
                      }}
                    >
                      Online Room Booking
                    </p>
                    <div className="main_repue_img">
                      <p
                        style={{
                          fontSize: '9px',
                        }}
                      >
                        ₹ 10,000
                      </p>
                      <img
                        style={{
                          width: '20px',
                        }}
                        src={Group225}
                        alt="dd"
                      />
                    </div>
                  </div>
                  <div
                    className="main_card_amount"
                    style={{ background: '#808080', color: 'white' }}
                  >
                    <p
                      style={{
                        fontSize: '9px',
                      }}
                    >
                      Guest in Room
                    </p>
                    <div className="main_repue_img">
                      <p
                        style={{
                          fontSize: '9px',
                        }}
                      >
                        10,000
                      </p>
                      <img
                        style={{
                          width: '20px',
                        }}
                        src={Group228}
                        alt="dd"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="main_card_amount"
                    style={{
                      background: '#FE0000',
                      color: 'white',
                      width: '23%',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '14px',
                      }}
                    >
                      Donation
                    </p>
                    <div className="main_repue_img">
                      <p
                        style={{
                          fontSize: '14px',
                        }}
                      >
                        <EmpelecTotal data={isData4} />
                      </p>

                      <img
                        style={{
                          width: '20px',
                        }}
                        src={Group225}
                        alt="dd"
                      />
                    </div>
                  </div>
                  <div
                    className="main_card_amount"
                    style={{
                      background: '#FECE00',
                      color: 'white',
                      width: '23%',
                    }}
                  >
                    <p style={{ fontSize: '14px' }}>Manual Donation</p>
                    <div className="main_repue_img">
                      <p
                        style={{
                          fontSize: '14px',
                        }}
                      >
                        <EmpmanulTotal data={isData5} />
                      </p>

                      <img
                        style={{
                          width: '20px',
                        }}
                        src={Group225}
                        alt="dd"
                      />
                    </div>
                  </div>

                  <div
                    className="main_card_amount"
                    style={{
                      background: '#3C5FFE',
                      color: 'white',
                      width: '23%',
                    }}
                  >
                    <p style={{ fontSize: '14px' }}>Room Booking</p>
                    <div className="main_repue_img">
                      <p
                        style={{
                          fontSize: '14px',
                        }}
                      >
                        ₹ 10,000
                      </p>
                      <img
                        style={{
                          width: '20px',
                        }}
                        src={Group227}
                        alt="dd"
                      />
                    </div>
                  </div>

                  <div
                    className="main_card_amount"
                    style={{
                      background: '#808080',
                      color: 'white',
                      width: '23%',
                    }}
                  >
                    <p style={{ fontSize: '14px' }}>Guest in Room</p>
                    <div className="main_repue_img">
                      <p
                        style={{
                          fontSize: '14px',
                        }}
                      >
                        10,000
                      </p>
                      <img
                        style={{
                          width: '20px',
                        }}
                        src={Group228}
                        alt="dd"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {userrole === 1 ? (
            <>
              <p
                style={{
                  color: '#FE0000',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                Donation(दान)
              </p>
              <table>
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Staff Name</th>
                  <th>Cash</th>
                  <th>Bank</th>
                  <th>Cheque</th>
                  <th>Total</th>
                </tr>
                {isData1 && (
                  <>
                    {isData1 &&
                      isData1.map((row, index) => (
                        <tr
                          className="margintop_add"
                          style={{ borderBottom: '1px solid gray' }}
                          key={index}
                        >
                          <td>{row?.employee_name}</td>

                          <td>{row?.cash_amount}</td>
                          <td>{row?.bank_amount}</td>
                          <td>{row?.cheque_amount}</td>
                          <td>{row?.total}</td>
                        </tr>
                      ))}
                  </>
                )}
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Total</th>
                  <th>
                    {isData1
                      ? isData1.reduce(
                          (n, { cash_amount }) =>
                            parseFloat(n) + parseFloat(cash_amount),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {' '}
                    {isData1
                      ? isData1.reduce(
                          (n, { bank_amount }) =>
                            parseFloat(n) + parseFloat(bank_amount),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {' '}
                    {isData1
                      ? isData1.reduce(
                          (n, { cheque_amount }) =>
                            parseFloat(n) + parseFloat(cheque_amount),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {isData1
                      ? isData1.reduce(
                          (n, { total }) => parseFloat(n) + parseFloat(total),
                          0,
                        )
                      : '0'}
                  </th>
                </tr>
              </table>
              <p
                style={{
                  color: '#FECE00',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                Manual Donation (दान)
              </p>
              <table>
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Staff Name</th>
                  <th>Cash</th>
                  <th>Bank</th>
                  <th>Cheque</th>
                  <th>Total</th>
                </tr>
                {isData2 && (
                  <>
                    {isData2 &&
                      isData2.map((row, index) => (
                        <tr
                          className="margintop_add"
                          style={{ borderBottom: '1px solid gray' }}
                          key={index}
                        >
                          <td>{row?.employee_name}</td>

                          <td>{row?.cash_amount}</td>
                          <td>{row?.bank_amount}</td>
                          <td>{row?.cheque_amount}</td>
                          <td>{row?.total}</td>
                        </tr>
                      ))}
                  </>
                )}
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Total</th>
                  <th>
                    {isData2
                      ? isData2.reduce(
                          (n, { cash_amount }) =>
                            parseFloat(n) + parseFloat(cash_amount),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {' '}
                    {isData2
                      ? isData2.reduce(
                          (n, { bank_amount }) =>
                            parseFloat(n) + parseFloat(bank_amount),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {' '}
                    {isData2
                      ? isData2.reduce(
                          (n, { cheque_amount }) =>
                            parseFloat(n) + parseFloat(cheque_amount),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {isData2
                      ? isData2.reduce(
                          (n, { total }) => parseFloat(n) + parseFloat(total),
                          0,
                        )
                      : '0'}
                  </th>
                </tr>
              </table>
              <p
                style={{
                  color: '#009430',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                Online Donation(दान)
              </p>
              <table>
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  {' '}
                  <th>&nbsp;</th>
                  <th>Bank</th>
                  <th>Cheque</th>
                  <th>Total</th>
                </tr>
                {isData3 && (
                  <>
                    {isData3 &&
                      isData3.map((row, index) => (
                        <tr key={index} className="margintop_add">
                          <td>&nbsp;</td>
                          <td>{row?.Online_amount}</td>

                          <td>{row?.Cheque_amount}</td>
                          <td>{row?.total}</td>
                        </tr>
                      ))}
                  </>
                )}
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>&nbsp;</th>
                  <th>
                    {' '}
                    {isData3
                      ? isData3.reduce(
                          (n, { Online_amount }) =>
                            parseFloat(n) + parseFloat(Online_amount),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {isData3
                      ? isData3.reduce(
                          (n, { Cheque_amount }) =>
                            parseFloat(n) + parseFloat(Cheque_amount),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {isData3
                      ? isData3.reduce(
                          (n, { total }) => parseFloat(n) + parseFloat(total),
                          0,
                        )
                      : '0'}
                  </th>
                </tr>
              </table>
              <p
                style={{
                  color: '#3C5FFE',
                  marginBottom: '1rem',
                  marginTop: '1rem',
                }}
              >
                Room Booking(आवास)
              </p>
              <table>
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Staff Name</th>
                  <th>Bank</th>
                  <th>Cash</th>
                  <th>Total</th>
                </tr>
                <tr className="margintop_add">
                  <td>anil</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr className="margintop_add">
                  <th>Total</th>
                  <th>0</th>
                  <th>0</th>
                  <th>0</th>
                </tr>
              </table>
              <p
                style={{
                  color: '#FF6332',
                  marginBottom: '1rem',
                  marginTop: '1rem',
                }}
              >
                Online Room Booking(आवास)
              </p>
              <table>
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>User Name</th>
                  <th>Amout</th>
                </tr>
                <tr>
                  <td>Anil Babu</td>
                  <td>0</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <th>0</th>
                </tr>
              </table>
              <p
                style={{
                  color: '#808080',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                Guest In Room(यात्री संख्या)
              </p>
              <table>
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Gender</th>
                  <th>Quantity</th>
                </tr>
                <tr>
                  <td>Male</td>
                  <td>10</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <th>10</th>
                </tr>
              </table>
            </>
          ) : (
            <>
              <p
                style={{
                  color: '#FE0000',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                Donation(दान)
              </p>
              <table>
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Cash</th>
                  <th>Bank</th>
                  <th>Cheque</th>
                  <th>Total</th>
                </tr>
                {isData4 && (
                  <>
                    {isData4 &&
                      isData4.map((row, index) => (
                        <tr
                          key={index}
                          className="margintop_add"
                          style={{ borderBottom: '1px solid gray' }}
                        >
                          <td>{row.cash_amount}</td>

                          <td>{row.bank_amount}</td>
                          <td>{row.cheque_amount}</td>

                          <td>{row.total}</td>
                        </tr>
                      ))}
                  </>
                )}
              </table>
              <p
                style={{
                  color: '#FECE00',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                Manual Donation (दान)
              </p>
              <table>
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray', fontSize: '14px' }}
                >
                  <th>Cash</th>
                  <th>Bank</th>
                  <th>Cheque</th>
                  <th>Total</th>
                </tr>
                {isData4 && (
                  <>
                    {isData4 &&
                      isData4.map((row, index) => (
                        <tr
                          key={index}
                          className="margintop_add"
                          style={{ borderBottom: '1px solid gray' }}
                        >
                          <td>{row.cash_amount}</td>

                          <td>{row.bank_amount}</td>
                          <td>{row.cheque_amount}</td>

                          <td>{row.total}</td>
                        </tr>
                      ))}
                  </>
                )}
              </table>

              <p
                style={{
                  color: '#3C5FFE',
                  marginBottom: '1rem',
                  marginTop: '1rem',
                }}
              >
                Room Booking(आवास)
              </p>
              <table>
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray', fontSize: '14px' }}
                >
                  <th>Cash</th>
                  <th>Bank</th>
                  <th>Total</th>
                </tr>
                <tr style={{ borderBottom: '1px solid gray' }}>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              </table>

              <p
                style={{
                  color: '#808080',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                Guest In Room(यात्री संख्या)
              </p>
              <table>
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Gender</th>
                  <th>Quantity</th>
                </tr>
                <tr>
                  <td>Male</td>
                  <td>10</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <th>10</th>
                </tr>
              </table>
            </>
          )}
        </div>
      </div>

      <div className="save-div-btn">
        <button onClick={() => handlePrint()} className="save-div-btn-btn">
          Print
        </button>
        <button
          onClick={() => handleClose()}
          className="save-div-btn-btn-cancel"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default PrintAlladmin;
