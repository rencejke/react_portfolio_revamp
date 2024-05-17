import React from 'react'
import useQueryData from '../../../../custom-hook/useQueryData';
import { StoreContext } from '../../../../../store/StoreContext';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';


const UiHeader = () => {


  const {store, dispatch} = React.useContext(StoreContext) 
  const [info, setInfo] = React.useState(null)
   
  const {
    isLoading,
    isFetching,
    error,
    data: banner,
  } = useQueryData(
    "/v1/banner",
    "get", // method
    "banner", // key
  );




  return (

    <>
<header className='header fixed top-0 left-0 w-[100%] py-[20px] px-[10%]  bg-[#081b29]
    flex justify-between items-center z-[99999]'>
        <Link className='logo-header text-[25px] text-[#ededed] font-semibold'>Clarence.</Link>
        <nav className='navbar text-[18px] font-bold flex gap-6'>
               <Link to="/home">Home</Link>
               <Link to="#">About</Link>
               <Link to="#">Services</Link>
               <Link to="/projects">Portfolio</Link>
               <Link to="/contact">Contact</Link>
        </nav>
    </header>
   </>
  )
}

export default UiHeader