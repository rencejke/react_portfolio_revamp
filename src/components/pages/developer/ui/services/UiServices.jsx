import React from 'react';
import { CiMobile3 } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../../../../store/StoreContext';
import { devBaseImgUrl } from '../../../../helpers/functions-general';
import useQueryData from '../../../../custom-hook/useQueryData';

const UiServices = () => {
  const { dispatch } = React.useContext(StoreContext);
  const [info, setInfo] = React.useState(null);
  const { isLoading, isFetching, error, data: services } = useQueryData(
    '/v1/services',
    'get',
    'services'
  );

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!services?.data || services.data.length === 0) {
    return <div>No services found</div>;
  }

  const leftServices = services.data.slice(0, Math.ceil(services.data.length / 2));
  const rightServices = services.data.slice(Math.ceil(services.data.length / 2));
  


  return (
    <section id='services' className='bg-[#081b29] pt-16 px-12 pb-12'>
    <div className="container">
    <div className='wrapper grid grid-cols-2'>

      <div className='left ml-[95px]'>
      <small className='text-[16px] mb-12 text-[#00abf0]'>Services</small>
        <h3 className='text-[25px] mt-3 font-regular font-bold'>What Services I Do for my Client?</h3>
    
        <div className="services-left rounded-lg w-[510px] space-y-6 mt-6">
        {leftServices.map(
          (item, key) =>
            item.services_is_active === 1 && (
              <div
                key={key}
                className="card-item rounded-lg flex flex-row gap-10 items-center justify-center bg-[#0c1216] py-9 px-8"
              >
                <div className="bg-[#111e27] p-6 rounded-full">
                  <img src={`${devBaseImgUrl}/${item.services_image}`} alt="" />
                </div>
                <div>
                  <h4>{item.services_type}</h4>
                  <p>{item.services_description}</p>
                  <div className="btn-container w-[322px] h-[40px] mt-6">
                    <Link to={item.services_link}>
                      <button>{item.services_btn_title}</button>
                    </Link>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
      </div>

      <div className="services-right rounded-lg w-[510px] space-y-6 mt-6">
        {rightServices.map(
          (item, key) =>
            item.services_is_active === 1 && (
              <div
                key={key}
                className="card-item rounded-lg flex flex-row gap-10 items-center justify-center bg-[#0c1216] py-9 px-8"
              >
                <div className="bg-[#111e27] p-6 rounded-full">
                  <img src={`${devBaseImgUrl}/${item.services_image}`} alt="" />
                </div>
                <div>
                  <h4>{item.services_type}</h4>
                  <p>{item.services_description}</p>
                  <div className="btn-container w-[322px] h-[40px] mt-6">
                    <Link to={item.services_link}>
                      <button>{item.services_btn_title}</button>
                    </Link>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
    </div>
    </section>
  )
}

export default UiServices


