import { Form, Button, Select, Input, Table } from "antd"
import Layout from "../../layouts/Layout"
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import './index.css'
import axios from 'axios';
import Swal from 'sweetalert2'

const { Option } = Select
export default () => {

    const [display, setdisplay] = useState(false)
    const [emp, setemp] = useState([])





    return (
        <>
            <Layout>
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="d-flex flex-column h-100">
                                <h2 class="mb-1 pt-2 text-bold">Profile</h2>
                                <h5 class="font-weight-bolder">nom</h5>
                                <p class="mb-5">j.nom</p>
                                <h5 class="font-weight-bolder">prénom</h5>
                                <p class="mb-5">j.nom</p>
                            </div>
                        </div>
                        <div class="col-lg-5 ms-auto text-center mt-5 mt-lg-0">
                            <div class="bg-gradient-primary border-radius-lg h-100">
                                <img src="../assets/img/shapes/waves-white.svg" class="position-absolute h-100 w-50 top-0 d-lg-block d-none" alt="waves" />
                                <div class="position-relative d-flex align-items-center justify-content-center h-100">
                                    <img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                                </div>
                            </div>
                        </div>
                        <div>
                        
                                <h5 class="font-weight-bolder">email</h5>
                                <p class="mb-5">j.email</p>
                                <h5 class="font-weight-bolder">adresse</h5>
                                <p class="mb-5">j.nom</p>
                                <h5 class="font-weight-bolder">adresse</h5>
                                <p class="mb-5">adr</p>
                        </div>
                    </div>
                </div>    
                </Layout>
        </>
    )
}