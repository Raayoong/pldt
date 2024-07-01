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


function App() {
  return (
    <div className="App flex flex-col">

  
      <BrowserRouter>
      <Navigation/>
      
        <Routes>
          
            <Route path="/" element={<Dashboard/>}/>
            <Route path="fault_tickets" element={<FaultTickets/>}/>
            <Route path="service_order" element={<ServiceOrder/>}/>
            <Route path="inventory" element={<Inventory/>}/>
            <Route path="request_order" element={<RequestOrder/>}/>
            <Route path="add_inventory" element={<AddInventory/>} />
            <Route path="view_ro" element={<ViewRO/>}/>
          
          
            
        
        </Routes>
        <Outlet/>
      </BrowserRouter>
      
         
      
    </div>
  );
}

export default App;
