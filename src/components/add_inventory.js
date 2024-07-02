import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';


const AddInventory = () => {
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [onhand, setOnHand] = useState("");
  const [serial, setSerial] = useState("");
  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const successNotifRef = useRef(null)

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  const submitInventoryHandler = async(e)=>{
    e.preventDefault();

    if(type!=="" && brand!=="" && model!=="" && onhand!=="" && serial!==""){
        const input = {brand, type, model, serial, onhand};
        const response = await fetch('https://pldt-backend.onrender.com/inventory', {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type" : "application/json"
      }
    });
    const json = await response.json();
    if (!response) {
      console.error(response.error);
    }
    setSuccess(true)
    setTimeout(()=>{
       setSuccess(false)
    }, 5000)
    }
    else{
        console.log("Please input required details")
        setIsError(true)
        setTimeout(()=>{
            setIsError(false)
         }, 5000)
    }
    
    
  };

  useEffect(()=>{
    console.log(type)
    
  })

  return (
    <div className="w-full relative h-screen flex flex-col bg-slate-200 pt-[4rem] px-4">
       {success && 
        <div ref={successNotifRef} className="w-full bg-green-300 py-4">
                <p>Successfully inserted new inventory</p>
            </div>
       }
       {isError &&
        <div ref={successNotifRef} className="w-full bg-red-300 py-4">
                <p>Please fill in required details</p>
            </div>
       }
           
     
      
      
      <form onSubmit={submitInventoryHandler} className="flex flex-col gap-2 pt-4">
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
            value={brand}
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
            value={model}
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
            value={serial}
            className={`${serial!=='' ? 'bg-slate-300':''} p-2 w-full`}
            type="text"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <button type="submit" className="p-2 w-full bg-green-400">
            Submit
          </button>
          <button onClick={goBack} className="p-2 w-full bg-slate-400">
            Back
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default AddInventory;
