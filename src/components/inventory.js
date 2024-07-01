import { useState, useEffect, } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";


const Inventory = () => {
    const [list, setList] = useState([]);

    // navigate
    const navigate = useNavigate();

    const goBack = ()=>{
        navigate(-1)
    }
    const inventoryList = async()=>{
        const response = await fetch("/inventory/onhand");
        const data = await response.json();

        if(!response){
            console.log(data.error);
        }
        setList(data);
        console.log(list);
    }

    useEffect(()=>{
        inventoryList();
    }, [])

    // data table columns
    const columns = [
    
        {
          name: "Brand",
          selector: (row) => row.brand,
          hide:'md'
        },
        {
          name: "Type",
          selector: (row) => row.type,
          sortable: true,
          hide: 'md'

        },
        {
          name: "Model",
          selector: (row) => row.model,
        },
        {
            name: "Serial No.",
            selector: (row) => row.serial_no,
          },
          {
            name: "Onhand",
            selector: (row) => row.onhand,
          },
      ];

    return ( 


    <div className="w-full relative h-screen flex flex-col bg-slate-200 pt-[4rem] px-4">
        <div className="flex justify-center gap-4 items-end my-2">
            <button onClick={goBack} className="bg-green-400 w-full p-2">Back</button>
            <Link className="bg-green-400 w-full p-2" to="/add_inventory">Add Inventory</Link>
         </div>
        <DataTable
        columns={columns}
          data={list}
          pagination
          fixedHeader
  fixedHeaderScrollHeight="1500px"
         />
         
    </div> );
}
 
export default Inventory;