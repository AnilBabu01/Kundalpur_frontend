import React, { useEffect } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './RoomBooking.css';
function RoomBooking({ setopendashboard }) {
  useEffect(() => {
    setopendashboard(true);
  }, []);
  return (
    <>
      <div className="dashboarddiv">
        <div>
          <div className="search-header">
            <div className="search-inner-div">
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Phone No" />
              <button>Search</button>
            </div>
            <div></div>
          </div>
          <hr style={{ color: '#e96d00' }} />
          <div className="add-btn-user">
            <button>+Add</button>
          </div>
          <div className="table-div-maain">
            <table className="dashborad-table">
              <tr>
                <th>Sn</th>
                <th>Title</th>
                <th>Name</th>
                <th>Contact No</th>
                <th>Email-Id</th>
                <th>Action</th>
              </tr>
              <tr>
                <td>1</td>
                <td>Mr</td>
                <td>Anil Babu</td>
                <td>7505786956</td>
                <td>anilb9850@gmail.com</td>
                <td>
                  <RemoveRedEyeIcon />
                  <DeleteForeverIcon />
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Mr</td>
                <td>Anil Babu</td>
                <td>7505786956</td>
                <td>anilb9850@gmail.com</td>
                <td>
                  <RemoveRedEyeIcon />
                  <DeleteForeverIcon />
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Mr</td>
                <td>Anil Babu</td>
                <td>7505786956</td>
                <td>anilb9850@gmail.com</td>
                <td>
                  <RemoveRedEyeIcon /> <DeleteForeverIcon />
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Mr</td>
                <td>Anil Babu</td>
                <td>7505786956</td>
                <td>anilb9850@gmail.com</td>
                <td>
                  <RemoveRedEyeIcon /> <DeleteForeverIcon />
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Mr</td>
                <td>Anil Babu</td>
                <td>7505786956</td>
                <td>anilb9850@gmail.com</td>
                <td>
                  <RemoveRedEyeIcon /> <DeleteForeverIcon />
                </td>
              </tr>{' '}
              <tr>
                <td>1</td>
                <td>Mr</td>
                <td>Anil Babu</td>
                <td>7505786956</td>
                <td>anilb9850@gmail.com</td>
                <td>
                  <RemoveRedEyeIcon />
                  <DeleteForeverIcon />
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Mr</td>
                <td>Anil Babu</td>
                <td>7505786956</td>
                <td>anilb9850@gmail.com</td>
                <td>
                  <RemoveRedEyeIcon /> <DeleteForeverIcon />
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Mr</td>
                <td>Anil Babu</td>
                <td>7505786956</td>
                <td>anilb9850@gmail.com</td>
                <td>
                  <RemoveRedEyeIcon /> <DeleteForeverIcon />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomBooking;
