import React, { useEffect, useState } from 'react'
import Bells from '../asset/Bells_Logo.png'
import axios from 'axios'
import '../components/dashboard.css'

const Dashboard = () => {
    const [isACtive, setIsActive] = useState(false)
    const [data, setData] = useState([])
    const [datafil, setDatafil] = useState([])
   
    const API_URL = 'https://bellsit.syncromsp.com/api/v1';
    const API_TOKEN = 'T5cade4510f721f91a-42bdff57ebbe3ea8cca4a389445db88f';
   
    const getData = async () => {
       try {
         const response = await axios.get(`${API_URL}/customer_assets`, {
           headers: { Authorization: `Bearer ${API_TOKEN}` },
           // params: {
           //   filter: JSON.stringify({
           //     // operating_system: 'Windows Server',
           //     // status: 'Offline',
           //     name: 'BITS-HV-ADTest',
           //   }),
           //   limit: 1 // Return only one server
           // }
         });
         const data = response.data.assets;
         console.log('29', data)
         setData(data)
       } catch (error) {
         console.error(error);
       }
    };
   
    useEffect(() => {
       const interval = setInterval(() => {
         getData();
       }, 60000);
       return () => clearInterval(interval);
     }, []);
   
    const handleActive = () => {
       setIsActive(!isACtive)
    }
   
    // Render your dashboard UI using the data state
    
   
 const fildata = data.filter(n => n.name === 'BITS-HV-ADTest').length
 console.log('47', fildata)

  return (
    <div className='main_container'>
        <div className='company_logo'>
            <img src={Bells} alt="Bells Logo" />
        </div>
       <div className='heading'>
       <div className=''>
            <h2 className='company_logo'>All Customers servers Status</h2>
            <p>This board shows current status of all servers that are being monitored.</p>
        </div>
       </div>
        <div className=''>
            <div className='sub_headig'>
                <h4>Customer</h4>
                <h4>server Name</h4>
                <h4>Status</h4>
            </div>
            <div className='sub_heading '>
                <h5>Bells it support </h5>
                <h5>    { isACtive? "BITS-HV-ADTEST" : "BITS-HV-ADTEST-offline"}</h5>
                <button className='status_button' onClick={handleActive}>{isACtive? "Online" : "Offline"}</button>
            </div>
            <div>
            <p className='heading'>{new Date().toLocaleString()} GMT+0100 (British Summer Time)</p>
            { !isACtive &&   <div className='sub-title2'>Total Number of Windows in offline state are { fildata}</div>}
       { isACtive &&
            <div className='sub-title3'>Total Number of Windows are online { 50-fildata}</div>}

            </div>
            
        </div>
    </div>
  )
}

export default Dashboard