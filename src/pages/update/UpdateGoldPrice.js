import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'


const UpdateGoldPrice = () => {
  
    const [formData, setFormData] = useState({
        gold21: '',
        gold24: '',
     
    })
    

    const onChangeHandler = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })    
    }
    const UpdateGold = new FormData();
    UpdateGold.append("price_gold21", formData.gold21);
    UpdateGold.append("price_gold24", formData.gold24);
    const onSubmitHandler = (e) => {
        
     
        const toastId = toast.loading("Please wait... ")
        setTimeout(() => { toast.dismiss(toastId); }, 1000);
        e.preventDefault()
        axios.post(`https://otrok.invoacdmy.com/api/dashboard/zakat/update`,UpdateGold,{
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
         <h1>Update Gold price</h1>
       </div>
       <div className="bottom">
      
    <div className="right">
      <form onSubmit={onSubmitHandler}>


        <div className="formInput" >
          <label>Gole price 21</label>
          <input
            name="gold21"
            onChange={onChangeHandler}
            value={formData.gold21}
          />
        </div>

        <div className="formInput" >
          <label>Gole price 24 </label>
          <input
            name="gold24"
            value={formData.gold24}
            onChange={onChangeHandler}
          />
        </div>
       
       
        <button type="submit">
          Send
        </button>
      </form>
    </div>
    <ToastContainer />
  </div>


    </div>

</div >
  )
}

export default UpdateGoldPrice