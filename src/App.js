import { Outlet,BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/dashboard';
import FaultTickets from "./components/fault_tickets";
import ServiceOrder from "./components/service_order";
import Navigation from "./components/navigation";
import Inventory from "./components/inventory";
import RequestOrder from "./components/request_order";
import AddInventory from "./components/add_inventory";
import './App.css';
import ViewRO from "./components/view_ro";
import Data from "./components/data";
import {useState, useEffect, React, Button} from 'react';
import Swal from "sweetalert2";



// update request order
export const update_RequestOrder = async (status, id) => {
  

  const ro_status = {status} ;
  const response = await fetch(
    `https://pldt-backend.onrender.com/ft_request_order/update/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(ro_status),
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "*",
      },
    }
  );
  const json = await response.json();
  if (!response) {
    console.log(response.error);
  }  
};

// fetch request order list 
export const requestOrderList = async(setList)=>{
  
  const response = await fetch('https://pldt-backend.onrender.com/ft_request_order/ro_list');
     const json = await response.json();
    //  if reponse is not ok console the error
     if(!response){
         console.log(response.error)
     }
     setList(json);
}

// fetch list of inventory onhand
export const inventoryList = async (setListOfInventory) => {
  const response = await fetch("https://pldt-backend.onrender.com/inventory/onhand");
  try{
     const json = await response.json();
     setListOfInventory(json);
  }
  catch(error){
    // Place error here
    if(!response){
      console.log(response.error)
  }
  }

}

// add inventory 
export const newInventoryItem = async(brand, type, model, serial, onhand)=>{
  const Swal = require("sweetalert2");
  

try{
  
  

  // Check if no input
  if(brand==='' || type==='' || model==='' || serial==='' || onhand===''){
    Swal.fire({
      title: "Please insert details",
      text: `Please input required details`,
      icon: "error",
    });
  }
  
  if(brand!=='' && type!=='' && model!=='' && serial!=='' && onhand!==''){
    const input = {brand, type, model, serial, onhand};
  const response = await fetch('https://pldt-backend.onrender.com/inventory', {
method: "POST",
body: JSON.stringify(input),
headers: {
  "Content-type" : "application/json"
}
});
const json = await response.json();
if(brand!=='' && type!=='' && model!=='' && serial!=='' && onhand!=='' && json.errno===1062){
  Swal.fire({
    title: "Duplicate Serial No.",
    text: `${serial} Already been added. Please check!`,
    icon: "error",
  });
}
  
}
   
  }
 

catch(error){
  
}
}

export const transactRequestOrder = async(ftTel, type, brand, oldModel, oldSN, newSN) => {

  const input = {ftTel, type, brand, oldModel, oldSN, newSN};
  
            try{
              // Check if has input
              if(type!=="" && brand!=="" && ftTel!=="" && oldModel!=="" && oldSN!=="" && newSN!==""){
                const response = await fetch('https://pldt-backend.onrender.com/ft_request_order', {
                  method: 'POST',
                  body: JSON.stringify(input),
                  headers: {
                  'Content-type': 'application/json'
                  }
                })

                if(response){
                  await fetch('https://pldt-backend.onrender.com/inventory/update', {
                  method: 'PATCH',
                  headers: {
                      'Content-type': 'application/json'
                      }
              })
                }
                Swal.fire({
                  title: "Request Order Created",
                  text: `Your request order has been created. `,
                  icon: "success",
                });
                
              }
              else{
                Swal.fire({
                  title: "Error Creating Request Order",
                  text: `Your request order has been cancelled. Please review input details `,
                  icon: "error",
                });
              }

            }

            catch(error){
              // Place error here
            }
  
}

export const onhandList = async (brand,setListOfBrand)=> {
  try {
    const response = await fetch(`https://pldt-backend.onrender.com/inventory/${brand}`)
    const json = await response.json();
    
    if(!response){
      Swal.fire({
        title: "Server Disconnected",
        text: `Please check your connection`,
        icon: "error",
      });
    }
    setListOfBrand(json)
  } 
  catch (error) {
    
  }
}



export const inventoryTypeList = async (type,setListByType)=> {
  try {
    const response = await fetch(`https://pldt-backend.onrender.com/inventory/${type}/brands`);
    const json = await response.json();

    if(!response){
      Swal.fire({
        title: "Server Disconnected",
        text: `Please check your connection`,
        icon: "error",
      });
    }
    setListByType(json);
    

  } catch (error) {
    // Pass error here
  }
}

function App() {
  
  // use States
  const [list, setList] = useState([]);
  const [inventoryList , setInventoryList] = useState([]);




  return (
    <div className="App flex flex-col">

      
      <BrowserRouter>
      <Navigation/>
      
        <Routes>
          
            <Route path="/" element={<Dashboard/>}/>
            <Route path="fault_tickets" element={<FaultTickets/>}/>
            <Route path="service_order" element={<ServiceOrder/>}/>
            <Route path="inventory" element={<Inventory list={inventoryList}/>}/>
            <Route path="request_order" element={<RequestOrder/>}/>
            <Route path="add_inventory" element={<AddInventory/>} />
            <Route path="view_ro" element={<ViewRO list={list}/>}/>
          
          
            
        
        </Routes>
        <Outlet/>
      </BrowserRouter>
      
         
      
    </div>
  );
}

export default App;
