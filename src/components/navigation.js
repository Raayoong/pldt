import { Outlet, Link } from "react-router-dom";
import {useState} from 'react';
import Dashboard from '../components/dashboard';
const Navigation = (props) => {
    // useStates
    const [openNavMenu, setIsOpenNavMenu] = useState(false);
  const handle_OpenNavMenu = ()=>{
    setIsOpenNavMenu(!openNavMenu)
  }  

  return (
    <>
      <nav className="flex z-50 justify-between bg-slate-100 p-4 shadow-lg w-full fixed ">
        <div className="flex items-center">
          <span onClick={handle_OpenNavMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </span>
        </div>
        { openNavMenu &&
            <ul className="flex flex-col text-left bg-slate-300 p-2 mt-12 gap-4 text-md absolute left-1 rounded-lg shadow-md font-semibold z-50 w-full" >
          <li onClick={()=>{
              setIsOpenNavMenu(false)
          }}>
            <Link className="flex items-center gap-2" to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span>Home</span>
            </Link>
          </li>
          
        </ul>
        }
      </nav>
     
    </>
  );
};

export default Navigation;
