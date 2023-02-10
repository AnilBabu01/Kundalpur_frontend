import React, { useEffect } from 'react';
import './TariffsandPolicies.css';

function TariffsandPolicies({ setshowRoomOptions }) {
  useEffect(() => {
    setshowRoomOptions(true);
  }, []);
  return (
    <>
      <div className="main_room_availabilty">
        <div className="room_home_main_supper">
          <div className="room_home_main">
            <div className="room_home_main_overlay">
              <div>
                <h2 className="font_text_color">
                  Fresh, quiet and <br /> peaceful Kundalpur Dharamshala
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="form_div_absolute">
          <p>Online Reservation</p>
          <form className="form_div_absolute_form">
            <div className="input_div_room_main">
              <div className="input_div_room">
                <label>Select Place of Stay</label>
                <input type="text" placeholder="Select" />
              </div>
              <div className="input_div_room">
                <label>Departure Date </label>
                <input type="date" />
              </div>
            </div>
            <div className="input_div_room_main">
              <div className="input_div_room">
                <label>Arrival Date </label>
                <input type="date" />
              </div>
              <div className="input_div_room">
                <label>Departure Time </label>
                <input type="time" />
              </div>
            </div>
            <div className="input_div_room_main">
              <div className="input_div_room">
                <label>Arrival Time </label>
                <input type="time" />
              </div>
              <button>Check Availability</button>
            </div>
          </form>
        </div>
      </div>
      <div className="room_book_card_form_main">
        <p>Tariffs & Policies</p>
      </div>
      <div className="main_table_traffs">
        <div className="main_table_traffs_innear">
          <table>
            <tr className="head_table_trafic">
              <th>Dharamshala</th>
              <th>Room Type</th>
              <th>Facilities</th>
              <th>Total Rooms</th>
              <th>Online Rooms</th>
              <th>Facility Charge (Rs.)</th>
            </tr>
            <tr>
              <td>Vardhman Dharmshala</td>
              <td>A.C.(Ground Floor, 2-Bed room)</td>
              <td>A.C, Geyser,Double Bed room, Room Heater, Attach Lat-Bath</td>
              <td>19 rooms</td>
              <td>10 rooms</td>
              <td>₹800 per room</td>
            </tr>
            <tr>
              <td>Vardhman Dharmshala</td>
              <td>A.C.(Ground Floor, 2-Bed room)</td>
              <td>A.C, Geyser,Double Bed room, Room Heater, Attach Lat-Bath</td>
              <td>19 rooms</td>
              <td>10 rooms</td>
              <td>₹800 per room</td>
            </tr>
            <tr>
              <td>Vardhman Dharmshala</td>
              <td>A.C.(Ground Floor, 2-Bed room)</td>
              <td>A.C, Geyser,Double Bed room, Room Heater, Attach Lat-Bath</td>
              <td>19 rooms</td>
              <td>10 rooms</td>
              <td>₹800 per room</td>
            </tr>
            <tr>
              <td>Vardhman Dharmshala</td>
              <td>A.C.(Ground Floor, 2-Bed room)</td>
              <td>A.C, Geyser,Double Bed room, Room Heater, Attach Lat-Bath</td>
              <td>19 rooms</td>
              <td>10 rooms</td>
              <td>₹800 per room</td>
            </tr>
            <tr>
              <td>Vardhman Dharmshala</td>
              <td>A.C.(Ground Floor, 2-Bed room)</td>
              <td>A.C, Geyser,Double Bed room, Room Heater, Attach Lat-Bath</td>
              <td>19 rooms</td>
              <td>10 rooms</td>
              <td>₹800 per room</td>
            </tr>
            <tr>
              <td>Vardhman Dharmshala</td>
              <td>A.C.(Ground Floor, 2-Bed room)</td>
              <td>A.C, Geyser,Double Bed room, Room Heater, Attach Lat-Bath</td>
              <td>19 rooms</td>
              <td>10 rooms</td>
              <td>₹800 per room</td>
            </tr>
            <tr>
              <td>Vardhman Dharmshala</td>
              <td>A.C.(Ground Floor, 2-Bed room)</td>
              <td>A.C, Geyser,Double Bed room, Room Heater, Attach Lat-Bath</td>
              <td>19 rooms</td>
              <td>10 rooms</td>
              <td>₹800 per room</td>
            </tr>
            <tr>
              <td>Vardhman Dharmshala</td>
              <td>A.C.(Ground Floor, 2-Bed room)</td>
              <td>A.C, Geyser,Double Bed room, Room Heater, Attach Lat-Bath</td>
              <td>19 rooms</td>
              <td>10 rooms</td>
              <td>₹800 per room</td>
            </tr>
            <tr>
              <td>Vardhman Dharmshala</td>
              <td>A.C.(Ground Floor, 2-Bed room)</td>
              <td>A.C, Geyser,Double Bed room, Room Heater, Attach Lat-Bath</td>
              <td>19 rooms</td>
              <td>10 rooms</td>
              <td>₹800 per room</td>
            </tr>
          </table>
        </div>
      </div>

      <div className="extra_text_div">
        <p className="headInf_text">Cancellation Policy:</p>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            After login then my booking you can cancel your booking and you will
            get refund on the same way as you make payment online as per
            cancellation policy.
          </span>
        </li>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            Cancellation Charges are 25% of one day Facility Charge (Suvidha
            Shulka) Before 48 HRS of arrival time and 50% of one day Facility
            Charge till intended time of arrival. There will not be refund if
            arrival date and time has been past.
          </span>
        </li>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            Cancellation will be done by user from his/her My Account (Booking
            History Page).
          </span>
        </li>
      </div>

      <div className="extra_text_div">
        <p className="headInf_text">IMPORTANT :</p>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            Only 50% of Total Rooms are available for online booking rest 50%
            will be allotted on "First Come - First Serve" basis at Shri
            Mahaveer Ji.
          </span>
        </li>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            Online booking is only confirmed when booking status is "Booked".
            "Payment Not Made" Booking status means booking is NOT made.
          </span>
        </li>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            Rooms remaining vacant after online booking will be allotted on
            "First Come - First Serve" basis.
          </span>
        </li>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            This booking will only be valid along with an ID Proof in original.
            If without ID Proof the room will not be allotted.
          </span>
        </li>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            Valid IDs to be brought at the time of allotment of room :- Voter
            Identity Card / Passport / PAN Card / Driving License / Photo ID
            card issued by Central / State Govt. / Student Identity Card with
            photograph issued by recognized School or College for their students
            / Nationalized Bank Passbook with photograph /Credit Cards issued by
            Banks with laminated photograph.
          </span>
        </li>

        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            General rules/ Information for e-booking have to be studied by the
            pilgrim for cancellation & refund.
          </span>
        </li>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            Booking can only be done 48 hrs. prior to the intended time of
            arrival.
          </span>
        </li>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            The accommodation booked is not transferable and is valid only if
            one of the ID card noted above is presented.
          </span>
        </li>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            e-Room Booking cancellations are available through
            www.mahaveerji.org by the user till intended time of arrival.
          </span>
        </li>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            Extra mattress is available at extra charge but bed are not avilable
            with extra mattress.
          </span>
        </li>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            If some body booked hall and less pilgrims are staying in the hall
            as per the capacity of hall then management has right to allocate
            remaining beds to other pilgrims.
          </span>
        </li>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            While vacating the room please deposit the keys to incharge and
            obtain refund of security deposit if any from reception (Swagat
            Kaksha) against extra materials if any.
          </span>
        </li>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            Pilgrims are advised to observe Kshetra's religious practices.
            Please switch off the lights, water supply if not in use.
          </span>
        </li>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            Do not use Gas in super deluxe or A. C. rooms.
          </span>
        </li>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            You can submit your money (If more than Rs. 500) and your jewellery
            to cashier.
          </span>
        </li>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            Please give your valuable suggestions at reception.
          </span>
        </li>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            Please use your own key-lock.
          </span>
        </li>
        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            Arrival and Departure time are shown in 24 hour clock.
          </span>
        </li>

        <li className="add_mb_text1">
          <span className="headInf_text_weight">
            If you have any technical problem in e-Room Booking kindly contact
            at kundalpurdharamshala@gmail.com .
          </span>
        </li>
      </div>
    </>
  );
}

export default TariffsandPolicies;
