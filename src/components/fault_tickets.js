import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const FaultTickets = () => {
  // use states
  const [ftList, setFtList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ftNo, setFtNo] = useState('');
  const [ftSubsName, setFtSubsName] = useState('');
  const [ftTelNo, setFtTelNo] = useState('');
  const [ftContactNo, setContactNo] = useState('');
  const [ftStatus, setFtStatus] = useState('')
  const [ftRemarks, setFtRemarks] = useState('');

  // fetch ft list
  const fetch_ftList = async () => {
    const response = await fetch("/fault_tickets");
    const json = await response.json();

    if (!response.ok) {
      console.error(response.error);
    }
    setFtList(json);
    console.log("DATA FETCHED!", ftList);
  };
  
  // submit ft
  const submitFTHandler = async(e)=>{
    e.preventDefault();
    const addFT = {ftNo, ftSubsName, ftTelNo, ftContactNo, ftRemarks, ftStatus}
    const response = await fetch('/fault_tickets', {
        method: 'POST',
        body: JSON.stringify(addFT),
        headers: {
          'Content-type': 'application/json'
        }
    });
    
    if(!response){
      console.log(response.error);
    }

      
    
  }
// open Modal 
const openModal = ()=>{
    setIsModalOpen(true)
}
// close Modal 
const closeModal = ()=>{
    setIsModalOpen(false)
}
  // useEffect
  useEffect(() => {
    fetch_ftList();
  }, []);

  // data provides access to your row data
  const rowPreExpanded = (rows) =>
    Object.entries(rows).map((row) => (
      <>
      
        <div className="border-b-2">{row[1].ft_subsname}</div>
        <div  className="border-b-2">
          <label htmlFor="">Contact No: </label>
          {row[1].ft_contactno}
        </div>
        <div  className="border-b-2">
          <label htmlFor="">Remarks: </label>
          {row[1].ft_remarks}
        </div>
      </>
    ));
  // Data tables
  const columns = [
    
    {
      name: "Subs Name",
      selector: (row) => row.ft_subsname,
    },
    {
      name: "Tel #",
      selector: (row) => row.ft_telno,
    },
    {
      name: "Status",
      selector: (row) => row.ft_status,
    },
  ];

  return (
    <div className="w-full h-screen bg-slate-200 pt-[4rem]">
      <h1>FT</h1>

      <div className="h-full w-full">
        <DataTable
          columns={columns}
          data={ftList}
          fixedHeader
          fixedHeaderScrollHeight="auto"
          pagination
          expandableRows
          expandableRowsComponent={rowPreExpanded}
        />
      </div>
      <div onClick={openModal} className="bg-slate-700 w-[50px] h-[50px] rounded-full absolute bottom-10 right-5">
        <div className="w-full h-full flex justify-center items-center text-slate-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="size-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>
      {/* Modals */}
      <Modal open={isModalOpen} onClose={closeModal} center>
        <div className="mt-8">
        <header>
          <h1 className="text-2xl font-semibold mb-2">Transact a Ticket</h1>
        </header>
            <form className="flex flex-col gap-4" onSubmit={submitFTHandler} action="">
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[100px]" htmlFor="">FT#</label>
                    <input onChange={(e)=>{
                      setFtNo(e.target.value);
                    }} value={ftNo} className="bg-slate-200 p-2 focus:outline-none" type="number" required />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[100px]" htmlFor="">Subs Name</label>
                    <input onChange={(e)=>{
                      setFtSubsName(e.target.value);
                    }} value={ftSubsName} className="bg-slate-200 p-2 focus:outline-none" type="text" required/>
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[100px]" htmlFor="">Tel No.</label>
                    <input onChange={(e)=>{
                      setFtTelNo(e.target.value);
                    }} value={ftTelNo} className="bg-slate-200 p-2 focus:outline-none" type="number" required />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[100px]" htmlFor="">Contact No.</label>
                    <input onChange={(e)=>{
                      setContactNo(e.target.value);
                    }} value={ftContactNo} className="bg-slate-200 p-2 focus:outline-none" type="number" required />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[100px]" htmlFor="">Remarks</label>
                    <input onChange={(e)=>{
                      setFtRemarks(e.target.value);
                    }} value={ftRemarks} className="bg-slate-200 p-2 focus:outline-none" type="text" required />
                </div>
                <div className="form-group flex w-full">
                    <label className="bg-slate-800 text-slate-100 p-2 w-[140px]" htmlFor="">Status</label>
                    <select onChange={(e)=>{
                      setFtStatus(e.target.value);
                    }} value={ftStatus} className={`focus:outline-none w-full ${ftStatus==='COMPLETED' ? 'bg-green-400':
                    ftStatus==='SUSPENDED' ? 'bg-orange-400':
                    ftStatus==='NOT DONE' ? 'bg-red-400':
                    ftStatus==='' ? 'bg-slate-200':
                    ''} `} name="" id="">
                      <option value=" "></option>
                      <option className="text-center bg-green-400" value="COMPLETED">Completed</option>
                      <option className="text-center bg-orange-400"  value="SUSPENDED">Suspended</option>
                      <option className="text-center bg-red-400"  value="NOT DONE">Not Done</option>
                    </select>
                </div>
                <div className="flex justify-end gap-2">
                <button className="bg-red-400 p-1 rounded-md">Cancel</button>
                  <button className="bg-cyan-400 p-1 rounded-md" type="submit">Submit</button>
                </div>
            </form>
        </div>
      </Modal>
    </div>
  );
};

export default FaultTickets;
