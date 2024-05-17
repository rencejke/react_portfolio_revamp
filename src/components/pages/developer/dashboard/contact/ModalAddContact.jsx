import React from 'react'
import { LiaTimesSolid } from 'react-icons/lia'
import { Formik, Form } from 'formik'
import { InputText, InputTextArea } from '../../../../helpers/FormInputs'
import SpinnerButton from '../../../../partials/spinners/SpinnerButton'
import { setError, setIsAdd, setMessage, setSuccess } from '../../../../../store/StoreAction'
import { StoreContext } from '../../../../../store/StoreContext'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryData } from '../../../../helpers/queryData'
import ModalWrapper from '../../../../partials/ModalWrapper'

const ModalAddContact = ({itemEdit}) => {
    const {store, dispatch} = React.useContext(StoreContext)
    const handleClose = () => dispatch(setIsAdd(false));

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (values) =>
        queryData(
            itemEdit ? `/v1/contact/${itemEdit.contact_aid}` :`/v1/contact`,
            itemEdit ? "put" : "post",
            values
        ),
   
        onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["contact"] });
        if (data.success) {
            dispatch(setIsAdd(false));
            dispatch(setSuccess(true));
            dispatch(setMessage(`Successfuly updated.`));
        } else {
            dispatch(setError(true));
            dispatch(setMessage(data.error));
        } 
        },
    });

    
     const initVal  = {
          contact_num : itemEdit ? itemEdit.contact_num : "",
          contact_title : itemEdit ? itemEdit.contact_title : "",
          contact_image : itemEdit ? itemEdit.contact_image : "",
          contact_description : itemEdit ? itemEdit.contact_description : "", 
          contact_btn_title : itemEdit ? itemEdit.contact_btn_title : "",
          contact_animation : itemEdit ? itemEdit.contact_animation : "",
        
     }
       

     const yupSchema = Yup.object({
       
        contact_num: Yup.string().required("Required"),
        contact_title: Yup.string().required("Required"),
        contact_image: Yup.string().required("Required"),
        contact_description: Yup.string().required("Required"),
        contact_btn_title: Yup.string().required("Required"),
        contact_animation: Yup.string().required("Required"),

        

     })


  return (
    <div>
      <ModalWrapper>
      <div className="main-modal w-[300px] bg-secondary text-content h-full">
                <div className="modal-header p-4 relative">
                    <h2>New Student</h2>
                    <button className='absolute top-[25px] right-4' onClick={handleClose}><LiaTimesSolid/></button>
                </div>
                <div className="modal-body p-4">
                    <Formik
                        initialValues={initVal}
                        validationSchema={yupSchema}
                        onSubmit={async (values) => {
                            mutation.mutate(values)
                        }}
                    >
                        {(props) => {
                            return (
                            <Form  className='flex flex-col h-[calc(100vh-110px)]'>
                        <div className='grow overflow-y-auto'>

                                  
                        <div className="input-wrap">
                            <InputText
                                label="Number"
                                type="number"
                                name="contact_num"
                            />
                        </div>
                            
                        <div className="input-wrap">
                            <InputText
                                label="Title"
                                type="text"
                                name="contact_title"
                            />
                        </div>

                        <div className="input-wrap">
                        <InputText
                                label="Image"
                                type="text"
                                name="contact_image"
                            />
                        </div>

                        <div className="input-wrap">
                        <InputTextArea
                                label="Description"
                                type="text"
                                name="contact_description"
                                className='h-[10rem] resize-none'
                            />
                        </div>
                          

                        <div className="input-wrap">
                        <InputText
                                label="Button Title"
                                type="text"
                                name="contact_btn_title"
                            />
                        </div>

                        <div className="input-wrap">
                        <InputText
                                label="Animation"
                                type="text"
                                name="contact_animation"
                            />
                        </div>

            
                                
                                {/* edit here */}
                        </div>

                        <div className='form-action'>
                            <button className='btn btn-form btn--accent' type="submit"> {mutation.isPending ? <SpinnerButton/> : "Add"}</button>
                            <button className='btn btn-form btn--cancel' type="button" onClick={handleClose} >Cancel</button>
                        </div>
                    </Form>)}}
                    
                    </Formik>
                </div>
        </div>
    </ModalWrapper>
    </div>
  )
}

export default ModalAddContact
