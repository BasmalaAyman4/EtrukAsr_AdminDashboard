import "./../new/new.scss";
import "./../new/neww.module.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import addImg from "../../assets/images/eae946efbbf74117a65d488206a09b63.png"
import { useParams } from 'react-router-dom';
import moment from "moment";
import { Carousel } from "react-responsive-carousel";
const UpdateAcution = () => {
    const updateId = useParams()
    const [formData, setFormData] = useState({
        titleAr: '',
        titleEn: '',
        img: '',
        descriptionEn: '',
        descriptionAr: '',
        endDate: '',
        endTime: '',
        statusAcution: '',
      
    })
   
    useEffect(() => {


        axios.get(`https://otrok.invoacdmy.com/api/user/mazad/show/${updateId.updateAcutionId}`,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('tokenA')}`,
                "Content-Type": "multipart/form-data"
      
            }
        })
            .then((response) => {
                setFormData({
                    titleAr: response.data.mazad.name_ar,
                    titleEn: response.data.mazad.name_en,
                    img: response.data.mazad.mazadimage,
                    descriptionEn: response.data.mazad.description_en,
                    descriptionAr: response.data.mazad.description_ar,
                    endDate: response.data.mazad.end_date,
                    endTime: response.data.mazad.end_time,
                    statusAcution: response.data.mazad.status
                })
                console.log(response.data.event, "event")
                console.log(formData, "text")
            }).catch((err) => { console.log(err) })

    }, [])

    const img = formData.img

    const UpdateAcution = new FormData();
    UpdateAcution.append("status", formData.statusAcution);

    const onChangeHandler = e => {

        setFormData({ ...formData, [e.target.name]: e.target.value })
        console.log(formData)
    }
    const onSubmitHandler = (e) => {
        const toastId = toast.loading("Please wait... ")
        setTimeout(() => { toast.dismiss(toastId); }, 1000);
        e.preventDefault()
        axios.post(`https://otrok.invoacdmy.com/api/dashboard/mazad/update/${updateId.updateAcutionId}`, UpdateAcution,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('tokenA')}`,
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
                <div className="top">
                    <h1>Accept Acution</h1>
                </div>
                <div className="bottom">
                    <div className="left mt-4">
                        <Carousel width={400} autoPlay interval="1000" transitionTime="1000" >
                            {img && img.map((imgSrc, index) => (<img height={365}  src={imgSrc.image} key={index} alt="" />))}
                        </Carousel>
                    </div>
                    <div className="right">
                        <form onSubmit={onSubmitHandler}>


                            <div className="formInput" >
                                <label>Name of Acution in Arabic</label>
                                <input
                                    name="titleAr"

                                    value={formData.titleAr}
                                />
                            </div>

                            <div className="formInput" >
                                <label> Name of Acution in English </label>
                                <input
                                    name="titleEn"
                                    value={formData.titleEn}

                                />
                            </div>
                            <div className="formInput" >
                                <label> Description of Acution in Arabic </label>
                                <input
                                    name="descriptionAr"
                                    value={formData.descriptionAr}

                                />
                            </div>

                            <div className="formInput" >
                                <label>Description of Acution in English</label>
                                <input
                                    name="descriptionEn"
                                    value={formData.descriptionEn}

                                />
                            </div>

                            <div className="formInput" >
                                <label>End Date</label>
                                <input
                                    type="date"
                                    name="endDate"

                                    value={formData.endDate}
                                />
                            </div>
                            <div className="formInput" >
                                <label>End Time</label>
                                <input
                                    type="time"
                                    name="endTime"

                                    value={formData.endTime}
                                />
                            </div>
                            {formData.statusAcution === 'finished'? 
                            <div className="formInput" >
                                <select
                                    className="input select"
                                    name="statusAcution"
                                    value={formData.statusAcution}
                                >
                                    <option value=''> status</option>
                                    <option value='finished'>finished</option>

                                </select>

                            </div>
                            :
                            <div className="formInput" >
                                <select
                                    className="input select"
                                    name="statusAcution"
                                    onChange={onChangeHandler}
                                    value={formData.statusAcution}
                                >
                                    <option value=''> status</option>                  
                                    <option value='pending'>pending</option>
                                    <option value='accepted'>accepted</option>
                                    <option value='rejected'>rejected</option>
                                

                                </select>

                            </div>
                         }

                            <button type="submit">
                                Send
                            </button>
                        </form>
                    </div>
                    <ToastContainer />
                </div>


            </div>

        </div >
    );
};

export default UpdateAcution;