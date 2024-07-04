import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { inventoryList } from "../App";


const Inventory = (props) => {
  // pass the list of array from app.js
  // const list = props.list;
  const [listOfInventory, setListOfInventory] = useState([]);
  // navigate
  const navigate = useNavigate();

  const list = async() => {
    try{
      await inventoryList(setListOfInventory);

    }
    catch(error){
      // place error here
    }
  }
  useEffect(()=>{
    list();
    console.log(listOfInventory)
  }, [])
  const goBack = () => {
    navigate(-1);
  };

  // data table columns
  const columns = [
    {
      name: "Brand",
      selector: (row) => row.brand,
      hide: "md",
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
      hide: "md",
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
      <div className="flex justify-between gap-4 items-end my-2">
        <button onClick={goBack} className="flex  font-semibold items-center  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </button>
        <Link
          className="flex items-center font-semibold text-blue-500"
          to="/add_inventory"
        >
          Add Inventory
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={listOfInventory}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="1500px"
      />
    </div>
  );
};

export default Inventory;
