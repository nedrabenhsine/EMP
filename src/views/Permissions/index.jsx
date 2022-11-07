import { Form, Button, Select, Input, Table, Col, Row } from "antd";
import Layout from "../../layouts/Layout";
import { useEffect, useState } from "react";
// import "./index.css";
import axios from "axios";
import Swal from "sweetalert2";
import { BsPlus } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

const { Option } = Select;

const Permissions = () => {
  const [emp, setemp] = useState([]);
  const [departments, setdepartments] = useState([]);
  const [data, setData] = useState({
    firstname: "",
    username: "",
    lastname: "",
    password: "",
    adress: "",
    telephone: "",
    departement: 0,
    role: 2,
  });

  const handleChange = (value) => {
    setData({ ...data, [value.id]: value.value });
  };

  const getall = () => {
    axios.get(`http://localhost:5000/users/list`).then((res) => {
      // setemp(res.data);

      res.data = res.data.map((e) => {
        return {
          departement: e.departement.name,
          firstname: e.firstname,
          username: e.username,
          id: e.id,
          email: e.email,
          telephone: e.telephone,
          adress: e.adress,
        };
      });

      setemp(res.data);
    });
  };
  const fetchAlldepartments = () => {
    axios.get(`http://localhost:5000/department/list`).then((res) => {
      console.log(res.data);
      setdepartments(res.data);
    });
  };
  const onDelete = (id) => {
    Swal.fire({
      title: "vous etes sure ?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "Attention",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/users/${id}`)
          .then((res) => {
            getall();
          })
          .catch((err) => {
            console.log(err);
          });

        Swal.fire("Supprimé !", " Votre employes a été supprimé.", "Succès");
      }
    });
  };
  const createEmp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/users`, data);
      return res;
    } catch (err) {
      console.log(err.response);
    }
  };
  const PromiseNotify = (e) =>
    toast.promise(createEmp(e), {
      loading: "loading...",
      success: "Successfully get data",
      error: "error occurs in data",
    });
  useEffect(() => {
    getall();
    fetchAlldepartments();
  }, []);
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nom",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Prénom",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Addresse",
      dataIndex: "adress",
      key: "adress",
    },
    {
      title: "Département",
      dataIndex: "departement",
      key: "departement",
    },
    {
      title: "telephone",
      dataIndex: "telephone",
      key: "telephone",
    },
    {
      title: "actions",
      dataIndex: "address",
      key: "address",
      render: (text, record) => {
        console.log("record", record);
        return (
          <>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <i
                style={{ fontSize: "20px" }}
                class="las la-trash-alt"
                onClick={() => onDelete(record.id)}
              ></i>
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
                              name="firstname"
                              onChange={(e) => {
                                handleChange(e.target);
                              }}
                              label="firstname"
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
                                {departments.map((department, i) => (
                                  <Option key={i} value={department.name}>
                                    {department.name}
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
  return (
    <Layout>
      <Toaster position="top-right" />
      <div className="bg-light me-5 rounded p-5">
        <div class="container-fluid">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 className="text-uppercase">Employers</h3>
            <button
              type="button"
              className="btn btn-primary p-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              ajouter employé
              <BsPlus size={28} />
            </button>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5 ms-2" id="exampleModalLabel">
                      {" "}
                      Ajouter nouveau employé{" "}
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
                        <Col span={12} style={{ "padding-right": "20px" }}>
                          <Form.Item
                            name="firstname"
                            onChange={(e) => {
                              handleChange(e.target);
                            }}
                            label="firstname"
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
                                handleChange({ value: key, id: "departement" });
                              }}
                            >
                              {departments.map((department, i) => (
                                <Option key={i} value={department.name}>
                                  {department.name}
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
          <Table dataSource={emp} columns={columns} />
        </div>
      </div>
    </Layout>
  );
};
export default Permissions;
