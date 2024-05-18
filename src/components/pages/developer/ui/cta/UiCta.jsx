import React from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../../../../store/StoreContext'
import useQueryData from '../../../../custom-hook/useQueryData'

const UiCta = () => {

    const {store, dispatch} = React.useContext(StoreContext) 
    const [info, setInfo] = React.useState(null)
     
    const {
      isLoading,
      isFetching,
      error,
      data: cta,
    } = useQueryData(
      "/v1/cta",
      "get", // method
      "cta", // key
    );
  

  return (
    <section className='cta'>
    
    <section className='cta'>
    {cta?.data.map((item, key) => (
      item.cta_is_active === 1 && (
    <div className='text-center bg-[#0c1216] py-12'>
    <h2 className='font-thick text-3xl'>{item.cta_title}</h2>
    <p className='text-[22px] text-white'>{item.cta_msg}</p>
    <div className="container btn-container w-[345px] h-[50px] mt-6">
             <Link><button> {item.cta_btn_title}</button></Link>
             </div>
    </div>)))}
   </section>
   </section>
  )
}

export default UiCta