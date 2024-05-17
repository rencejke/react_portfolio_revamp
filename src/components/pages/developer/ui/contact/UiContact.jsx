import React from 'react'
import { setError, setIsAdd, setMessage, setSuccess } from '../../../../../store/StoreAction'
import { StoreContext } from '../../../../../store/StoreContext'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryData } from '../../../../helpers/queryData'
import { Formik, Form, useFormik } from 'formik'
import { InputText, InputTextArea } from '../../../../helpers/FormInputs'
import SpinnerButton from '../../../../partials/spinners/SpinnerButton'
import UiHeader from '../header/UiHeader'
import UiFooter from '../footer/UiFooter'
import { Link } from 'react-router-dom'

const UiContact = () => {
  const {store, dispatch} = React.useContext(StoreContext)
  
  const queryClient = useQueryClient();
  const mutation = useMutation({
      mutationFn: (values) =>
      queryData(
          "/v1/contact",
          "post",
          values
      ),
 
      onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
      if (data.success) {
          dispatch(setSuccess(true));
          dispatch(setMessage(`Successfuly updated.`));
      } else {
          dispatch(setError(true));
          dispatch(setMessage(data.error));
      } 
      },
  });

  
   const initVal  = {
        contact_name : "",
        contact_email : "",
        contact_subject :"",
        contact_message : "", 
      
   }



   const yupSchema = Yup.object({
     
      contact_name: Yup.string().required("Required"),
      contact_email: Yup.string().required("Required").email("Invalid Email"),
      contact_subject: Yup.string().required("Required"),
      contact_message: Yup.string().required("Required"),

      

   })

  return (
   <>
      

      <UiHeader/>

      <div className='bg-[#222831] text-white mt-12'>
    <section className='contact mx-auto w-[100%] p-20'>
    <div className="wrapper  grid grid-cols-2 h-[560px]">

    <div className="left bg-[#081b29] p-6">
      <h4 className='text-[25px] mb-5 font-bold'>Let's Get in Touch</h4>
    <img src="../../contact-1.png" alt="" className='w-[300px]  h-[300px] object-contain mx-auto mt-20'/>
    </div>

    <div className="right bg-[#ededed] text-[#0c1216] p-6">
    <h4 className='text-[25px] mb-5  font-bold'>Contact Me</h4>

       <Formik
           initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values) => {
              mutation.mutate(values)
          }}
       >

{(props) => {
   return (

    <Form>
   
         <div className='flex flex-col gap-2  mb-2'>
          <InputText 
             
             label="Name"
             type="text"
             name="contact_name"
             placeholder="Enter your Name"
          />
          </div>

          <div className='flex flex-col gap-2 mb-2'>
          <InputText 
             
             label="Email"
             type="email"
             name="contact_email"
             placeholder="Enter your Email"

          />
          </div>
       

          <div className='flex flex-col gap-2 mb-2'>
          <InputText
             
             label="Subject"
             type="text"
             name="contact_subject"
             placeholder="Enter a Subject"

          />
          </div>

          <div className='flex flex-col gap-2 mb-2'>
          <InputTextArea
             
             label="Message"
             type="text"
             name="contact_message"
             placeholder="Message"

          />
          </div>

          <div className="btn-container w-[345px] h-[50px]  mt-6 ">
             <Link><button type='submit'>{mutation.isPending ? <SpinnerButton/> : "Submit"}</button></Link>
             </div>
      </Form>)}}
       </Formik> 
        




    </div>
    </div>
  </section>
  {/* <Footer /> */}
     
 <UiFooter/>
    </div>

   </>
  )
}

export default UiContact