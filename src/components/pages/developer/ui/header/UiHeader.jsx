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
        <nav className='navbar text-[18px] font-bold flex gap-6 invisible md:visible'>
               <HashLink to="/home">Home</HashLink>
               <HashLink  smooth to="#about">About</HashLink>
               <HashLink  smooth to="#services">Services</HashLink>
               <HashLink  smooth to="/projects">Projects</HashLink>
               <HashLink smooth to="/contact">Contact</HashLink>
        </nav>
    </header>
   </>
  )
}

export default UiHeader