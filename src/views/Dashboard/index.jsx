import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Calendar, Badge, Table } from "antd";
import Layout from "../../layouts/Layout";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import jwt_decode from "jwt-decode";

const Calender = () => {
  const [congés, setcongés] = useState([]);
  const [permession, setpermession] = useState([]);
  const [remotes, setremotes] = useState([]);
  const userToken = localStorage.getItem("token");
  var decoded = jwt_decode(userToken);
  console.log("dash", decoded);
  const dumdata = [
    {
      id: "2",
      title: "All-day event 11",
      start: "2022-11-18",
      end: "2022-11-19",
      backgroundcolor: "#clclcl",
    },
    {
      id: "1",
      title: "Timed event 111",
      start: "2022-11-21",
      end: "2022-11-23",
      backgroundcolor: "#clclcl",
    },
  ];
  const getData = () => {
    axios.get(`http://localhost:5000/holiday/list`).then((res) => {
      res.data = res.data.filter((e) => {
        console.log("decoded", decoded);
        if (e.statut === "accepté" && e.user.firstname === decoded.firstname) {
          return {
            id: e.id,
            title: e.holidaytype.name + ", " + e.user.firstname,
            start: e.start_date,
            end: e.end_date,
            backgroundcolor: "#clclcl",
          };
        }
      });
      res.data = res.data.map((e) => {
        return {
          id: e.id,
          title: e.holidaytype.name + ", " + e.user.firstname,
          start: e.start_date,
          end: e.end_date,
          backgroundcolor: "#clclcl",
        };
      });
      setcongés(res.data);
    });
    axios.get(`http://localhost:5000/permession/list`).then((res) => {
      res.data = res.data.map((e) => {
        return {
          titel: e.titel,
          date: e.date,
          id: e.id,
          description: e.description,
          start_hour: e.start_hour,
          end_hour: e.end_hour,
          statut: e.statut,
          user: e.user.firstname,
        };
      });
      setpermession(res.data);
    });
    axios.get(`http://localhost:5000/telework/list`).then((res) => {
      res.data = res.data.map((e) => {
        return {
          titel: e.titel,
          date: e.date,
          id: e.id,
          description: e.description,
          statut: e.statut,
          user: e.user.firstname,
        };
      });
      setremotes(res.data);
    });
  };
  // let x = congés.concat(permession);
  // console.log("x", x);
  // let y = x.concat(remotes);
  // console.log("y", y);
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Layout>
        <div className="bg-light me-5 rounded p-5">
          <div class="container-fluid">
            <div
              style={{ display: "flex", "justify-content": "space-between" }}
            >
              <h3 className="text-uppercase">Aperçu </h3>
            </div>
          </div>
          <div style={{ padding: "20px" }}>
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                // listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              events={congés}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Calender;
