import { useNavigate } from 'react-router-dom';
import {useState, useEffect, React, Button} from 'react';
import 'react-data-table-component-extensions/dist/index.css';
import CsvDownloader from 'react-csv-downloader';
import { Modal } from "react-responsive-modal";



const ViewRO = () => {
    const navigate = useNavigate();
   

    // states 
    const [list, setList] = useState([])
    const [IsOpen, setIsOpen] = useState(false)
    const [id, setId] = useState(null)
    const [status, setStatus] = useState(0)
    const prevPage = ()=>{
        navigate(-1)
    }

    // fetch data 
    const ft_RoList = async() => {
        const response = await fetch('https://pldt-backend.onrender.com/ft_request_order/ro_list');
        const json = await response.json();

        if(!response){
            console.log(response.error)
        }
        setList(json);
        console.log(response)
      
    }

   const updateStatus = async(e) => {
    e.preventDefault();
    const ro_status = {status}
    const response = await fetch(`https://pldt-backend.onrender.com/ft_request_order/update/${id}`,{
      method: 'PATCH',
      body: JSON.stringify(ro_status),
      headers: {
        "access-control-allow-origin": "*",
        'Content-type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': '*',
      }
    
    })
    const json = await response.json();
    if(!response){
      console.log(response.error)
    }
    console.log(json)
 
    ft_RoList();
    setIsOpen(false)
    


    
   }

   const successModal = ()=>{
    <>

    </>
   }

    // use Effect to render once 
    useEffect(()=>{
        ft_RoList();
        
    }, [])

  //  open modal
  // const openModal = (e) => {
  //     setId(e.target.value)
  //     console.log(id)
  // }

    // data table
    const columns = [
        {
            id: 'old_model',
            displayName: "Model of Recovery",
            
            
            
          },
          {
            id: 'old_sn',
            displayName: "Serial of Recovery",
            
            
          },
          {
            id: 'ft_telno',
            displayName: "Tel #",
            
            
          },
          {
            id: 'new_sn',
            displayName: "Serial of Used Item",
            
            
          },
        
        
      ];

    return ( 
        <div className='w-full relative flex flex-col bg-slate-200 pt-[3.5rem] px-4 h-screen overflow-hidden'>
           <div className='flex justify-between pb-2 fixed w-full left-0 bg-slate-200'>
           <button onClick={prevPage} className='p-2 flex items-center gap-1 font-semibold'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg>
Back</button>
           <CsvDownloader
            filename='Request_Order'
            extension='.csv'
            columns={columns}
            datas={list}
           
            >
  <button className='p-2 flex items-center gap-1 text-blue-500 font-semibold'>Download CSV<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
</svg>
</button>
</CsvDownloader>
           </div>
           
            <ul className='cardlist my-12'>
              {
                list.map(data => (
                  <li className=' bg-slate-50 mb-2 rounded-lg flex justify-between p-2' onClick={(e)=>{
                    e.preventDefault();
                      setId(data.ro_id);
                      setIsOpen(true)
                      
                  }} value={data.ro_id}>
                      <div className='flex flex-col text-sm p-2 text-left'>
                      <span className='font-semibold'>Tel #: {data.ft_telno}</span>
                      <span>Old Model: {data.old_model}</span>
                      <span>Old SN: {data.old_sn}</span>
                      <span>New SN: {data.new_sn}</span>
                      </div>
                      <div className='flex items-center'>
                      
                        
                          <span className={` p-1 rounded-lg ${data.status===1 ? 'bg-green-500':data.status===0 ? 'bg-yellow-400':''}`}>{data.status===1 ? 'Completed':data.status===0 ? 'Pending':''}</span>
                        
                      
                        
                        
                      
                       
                      </div>
                     
                   
                  </li>
                ))
              }
            </ul>
            
            <div className='fixed left-0 bottom-0 w-full'>
               
            </div>
            <Modal
            open={IsOpen}
            onClose={()=>{
              setIsOpen(false)
            }}
            center
            
            >
               
              
                <div className='mt-6 flex flex-col items-center'>
                <h1 className='font-semibold mb-4'>Set Status</h1>
                
                <form  onSubmit={updateStatus} className='flex  mx-8 gap-4'>
                <select className='bg-slate-200 w-full p-2 rounded-lg' onChange={(e)=>{
                  setStatus(e.target.value)
                  console.log(status)
                  
                }} value={status}>
                    <option value="">Select Status</option>
                    <option value="1">Completed</option>
                    <option value="0">Pending</option>
                </select>
                <input type="number" value={id} readOnly hidden/>
                  <button className='bg-blue-500 p-1 text-slate-50 rounded-lg font-semibold' type='submit'>Submit</button>
                </form>
                </div>
              
          </Modal>
        </div>
       
     );
}
 
export default ViewRO;