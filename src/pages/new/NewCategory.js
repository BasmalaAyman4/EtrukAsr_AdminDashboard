import "./new.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
const NewCategory = () => {
    const [formData, setFormData] = useState({
        titleAr: '',
        titleEn: '',

    })
    const onChangeHandler = e => {

        setFormData({ ...formData, [e.target.name]: e.target.value })
        console.log(formData, "form")
    }
    const addNewCase = new FormData();
    addNewCase.append("name_ar", formData.titleAr);
    addNewCase.append("name_en", formData.titleEn);
    const onSubmitHandler = (e) => {
        const toastId = toast.loading("...انتظر قليلا")
        setTimeout(() => { toast.dismiss(toastId); }, 1000);
        e.preventDefault()
        axios.post("http://otrok.invoacdmy.com/api/dashboard/category/store", addNewCase, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                toast.success(response.data.message)
                console.log(response)
            }
            ).catch((err) => { toast.error(err.response.data.message) })

    }
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top-case">
                    <h1>Add New Category</h1>
                </div>
                <Form className="bottom-case" onSubmit={onSubmitHandler}>
                    <div className="right-category">

                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Control name="titleAr" placeholder="نوع الحالة بالعربي" className="input input-category" onChange={onChangeHandler} value={formData.titleAr} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Control name="titleEn" placeholder="    نوع الحالة بالانجيزية" className="input input-category" onChange={onChangeHandler} value={formData.titleEn} />
                        </Form.Group>
                    </div>
                    <Button type="submit" className="btn">
                        اضافة الان
                    </Button>

                </Form>

            </div>
            <ToastContainer />
        </div >
    );
};

export default NewCategory;
