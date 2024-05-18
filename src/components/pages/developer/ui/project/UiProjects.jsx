import React from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../../../../store/StoreContext'
import useQueryData from '../../../../custom-hook/useQueryData'
import { devBaseImgUrl } from '../../../../helpers/functions-general'

const UiProjects = () => {

  const {store, dispatch} = React.useContext(StoreContext) 
  const [info, setInfo] = React.useState(null)
   
  const {
    isLoading,
    isFetching,
    error,
    data: projects,
  } = useQueryData(
    "/v1/projects",
    "get", // method
    "projects", // key
  );

  const [activeIndex, setActiveIndex] = React.useState(1)
  const handleClick = (index) =>setActiveIndex(index);
  const checkActive = (index, className) => activeIndex === index ? className : "";
  

  return (
     <>
   <section id='portfolio' className='projects bg-[#0c1216] pt-8 py-12 overflow-hidden'>
  <div className='"max-w-[1000px] w-full mx-auto px-4 py-1'>
    <h4 className='text-center font-thicker text-[2rem] mb-12'>Some of my <span className='text-[#00abf0]'>Projects</span></h4>
    <div className="wrapper">
      {/* <div className='bg-[#00abf0] flex rounded-lg p-2 justify-around items-center w-[500px] mx-auto'>
        {projects?.data
          .filter((item, index, self) => 
            index === self.findIndex((t) => (
              t.projects_category === item.projects_category && t.projects_is_active === 1
            ))
          )
          .map((item, key) => (
            <button
              key={key}
              onClick={() => handleClick(item.projects_category_num)}
              className={`${checkActive(item.projects_category_num, "bg-[#081b29] px-3 py-1 rounded-md text-[#ededed] transition")}`}
            >
              {item.projects_category}
            </button>
          ))}
      </div> */}

<div className='max-w-[1000px] w-[100%] mx-auto mt-12'>
        <div id="1" className={`${checkActive(1, "active")} panel`}>
         
          <div className='tab-item flex flex-row gap-10 bg-[#ededed] dark:bg-[#0c1216] p-6 rounded-md mb-5'>
            <div className='left w-[100%]'>
            <img src="../../public/math-alino.jpg" alt="" className='w-[300px] h-[230px] rounded-xl object-cover'/>
            
            </div>

            <div className='right text-[#081b29]'>
            <h3 className='font-bold dark:text-[#ededed]'>Math-alino</h3>
            <p className='dark:text-[#ededed]'>This project is an interactive and engaging game that’s all about math that is specifically made for grades 1-3 students of Sta Maria Magdalena Elementary School. The game uses colorful graphics, good animation and it is user-friendly. 
</p>
            <div className='mb-4 flex gap-2 items-center'>
            <h4 className='font-bold dark:text-[#ededed]'>Technologies:</h4>
            <p className='bg-[#081b29] px-2 py-1 rounded-md text-[#ededed] items-center'>C#, Unity, Canva</p>
            </div>
             <div className="btn-container w-[345px] h-[50px] ">
             <Link to='/projects'><button>Learn More</button></Link>
             </div>
            </div>
          </div>

   

          

          
       

        </div>
        <div id="2" className={`${checkActive(2, "active")} panel`}>
          <div className='flex flex-row gap-10 bg-[#ededed] p-6 rounded-md'>
            <div className='left w-[100%]'>
            <img src="https://via.placeholder.com/200x200" alt="" className='w-[300px] h-[230px] rounded-xl object-cover'/>
            
            </div>

            <div className='right text-[#081b29]'>
            <h3 className='font-bold '>Math-alino</h3>
            <p className=''>Lorem ipsum dolor sit
             amet consectetur adipisicing elit. Ex asperiores
              atque et sunt commodi veritatis, harum ratione quae nisi 
              debitis non perspiciatis doloribus dicta perferendis, cum dolorum laborum quibusdam quia.</p>
            <div className='mb-4 flex gap-2 items-center'>
            <h4 className='font-bold '>Technologies:</h4>
              <ul className='flex gap-4'>
                <li className='bg-[#081b29] px-2 py-1 rounded-md text-[#ededed] items-center'>C#</li>
                <li className='bg-[#081b29] px-2 py-1 rounded-md text-[#ededed] items-center'>Unity</li>
                <li className='bg-[#081b29] px-2 py-1 rounded-md text-[#ededed] items-center'>Canva</li>
              </ul>
            </div>
             <div className="btn-container w-[345px] h-[50px] ">
             <Link><button>Learn More</button></Link>
             </div>
            </div>
          </div></div>
        <div id="3" className={`${checkActive(3, "active")} panel`}>
          <div className='flex flex-row gap-10 bg-[#ededed] p-6 rounded-md'>
            <div className='left w-[100%]'>
            <img src="https://via.placeholder.com/200x200" alt="" className='w-[300px] h-[230px] rounded-xl object-cover'/>
            
            </div>

            <div className='right text-[#081b29]'>
            <h3 className='font-bold '>Math-alino</h3>
            <p className=''>Lorem ipsum dolor sit
             amet consectetur adipisicing elit. Ex asperiores
              atque et sunt commodi veritatis, harum ratione quae nisi 
              debitis non perspiciatis doloribus dicta perferendis, cum dolorum laborum quibusdam quia.</p>
            <div className='mb-4 flex gap-2 items-center'>
            <h4 className='font-bold '>Technologies:</h4>
              <ul className='flex gap-4'>
                <li className='bg-[#081b29] px-2 py-1 rounded-md text-[#ededed] items-center'>C#</li>
                <li className='bg-[#081b29] px-2 py-1 rounded-md text-[#ededed] items-center'>Unity</li>
                <li className='bg-[#081b29] px-2 py-1 rounded-md text-[#ededed] items-center'>Canva</li>
              </ul>
            </div>
             <div className="btn-container w-[345px] h-[50px] ">
             <Link><button>Learn More</button></Link>
             </div>
            </div>
          </div></div>
        </div>
    </div>
  </div>
</section>

     </>
 
  )
}

export default UiProjects
