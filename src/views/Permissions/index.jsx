import { Form, Button, Select, Input, Table, DatePicker } from "antd"
import Layout from "../../layouts/Layout"
import { PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import './index.css'
import axios from "axios";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
const { Option } = Select
export default () => {
    return (
        <>
            <Layout>
                <div>
                    <h3>hey there</h3>
                </div>
            </Layout>
        </>
    )
}