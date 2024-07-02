import { Outlet, Link } from "react-router-dom";
import Navigation from "../components/navigation";

const Dashboard = () => {
    return ( 
        <>

                  <div className="w-full h-screen bg-slate-200 pt-[4rem]">
          
          <div>
              <ul className="cardlist p-4 flex flex-col gap-4">
                  <li className="card w-full h-1/4 bg-blue-500 shadow-lg p-4 flex flex-col items-center text-slate-200 rounded-lg font-semibold text-xl">
                      <Link to="/inventory">
                            
                            <div className="flex justify-center flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-16">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
</svg>

                                         <h1>My Inventory</h1>
                            </div>
                       
                      </Link>
                  </li>
                  <li className="card w-full h-1/4shadow-lg p-4 bg-green-500 text-slate-100 rounded-lg font-semibold text-xl">
                      <Link to="/request_order">
                      <div className="flex justify-center flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-16">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
                 <h1>Transact Request Order</h1>
                            </div>
                      </Link>
                  </li>
                  <li className="card w-full h-1/4 bg-yellow-500 shadow-lg p-4 text-slate-100 rounded-lg font-semibold text-xl">
                      <Link to="/view_ro">
                      <div className="flex justify-center flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
</svg>    
                 <h1>View Request Order</h1>
                            </div>
                      </Link>
                  </li>
              </ul>
          </div>
      </div>
        </>
      
     );
}
 
export default Dashboard;