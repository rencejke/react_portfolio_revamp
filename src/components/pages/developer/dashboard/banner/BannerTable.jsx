import React from 'react'
import TableLoader from '../../../../partials/TableLoader'
import NoData from '../../../../partials/NoData'
import { LiaEdit, LiaHistorySolid, LiaTrashAltSolid } from 'react-icons/lia'
import { PiArchive } from 'react-icons/pi'
import SpinnerFetching from '../../../../partials/spinners/SpinnerFetching'
import { StoreContext } from '../../../../../store/StoreContext'
import { setIsActive, setIsAdd, setIsDelete } from '../../../../../store/StoreAction'
import ModalConfirmed from '../../../../partials/modals/ModalConfirmed'
import ModalDelete from '../../../../partials/modals/ModalDelete'

const BannerTable = ({setItemEdit, isLoading, isFetching, banner}) => {
    const {store, dispatch} = React.useContext(StoreContext)
    const [isArchiving, setIsArchiving] = React.useState(0);
    const [id, setId] = React.useState('');

   

    let counter = 1;

    const handleEdit = (item) => {
        dispatch(setIsAdd(true));
        setItemEdit(item);
    }

    // archive is here
    const handleActive = (item) => {
        dispatch(setIsActive(true));
        setId(item.banner_aid);
        setIsArchiving(0);
    }
    const handleRestore = (item) => {
        dispatch(setIsActive(true));
        setId(item.banner_aid);
        setIsArchiving(1);
    }

    const handleDelete = (item) => {
        dispatch(setIsDelete(true));
        setId(item.banner_aid);
    }

  return (
    <>
          <div className="table-wrapper relative overflow-y-scroll h-[600px]">
        {isFetching && <SpinnerFetching/>}
        <table className='text-[#ededed] font-regular'>
                        <thead className='sticky top-0 relative z-10'>
                            <tr>
                                <th className='w-[20px]'>#</th>
                                <th className='w-[150px]'>Title 1</th>
                                <th className='w-[80px]'>Image</th>
                                <th className='w-[80px]'>Description</th>
                                <th className='w-[80px]'>Button Title</th>
                                <th className='w-[80px]'>Button Title 2</th>
                                <th className='w-[100px]'>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                        {isLoading && ( 
                <tr>
                    <td colSpan={9}>
                        <TableLoader count="20" cols="4"/>
                    </td>
                </tr>)
                }

                {banner?.data.length === 0 && (
                    <tr>
                        <td colSpan={9}>
                            <NoData/>
                        </td>
                    </tr>
                )}
                    {banner?.data.map((item, key) => (
                        <tr key={key}>
                        <td>{counter++}</td>
                        <td>{item.banner_title_1}</td>
                        <td>{item.banner_image}</td>
                        <td>{item.banner_description}</td>
                        <td>{item.banner_btn_title}</td>
                        <td>{item.banner_btn_title_2}</td>
                        
                        
                        <td className='table-action'>
                        <ul>
                            {item.banner_is_active ? (
                                <>
                                    <li><button className="tooltip" data-tooltip="Edit" onClick={()=>handleEdit(item)}><LiaEdit/></button></li>
                                    <li><button className="tooltip" data-tooltip="Archive" onClick={()=>handleActive(item)}><PiArchive /></button></li>
                                </>
                            ) : (
                                <>
                                <li><button className="tooltip" data-tooltip="Restore" onClick={()=>handleRestore(item)}><LiaHistorySolid/></button></li>
                                <li><button className="tooltip" data-tooltip="Delete" onClick={()=>handleDelete(item)} ><LiaTrashAltSolid/></button></li></>
                            )}
                        </ul>
                        </td>
                    </tr>
                    ))}
                        
                   

                        </tbody>
                    </table>
                </div>

                {store.isActive && <ModalConfirmed position="center"  queryKey="banner" endpoint={`/v1/banner/active/${id}`} isArchiving={isArchiving}/>}

                {store.isDelete && <ModalDelete position="center"  queryKey="banner" endpoint={`/v1/banner/${id}`} />} 
    </>
  )
}

export default BannerTable
