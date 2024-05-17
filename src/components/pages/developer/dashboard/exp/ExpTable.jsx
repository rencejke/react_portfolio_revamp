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

const ExpTable = ({setItemEdit, isLoading, isFetching, exp}) => {
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
        setId(item.exp_aid);
        setIsArchiving(0);
    }
    const handleRestore = (item) => {
        dispatch(setIsActive(true));
        setId(item.exp_aid);
        setIsArchiving(1);
    }

    const handleDelete = (item) => {
        dispatch(setIsDelete(true));
        setId(item.exp_aid);
    }

  return (
    <>
          <div className="table-wrapper relative overflow-y-scroll h-[600px]">
        {isFetching && <SpinnerFetching/>}
        <table className='text-[#ededed] font-regular'>
                        <thead className='sticky top-0 relative z-10'>
                            <tr>
                                <th className='w-[20px]'>#</th>
                                <th className='w-[80px]'>Image</th>
                                <th className='w-[80px]'>Data AOS Animation</th>
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

                {exp?.data.length === 0 && (
                    <tr>
                        <td colSpan={9}>
                            <NoData/>
                        </td>
                    </tr>
                )}
                    {exp?.data.map((item, key) => (
                        <tr key={key}>
                        <td>{counter++}</td>
                        <td>{item.exp_image}</td>
                        <td>{item.exp_image_animation}</td>
                        
                        <td className='table-action'>
                        <ul>
                            {item.exp_is_active ? (
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

                {store.isActive && <ModalConfirmed position="center"  queryKey="exp" endpoint={`/v1/exp/active/${id}`} isArchiving={isArchiving}/>}

                {store.isDelete && <ModalDelete position="center"  queryKey="exp" endpoint={`/v1/exp/${id}`} />} 
    </>
  )
}

export default ExpTable
