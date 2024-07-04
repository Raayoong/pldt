import DataTable from "react-data-table-component";
import {useState, useEffect} from 'react';
import Select, {components} from 'react-select'
import { useNavigate } from 'react-router-dom';
import { transactRequestOrder,onhandList, inventoryTypeList } from "../App";

const RequestOrder = () => {
    // navigate
    const navigate = useNavigate();

    

    // states
    const [type, setType] = useState('');
    const [brand, setBrand] = useState('');
    const [ftTel, setFtTel] = useState('');
    const [oldModel, setOldModel] = useState('');
    const [oldSN, setOldSN] = useState('');
    const [newSN, setNewSN] = useState('');
    const [listOfBrand, setListOfBrand] = useState([]);
    const [listByType ,setListByType] = useState([]);

    
    const submitHandler = async (e)=> {
        e.preventDefault();
        try{
            await transactRequestOrder(ftTel, type, brand, oldModel, oldSN, newSN);
            setType("")
            setBrand("")
            setFtTel("")
            setOldModel("")
            setOldSN("")
            setNewSN("")
        }
        catch(error){
            // Place error here
        }
    } 

    
    const prevPage = ()=>{
        navigate(-1)
    }

    const onhand = async ()=> {
        try {
            await onhandList(brand,setListOfBrand);
        } 
        catch (error) {
            // Place error here
        }


    } 

    const inventoryType = async ()=> {
        try {
            await inventoryTypeList(type, setListByType)
        } catch (error) {
            
        }
    }  

const customStyles = {
    option: (styles, {isFocused}) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "white" : "white",
    };
  }
};
    

  
    useEffect(()=>{
        onhand();
        inventoryType();
        
    },[type, brand])

    return ( 
        <div className="w-full h-screen bg-slate-200 px-4 pt-[4rem]">
           
          
            <div>
                <form onSubmit={submitHandler} className="flex flex-col gap-4">
                   
                    <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Type</label>
                    <select onChange={(e)=>{
                        setType(e.target.value)
                    }} value={type} className={`${type ? 'bg-slate-300': ''} w-full`} name="" id="">
                    <option value=""></option>
                        <option value="ONU">Onu</option>
                        <option value="TELSET">Telset</option>
                        <option value="MESH">Mesh</option>
                        <option value="IPTV">IPTV</option>
                       
                    </select>
                </div>
                {type==="ONU" && 
                <>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Tel #</label>
                    <input onChange={(e)=>{
                        setFtTel(e.target.value)
                    }} value={ftTel} className={`${ftTel ? 'bg-slate-300':''} p-2 w-full`} type="number"  />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Old Model</label>
                    <input onChange={(e)=>{
                        setOldModel(e.target.value)
                    }} value={oldModel.toLocaleUpperCase()} className={`${oldModel ? 'bg-slate-300' : ''} p-2 w-full`} type="text"  />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Old SN</label>
                    <input onChange={(e)=>{
                        setOldSN(e.target.value)
                    }} value={oldSN.toLocaleUpperCase()} className={`${oldSN ? 'bg-slate-300':''} p-2 w-full`} type="text"  />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Brand</label>
                    <select  onChange={(e)=>{
                        setBrand(e.target.value)
                    }} value={brand}  className={`${brand ? 'bg-slate-300':''} w-full`} name="" id="">
                        <option value=""></option>
                      {
                        listByType.map(brand => (
                            <option key={brand.inventory_id} value={brand.brand}>{brand.brand}</option>
                        ))
                      }
                    </select>
                </div>
                {(brand!=='')  &&
                    <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">New SN</label>
                   
                    <Select
                    unstyled
                    onChange={(choice)=>{
                        setNewSN(choice.value)
                    }
                        
                        }
                 
                    className="w-full bg-slate-300"
                    styles={customStyles}
                     options={
                        
                       
                        
                        listOfBrand.map(onulist => (
                            
            {value: onulist.serial_no, label: onulist.serial_no}
        ))
                     }
                        isFocused
                     />
                </div>}
                
                </>
                    

                
                }  
                {type==="TELSET" &&
                    <>
                    <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Tel #</label>
                    <input onChange={(e)=>{
                        setFtTel(e.target.value)
                    }} value={ftTel} className={`${ftTel ? 'bg-slate-300':''} p-2 w-full`} type="number"  />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Old Model</label>
                    <input onChange={(e)=>{
                        setOldModel(e.target.value)
                    }} value={oldModel} className={`${oldModel ? 'bg-slate-300' : ''} p-2 w-full`} type="text"  />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Old SN</label>
                    <input onChange={(e)=>{
                        setOldSN(e.target.value)
                    }} value={oldSN} className={`${oldSN ? 'bg-slate-300':''} p-2 w-full`} type="text"  />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Brand</label>
                    <select  onChange={(e)=>{
                        setBrand(e.target.value)
                    }} value={brand}  className={`${brand ? 'bg-slate-300':''} w-full`} name="" id="">
                        <option value=""></option>
                       {
                        listByType.map(brand => (
                            <option key={brand.inventory_id} value={brand.brand}>{brand.brand}</option>
                        ))
                       }
                    </select>
                </div>
                {(brand==="UVTECH" || brand==="LAYADA" || brand==="FULRUBELL")  &&
                    <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">New SN</label>
                    <Select
                    unstyled
                    onChange={(choice)=>{
                        setNewSN(choice.value)
                    }}
                    className="w-full bg-slate-300"
                    styles={customStyles}
                     options={
                        
                       
                        
                        listOfBrand.map(onulist => (
                            
            {value: onulist.serial_no, label: onulist.serial_no}
        ))
                     }
                        isFocused
                     />
                </div>}
                
                    </>
                }
                {type==="MESH" &&
                    <>
                    <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Tel #</label>
                    <input onChange={(e)=>{
                        setFtTel(e.target.value)
                    }} value={ftTel} className={`${ftTel ? 'bg-slate-300':''} p-2 w-full`} type="number"  />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Old Model</label>
                    <input onChange={(e)=>{
                        setOldModel(e.target.value)
                    }} value={oldModel} className={`${oldModel ? 'bg-slate-300' : ''} p-2 w-full`} type="text"  />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Old SN</label>
                    <input onChange={(e)=>{
                        setOldSN(e.target.value)
                    }} value={oldSN} className={`${oldSN ? 'bg-slate-300':''} p-2 w-full`} type="text"  />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Brand</label>
                    <select  onChange={(e)=>{
                        setBrand(e.target.value)
                    }} value={brand}  className={`${brand ? 'bg-slate-300':''} w-full`} name="" id="">
                        <option value=""></option>
                       {
                        listByType.map(brand => (
                            <option key={brand.inventory_id} value={brand.brand}>{brand.brand}</option>
                        ))
                       }
                    </select>
                </div>
                {(brand!=="")  &&
                    <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">New SN</label>
                    <Select
                    unstyled
                    styles={customStyles}
                    onChange={(choice)=>{
                        setNewSN(choice.value)
                    }}
                    className="w-full bg-slate-300"
                    
                     options={
                        
                       
                        
                        listOfBrand.map(onulist => (
                            
            {value: onulist.serial_no, label: onulist.serial_no}
        ))
                     }
                        isFocused
                     />
                </div>
                
                }
                    </>
               
                }   
                {type==="IPTV" && 
                <>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Tel #</label>
                    <input onChange={(e)=>{
                        setFtTel(e.target.value)
                    }} value={ftTel} className={`${ftTel ? 'bg-slate-300':''} p-2 w-full`} type="number"  />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Old Model</label>
                    <input onChange={(e)=>{
                        setOldModel(e.target.value)
                    }} value={oldModel} className={`${oldModel ? 'bg-slate-300' : ''} p-2 w-full`} type="text"  />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Old SN</label>
                    <input onChange={(e)=>{
                        setOldSN(e.target.value)
                    }} value={oldSN} className={`${oldSN ? 'bg-slate-300':''} p-2 w-full`} type="text"  />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Brand</label>
                    <select  onChange={(e)=>{
                        setBrand(e.target.value)
                    }} value={brand}  className={`${brand ? 'bg-slate-300':''} w-full`} name="" id="">
                        <option value=""></option>
                       {
                        listByType.map(brand => (
                            <option key={brand.inventory_id} value={brand.brand}>{brand.brand}</option>
                        ))
                       }
                    </select>
                </div>
                
                
                {(brand!=="")  &&
                    <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">CCA NO.</label>
                    <Select
                    unstyled
                    onChange={(choice)=>{
                        setNewSN(choice.value)
                    }}
                    className="w-full bg-slate-300"
                    styles={customStyles}
                     options={
                        
                       
                        
                        listOfBrand.map(onulist => (
                            
            {value: onulist.serial_no, label: onulist.serial_no}
        ))
                     }
                        isFocused
                     />
                </div>
                
                }
                </>
                   
                
                }          

                <div className="flex justify-end gap-4">
                    
                    <button type="submit" className="bg-green-400 p-2 w-full">Submit</button>
                </div>
                </form>
                <button onClick={prevPage} className="bg-red-400 p-2 w-full mt-2">Back</button>
            </div>
        </div>
     );
}
 
export default RequestOrder;