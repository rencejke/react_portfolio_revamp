import React from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const WelcomeTable = ({banner, about, exp, projects, contact}) => {

  return (
    <>
                            <div className='grid grid-cols-4 gap-4 place-content-center'>
                                <div className='item-cards'>
                                    <h3>No. of Banner Info</h3>
                                    <h4>{banner?.data.length}</h4>
                                    <Link to="/banner" className='hover:text-accent'> <span>View Details<FaLongArrowAltRight /></span></Link>
                                </div>

                                <div className='item-cards'>
                                    <h3>No. of About Info</h3>
                                    <h4>{about?.data.length}</h4>
                                    <Link to="/about" className='hover:text-accent'> <span>View Details<FaLongArrowAltRight /></span></Link>
                                </div>

                                <div className='item-cards'>
                                    <h3>No. of Experiences Info</h3>
                                    <h4>{exp?.data.length}</h4>
                                    <Link to="/experiences" className='hover:text-accent'> <span>View Details<FaLongArrowAltRight /></span></Link>
                                </div>

                                <div className='item-cards'>
                                    <h3>No. of Project Info</h3>
                                    <h4>{projects?.data.length}</h4>
                                    <Link to="/projects" className='hover:text-accent'><span>View Details<FaLongArrowAltRight /></span></Link>
                                </div>

                                <div className='item-cards'>
                                    <h3>No. of Inquiries</h3>
                                    <h4>{contact?.data.length}</h4>
                                    <Link to="/contact" className='hover:text-accent'><span>View Details<FaLongArrowAltRight /></span></Link>
                                </div>
                            </div>
    </>
  )
}

export default WelcomeTable
