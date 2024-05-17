import React from 'react'
import { CiMobile3 } from 'react-icons/ci'
import { Link } from 'react-router-dom'

const UiServices = () => {
  return (
    <section id='services' className='bg-[#081b29] pt-16 px-12 pb-12'>
    <div className="container">
    <div className='wrapper grid grid-cols-2'>

      <div className='left ml-[95px]'>
      <small className='text-[16px] mb-12 text-[#00abf0]'>Services</small>
        <h3 className='text-[25px] mt-3 font-regular font-bold'>What Services I Do for my Client?</h3>
    
        <div className='services-left rounded-lg w-[510px] space-y-6 mt-6'>
         <div className='card-item rounded-lg flex flex-row gap-10 items-center justify-center bg-[#0c1216] py-9 px-8'>
         <div className='bg-[#111e27] p-6 rounded-full'>
         <CiMobile3 className='text-[26px] font-bold'/>
         </div>
         <div>
          <h4>Mobile Development</h4>
          <p>Lorem ipsum dolor sit, amet consectetur 
            adipisicing elit. Sapiente, praesentium? Voluptate maiores debitis veritatis natus.</p>
            <div className="btn-container w-[322px] h-[40px] mt-6">
             <Link><button>Learn More</button></Link>
             </div>
         </div>
         </div>

         <div className='card-item rounded-lg flex flex-row gap-10 items-center justify-center bg-[#0c1216] py-9 px-8'>
         <div className='bg-[#111e27] p-6 rounded-full'>
         <CiMobile3 className='text-[26px] font-bold'/>
         </div>
         <div>
          <h4>Mobile Development</h4>
          <p>Lorem ipsum dolor sit, amet consectetur 
            adipisicing elit. Sapiente, praesentium? Voluptate maiores debitis veritatis natus.</p>
            <div className="btn-container w-[322px] h-[40px] mt-6">
             <Link><button>Learn More</button></Link>
             </div>
         </div>
         </div>
        </div>
      </div>

      <div className='services-right  ounded-lg w-[510px] space-y-6 mt-6'>
      <div className='card-item rounded-lg flex flex-row gap-10 items-center justify-center bg-[#0c1216] py-9 px-8'>
         <div className='bg-[#111e27] p-6 rounded-full'>
         <CiMobile3 className='text-[26px] font-bold'/>
         </div>
         <div>
          <h4>Mobile Development</h4>
          <p>Lorem ipsum dolor sit, amet consectetur 
            adipisicing elit. Sapiente, praesentium? Voluptate maiores debitis veritatis natus.</p>
            <div className="btn-container w-[322px] h-[40px] mt-6">
             <Link><button>Learn More</button></Link>
             </div>
         </div>
         </div>

         <div className='card-item rounded-lg flex flex-row gap-10 items-center justify-center bg-[#0c1216] py-9 px-8'>
         <div className='bg-[#111e27] p-6 rounded-full'>
         <CiMobile3 className='text-[26px] font-bold'/>
         </div>
         <div>
          <h4>Mobile Development</h4>
          <p>Lorem ipsum dolor sit, amet consectetur 
            adipisicing elit. Sapiente, praesentium? Voluptate maiores debitis veritatis natus.</p>
            <div className="btn-container w-[322px] h-[40px] mt-6">
             <Link><button>Learn More</button></Link>
             </div>
         </div>
         </div>
      </div>
    </div>
    </div>
    </section>
  )
}

export default UiServices