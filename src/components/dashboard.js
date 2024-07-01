import { Outlet, Link } from "react-router-dom";
import Navigation from "../components/navigation";

const Dashboard = () => {
    return ( 
        <>

                  <div className="w-full h-screen bg-slate-200 pt-[4rem]">
          
          <div>
              <ul className="cardlist p-4 flex flex-col gap-4">
                  <li className="card w-full h-1/4 bg-slate-400 shadow-lg p-4">
                      <Link to="/inventory">
                          <h1>View My Inventory</h1>
                      </Link>
                  </li>
                  <li className="card w-full h-1/4 bg-slate-400 shadow-lg p-4">
                      <Link to="/request_order">
                      <h1>Transact Request Order</h1>
                      </Link>
                  </li>
                  <li className="card w-full h-1/4 bg-slate-400 shadow-lg p-4">
                      <Link to="/view_ro">
                      <h1>View List of Request Order</h1>
                      </Link>
                  </li>
              </ul>
          </div>
      </div>
        </>
      
     );
}
 
export default Dashboard;