import {
  Form,
  Button,
  Select,
  Input,
  Table,
  Col,
  Row,
  DatePicker,
  TimePicker,
} from "antd";
import Layout from "../../layouts/Layout";
import { useEffect, useState } from "react";
// import "./index.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { BsPlus } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

const { Option } = Select;

const Permissions = () => {
  const userToken = localStorage.getItem("token");
  var decoded = jwt_decode(userToken);
  const [leave, setleave] = useState([]);
  const [holidaytype, setholidaytype] = useState([]);
  console.log(leave);
  const [data, setData] = useState({
    titel: "",
    date: "",
    description: "",
    start_hour: "",
    end_hour: "",
    statut: "à traiter",
    user: decoded.id,
  });

  const handleChange = (value) => {
    setData({ ...data, [value.id]: value.value });
  };
  const getall = () => {
    axios.get(`http://localhost:5000/permession/list`).then((res) => {
      res.data = res.data.filter((perm) => {
        if (perm.user.username === decoded.username) {
          console.log("leave", perm);
          return perm;
        }
      });
      res.data = res.data.map((e) => {
        return {
          titel: e.titel,
          date: e.date,
          description: e.description,
          start_hour: e.start_hour,
          end_hour: e.end_hour,
          statut: e.statut,
          user: e.user,
          id: e.id,
        };
      });
      console.log("leave", res.data);
      setleave(res.data);
    });
  };

  const createLeave = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/permession`, data);
      return res;
    } catch (err) {
      console.log(err.response);
    }
  };
  const PromiseNotify = (e) =>
    toast.promise(createLeave(e), {
      loading: "loading...",
      success: "Successfully get data",
      error: "error occurs in data",
    });
  useEffect(() => {
    getall();
  }, []);
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "titre",
      dataIndex: "titel",
      key: "titel",
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "heur de début",
      dataIndex: "end_hour",
      key: "end_date",
    },
    {
      title: "heur de fin",
      dataIndex: "end_hour",
      key: "end_date",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "statut",
      dataIndex: "statut",
      key: "statut",
      render: (text, record) => {
        return (
          <>
            <div className="text-uppercase fw-bold">{text}</div>
          </>
        );
      },
    },
  ];
  console.log("data", data);
  return (
    <Layout>
      <Toaster position="top-right" />
      <div className="bg-light me-5 rounded p-5">
        <div class="container-fluid p-0">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 className="text-uppercase">Votre liste des autorisations</h3>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Nouveau demande
              <BsPlus size={28} />
            </button>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5 ms-2" id="exampleModalLabel">
                      Nouveau demande d'autorisation
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <Form wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}>
                      <Row style={{ padding: "10px" }}>
                        <Col style={{ "padding-right": "20px" }}>
                          <Form.Item
                            name="titel"
                            onChange={(e) => {
                              handleChange(e.target);
                            }}
                            label="Titre"
                            rules={[
                              {
                                required: true,
                                message: "Please input your Titre!",
                              },
                            ]}
                          >
                            <Input size="large" />
                          </Form.Item>
                          <Form.Item
                            name="date"
                            onChange={(e) => handleChange(e.target)}
                            label="date"
                            rules={[
                              {
                                required: true,
                                message: "Please input your telephone!",
                              },
                            ]}
                          >
                            <DatePicker
                              size="large"
                              style={{ width: "420px" }}
                              onChange={(date, dateString) => (
                                console.log(dateString),
                                handleChange({
                                  value: dateString,
                                  id: "date",
                                })
                              )}
                            />
                          </Form.Item>
                          <Form.Item
                            name="start_date"
                            label="date de début"
                            rules={[
                              {
                                required: true,
                                message: "Please input your telephone!",
                              },
                            ]}
                          >
                            <TimePicker
                              size="large"
                              style={{ width: "420px" }}
                              onChange={(date, dateString) => (
                                console.log(dateString),
                                handleChange({
                                  value: dateString,
                                  id: "start_hour",
                                })
                              )}
                            />
                          </Form.Item>
                          <Form.Item
                            name="end_date"
                            onChange={(e) => handleChange(e.target)}
                            label="date du fin"
                            rules={[
                              {
                                required: true,
                                message: "Please input your telephone!",
                              },
                            ]}
                          >
                            <TimePicker
                              size="large"
                              style={{ width: "420px" }}
                              onChange={(date, dateString) => (
                                console.log(dateString),
                                handleChange({
                                  value: dateString,
                                  id: "end_hour",
                                })
                              )}
                            />
                          </Form.Item>
                          <Form.Item
                            name="description"
                            onChange={(e) => {
                              handleChange(e.target);
                            }}
                            label="Description"
                            rules={[
                              {
                                required: true,
                                message: "Please input your description!",
                              },
                            ]}
                          >
                            <Input size="large" />
                          </Form.Item>
                          <Form.Item>
                            <div
                              style={{
                                display: "flex",
                                "justify-content": "center",
                                "margin-top": "20px",
                              }}
                            >
                              <Button
                                size="large"
                                onClick={(e) => PromiseNotify(e)}
                                data-bs-dismiss="modal"
                                type="primary"
                                htmlType="submit"
                              >
                                Ajouter
                              </Button>
                              <Button
                                data-bs-dismiss="modal"
                                style={{
                                  display: "flex",
                                  "margin-left": "50px",
                                }}
                                type="ghost"
                                size="large"
                              >
                                Annuler
                              </Button>
                            </div>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Table dataSource={leave} columns={columns} />
        </div>
      </div>
    </Layout>
  );
};
export default Permissions;
