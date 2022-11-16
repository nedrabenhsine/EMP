import { Form, Button, Select, Input, Table, Col, Row, DatePicker } from "antd";
import Layout from "../../layouts/Layout";
import { useEffect, useState } from "react";
// import "./index.css";
import axios from "axios";
import Swal from "sweetalert2";
import { BsPlus } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import jwt_decode from "jwt-decode";

const { Option } = Select;

const Remote = () => {
  const userToken = localStorage.getItem("token");
  var decoded = jwt_decode(userToken);
  const [leave, setleave] = useState([]);
  const [holidaytype, setholidaytype] = useState([]);
  console.log(leave);
  const iduser = leave[0];
  console.log(iduser);
  const [data, setData] = useState({
    titel: "",
    start_date: "",
    end_date: "",
    description: "",
    holidaytype: "",
    user: iduser,
  });

  const handleChange = (value) => {
    setData({ ...data, [value.id]: value.value });
  };
  const getall = () => {
    axios.get(`http://localhost:5000/telework/list`).then((res) => {
      res.data = res.data.filter((perm) => {
        console.log("leave", perm);
        if (perm.user.username === decoded.username) {
          return perm;
        }
      });
      // console.log("leave", res.data);

      setleave(res.data);
    });
  };
  const fetchAllholidaytype = () => {
    axios.get(`http://localhost:5000/holidaytype/list`).then((res) => {
      setholidaytype(res.data);
    });
  };
  const createLeave = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/holiday`, data);
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
    fetchAllholidaytype();
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
      key: "start_date",
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
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <i style={{ fontSize: "20px" }} class="las la-trash-alt"></i>
              <i
                data-bs-toggle="modal"
                data-bs-target="#exampleModal2"
                style={{ fontSize: "20px" }}
                class="las la-edit"
              ></i>
              <div
                class="modal fade"
                id="exampleModal2"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-xl">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5 ms-2" id="exampleModalLabel">
                        {" "}
                        Éditer les infos d'employé{" "}
                      </h1>
                      <button
                        type="button"
                        class="btn-close text-dark"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <Form wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}>
                        <Row style={{ padding: "10px" }}>
                          <Col span={12} style={{ "padding-right": "20px" }}>
                            <Form.Item
                              name="titel"
                              onChange={(e) => {
                                handleChange(e.target);
                              }}
                              label="titel"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your first name!",
                                },
                              ]}
                            >
                              <Input size="large" />
                            </Form.Item>
                            <Form.Item
                              name="lastname"
                              onChange={(e) => {
                                handleChange(e.target);
                              }}
                              label="Prénom"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your last name!",
                                },
                              ]}
                            >
                              <Input size="large" />
                            </Form.Item>
                            <Form.Item
                              name="username"
                              onChange={(e) => {
                                handleChange(e.target);
                              }}
                              label="Email"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your email!",
                                },
                              ]}
                            >
                              <Input size="large" />
                            </Form.Item>
                            <Form.Item
                              name="password"
                              onChange={(e) => {
                                handleChange(e.target);
                              }}
                              label="Mot de passe"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your passowrd!",
                                },
                              ]}
                            >
                              <Input type="password" size="large" />
                            </Form.Item>
                          </Col>
                          <Col span={12} style={{ "padding-right": "20px" }}>
                            <Form.Item
                              name="telephone"
                              onChange={(e) => {
                                handleChange(e.target);
                              }}
                              label="Téléphone"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your telephone!",
                                },
                              ]}
                            >
                              <Input size="large" />
                            </Form.Item>
                            <Form.Item
                              name="adress"
                              onChange={(e) => {
                                handleChange(e.target);
                              }}
                              label="Addresse"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your address!",
                                },
                              ]}
                            >
                              <Input size="large" />
                            </Form.Item>
                            <Form.Item
                              name="departement"
                              label="Départment"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your departement!",
                                },
                              ]}
                            >
                              <Select
                                id="departement"
                                placeholder="Sélectionner un department"
                                onChange={(value, obj) => {
                                  const key = parseInt(obj.key);
                                  console.log(key);
                                  handleChange({
                                    value: key,
                                    id: "departement",
                                  });
                                }}
                              >
                                {holidaytype.map((type, i) => (
                                  <Option key={i} value={type.name}>
                                    {type.name}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item>
                              <div
                                style={{
                                  display: "flex",
                                  "justify-content": "center",
                                  "margin-top": "50px",
                                }}
                              >
                                <Button
                                  size="large"
                                  onClick={(e) => PromiseNotify(e)}
                                  data-bs-dismiss="modal"
                                  type="primary"
                                  htmlType="submit"
                                >
                                  Enregistrer
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
            <h3 className="text-uppercase">Votre liste des télétravail</h3>
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
                      Nouveau demande de congé
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
                            name="start_date"
                            label="date de début"
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
                                  id: "start_date",
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
                            <DatePicker
                              size="large"
                              style={{ width: "420px" }}
                              onChange={(date, dateString) => (
                                console.log(dateString),
                                handleChange({
                                  value: dateString,
                                  id: "end_date",
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
                          <Form.Item
                            name="holidaytype"
                            label="Type de congé"
                            rules={[
                              {
                                required: true,
                                message: "Please input your holiday type!",
                              },
                            ]}
                          >
                            <Select
                              id="holidaytype"
                              placeholder="Sélectionner un Type"
                              onChange={(value, obj) => {
                                const objkey = obj.key + 1;
                                console.log(objkey, obj);
                                handleChange({
                                  value: objkey,
                                  id: "holidaytype",
                                });
                                handleChange({
                                  value: value,
                                  id: "titel",
                                });
                              }}
                            >
                              {holidaytype.map((type, i) => (
                                <Option key={i} value={type.name}>
                                  {type.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item>
                            <div
                              style={{
                                display: "flex",
                                "justify-content": "center",
                                "margin-top": "50px",
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
export default Remote;
