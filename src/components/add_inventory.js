import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { newInventoryItem } from "../App";


const AddInventory = () => {
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [onhand, setOnHand] = useState("");
  const [serial, setSerial] = useState("");


  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }
  const submitNewItem = async (e)=> {
    e.preventDefault();
    try{
        await newInventoryItem(brand, type, model, serial, onhand);
        
      }
      
    
      
    catch(error){
      console.log(error)
    }
  }
  

  useEffect(()=>{
    console.log(type)
    
  })

  return (
    
    <div className="w-full relative h-screen flex flex-col bg-slate-200 pt-[4rem] px-4">

      
      <form onSubmit={submitNewItem} className="flex flex-col gap-2 pt-4">
        <div className="form-group flex w-full">
          <label
            className="bg-slate-800 text-slate-100 p-2 w-[150px]"
            htmlFor=""
          >
            Type
          </label>
          <select
            onChange={(e) => {
              setType(e.target.value);
            }}
            value={type}
            className={`${type!=='' ? 'bg-slate-300':''} w-full`}
            name=""
            id=""
          >
            <option value=""></option>
            <option value="ONU">ONU</option>
            <option value="TELSET">TELSET</option>
            <option value="MESH">MESH</option>
            <option value="IPTV">IPTV</option>
          </select>
        </div>
        <div className="form-group flex w-full">
          <label
            className="bg-slate-800 text-slate-100 p-2 w-[150px]"
            htmlFor=""
          >
            Brand
          </label>
          <input
            onChange={(e) => {
              setBrand(e.target.value);
            }}
            value={brand.toLocaleUpperCase()}
            className={`${brand!=='' ? 'bg-slate-300':''} p-2 w-full`}
            type="text"
          />
        </div>
        <div className="form-group flex w-full">
          <label
            className="bg-slate-800 text-slate-100 p-2 w-[150px]"
            htmlFor=""
          >
            Model
          </label>
          <input
            onChange={(e) => {
              setModel(e.target.value);
            }}
            value={model.toLocaleUpperCase()}
            className={`${model!=='' ? 'bg-slate-300': ''} p-2 w-full`}
            type="text"
          />
        </div>
        <div className="form-group flex w-full">
          <label
            className="bg-slate-800 text-slate-100 p-2 w-[150px]"
            htmlFor=""
          >
            Onhand
          </label>
          <input
            onChange={(e) => {
              setOnHand(e.target.value);
            }}
            value={onhand}
            className={`${onhand!=='' ? 'bg-slate-300':''} p-2 w-full`}
            type="number"
          />
        </div>
        <div className="form-group flex w-full">
          <label
            className="bg-slate-800 text-slate-100 p-2 w-[150px]"
            htmlFor=""
          >
            Serial No.
          </label>
          <input
            onChange={(e) => {
              setSerial(e.target.value);
            }}
            value={serial.toLocaleUpperCase()}
            className={`${serial!=='' ? 'bg-slate-300':''} p-2 w-full`}
            type="text"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <button type="submit" className="p-2 w-full bg-green-400">
            Submit
          </button>
          
          
        </div>
      </form>
      <button onClick={goBack} className="p-2 mt-2 w-full bg-slate-400">
            Back
          </button>
      
    </div>
  );
};

export default AddInventory;
