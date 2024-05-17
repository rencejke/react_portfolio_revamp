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

const ContactTable = ({setItemEdit, isLoading, isFetching, contact}) => {
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
        setId(item.contact_aid);
        setIsArchiving(0);
    }
    const handleRestore = (item) => {
        dispatch(setIsActive(true));
        setId(item.contact_aid);
        setIsArchiving(1);
    }

    const handleDelete = (item) => {
        dispatch(setIsDelete(true));
        setId(item.contact_aid);
    }

  return (
    <>
          <div className="table-wrapper relative overflow-y-scroll h-[600px]">
        {isFetching && <SpinnerFetching/>}
        <table className='text-[#ededed] font-regular'>
                        <thead className='sticky top-0 relative z-10'>
                            <tr>
                                <th className='w-[20px]'>#</th>
                                <th className='w-[80px]'>Name</th>
                                <th className='w-[80px]'>Email</th>
                                <th className='w-[80px]'>Subject</th>
                                <th className='w-[80px]'>Message</th>
                                <th className='w-[120px]'>Action</th>
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

                {contact?.data.length === 0 && (
                    <tr>
                        <td colSpan={9}>
                            <NoData/>
                        </td>
                    </tr>
                )}
                    {contact?.data.map((item, key) => (
                        <tr key={key}>
                        <td>{counter++}</td>
                        <td>{item.contact_name}</td>
                        <td>{item.contact_email}</td>
                        <td>{item.contact_subject}</td>
                        <td>{item.contact_message}</td>
                        
                        
                        <td className='table-action'>
                        <ul>
                            {item.contact_is_active ? (
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

                {store.isActive && <ModalConfirmed position="center"  queryKey="contact" endpoint={`/v1/contact/active/${id}`} isArchiving={isArchiving}/>}

                {store.isDelete && <ModalDelete position="center"  queryKey="contact" endpoint={`/v1/contact/${id}`} />} 
    </>
  )
}

export default ContactTable
