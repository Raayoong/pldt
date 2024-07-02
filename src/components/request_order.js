import DataTable from "react-data-table-component";
import {useState, useEffect} from 'react';
import Select, {components} from 'react-select'
import { useNavigate } from 'react-router-dom';

const RequestOrder = () => {
    // navigate
    const navigate = useNavigate();

    // states
    const [type, setType] = useState('');
    const [brand, setBrand] = useState('');
    const [isOnuList, setIsOnuList] = useState([]);
    const [ftTel, setFtTel] = useState('');
    const [oldModel, setOldModel] = useState('');
    const [oldSN, setOldSN] = useState('');
    const [newSN, setNewSN] = useState('');
    const [brandList, setBrandList] = useState([]);
    const [notifSuccess, setNotifSuccess] = useState(false);
    const [notifError, setNotifError] = useState(false)

    const submitROHandler = async(e)=>{
        e.preventDefault();
        if(type!=="" && brand!=="" && ftTel!=="" && oldModel!=="" && oldSN!=="" && newSN!==""){
            const RO_input = {ftTel, type, brand, oldModel, oldSN, newSN};
        const response = await fetch('https://pldt-backend.onrender.com/ft_request_order', {
            method: 'POST',
            body: JSON.stringify(RO_input),
            headers: {
            'Content-type': 'application/json'
            }
        })
        const data = await response.json();
        // if response is OK
        if(response){
            console.log(data)
            // then update inventory table when serial is matched
            await fetch('https://pldt-backend.onrender.com/inventory/update', {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                    }
            })
    
            setType("")
            setBrand("")
            setFtTel("")
            setOldModel("")
            setOldSN("")
            setNewSN("")
            setNotifSuccess(true);
            setTimeout(()=> {
                setNotifSuccess(false)
            }, 5000)
        }
        else{
            console.log("error");
        }
        }
        else{
            setNotifError(true);
            setTimeout(()=> {
                setNotifError(false)
            }, 5000)
        }
        
    } 
    const prevPage = ()=>{
        navigate(-1)
    }
    const onuList = async()=>{
        const response = await fetch(`https://pldt-backend.onrender.com/inventory/${brand}`)
        const json = await response.json();

        if(!response){
            console.log("error")
        }
        setIsOnuList(json)

    }
    const onuBrandList = async () => {
        const response = await fetch(`https://pldt-backend.onrender.com/inventory/${type}/brands`);
        const json = await response.json();
    
        if (!response.ok) {
          console.error(response.error);
        }
        setBrandList(json);

      };

    const options = 
        
        isOnuList.map(onulist => (
            {value: onulist.serial_no, label: onulist.serial_no}
        )
           
        )
    
  
    useEffect(()=>{
        console.table(brandList )
        console.log("Type:", type)
        console.table(isOnuList)
        // onuList();
        onuBrandList();
        onuList();
       console.log(newSN)

    },[type, brand])

    return ( 
        <div className="w-full h-screen bg-slate-200 px-4 pt-[4rem]">
           
            {notifError &&
            <div className="p-4 mb-2 bg-red-400">
                <p>Please fill all required details</p>
            </div>

            }
            {notifSuccess && 
                <div className="p-4 mb-2 bg-green-400">
                <p>Request Order Submitted</p>
            </div>

            }
            <div>
                <form onSubmit={submitROHandler} className="flex flex-col gap-4">
                   
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
                    }} value={oldModel} className={`${oldModel ? 'bg-slate-300' : ''} p-2 w-full`} type="text"  />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Old SN</label>
                    <input onChange={(e)=>{
                        setOldSN(e.target.value)
                    }} value={oldSN} className={`${oldSN ? 'bg-slate-300':''} p-2 w-full`} type="number"  />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Brand</label>
                    <select  onChange={(e)=>{
                        setBrand(e.target.value)
                    }} value={brand}  className={`${brand ? 'bg-slate-300':''} w-full`} name="" id="">
                        <option value=""></option>
                      {
                        brandList.map(brand => (
                            <option value={brand.brand}>{brand.brand}</option>
                        ))
                      }
                    </select>
                </div>
                {(brand==="HUAWEI" || brand==="ZTE" || brand==="FIBERHOME")  &&
                    <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">New SN</label>
                    {/* <select onChange={(e)=>{
                        setNewSN(e.target.value)
                    }} value={newSN} className={`${newSN ? 'bg-slate-300': ''} w-full`} name="" id="">
                        <option value=""></option>
                      {
                        isOnuList.map(onulist => (
                            <option value={onulist.serial_no}>{onulist.model} - {onulist.serial_no}</option>
                        ))
                      }
                    </select> */}
                    <Select
                    unstyled
                    onChange={(choice)=>{
                        setNewSN(choice.value)
                    }
                        
                        }
                 
                    className="w-full bg-slate-300"
                    classNamePrefix="bg-slate-100"
                     options={
                        
                       
                        
                        isOnuList.map(onulist => (
                            
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
                    }} value={oldSN} className={`${oldSN ? 'bg-slate-300':''} p-2 w-full`} type="number"  />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Brand</label>
                    <select  onChange={(e)=>{
                        setBrand(e.target.value)
                    }} value={brand}  className={`${brand ? 'bg-slate-300':''} w-full`} name="" id="">
                        <option value=""></option>
                       {
                        brandList.map(brand => (
                            <option value={brand.brand}>{brand.brand}</option>
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
                    classNamePrefix="bg-slate-100"
                     options={
                        
                       
                        
                        isOnuList.map(onulist => (
                            
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
                    }} value={oldSN} className={`${oldSN ? 'bg-slate-300':''} p-2 w-full`} type="number"  />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Brand</label>
                    <select  onChange={(e)=>{
                        setBrand(e.target.value)
                    }} value={brand}  className={`${brand ? 'bg-slate-300':''} w-full`} name="" id="">
                        <option value=""></option>
                       {
                        brandList.map(brand => (
                            <option value={brand.brand}>{brand.brand}</option>
                        ))
                       }
                    </select>
                </div>
                {(brand!=="")  &&
                    <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">New SN</label>
                    <Select
                    unstyled
                    onChange={(choice)=>{
                        setNewSN(choice.value)
                    }}
                    className="w-full bg-slate-300"
                    classNamePrefix="bg-slate-100"
                     options={
                        
                       
                        
                        isOnuList.map(onulist => (
                            
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
                    }} value={oldSN} className={`${oldSN ? 'bg-slate-300':''} p-2 w-full`} type="number"  />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[150px]" htmlFor="">Brand</label>
                    <select  onChange={(e)=>{
                        setBrand(e.target.value)
                    }} value={brand}  className={`${brand ? 'bg-slate-300':''} w-full`} name="" id="">
                        <option value=""></option>
                       {
                        brandList.map(brand => (
                            <option value={brand.brand}>{brand.brand}</option>
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
                    classNamePrefix="bg-slate-100"
                     options={
                        
                       
                        
                        isOnuList.map(onulist => (
                            
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
                    <button onClick={prevPage} className="bg-red-400 p-2">Back</button>
                    <button type="submit" className="bg-green-400 p-2">Submit</button>
                </div>
                </form>
            </div>
        </div>
     );
}
 
export default RequestOrder;