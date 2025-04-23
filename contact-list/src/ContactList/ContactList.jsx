import React from 'react';
import './ContactList.css';

function ContactList() {
  return (
    <div className='contact-list'>
        <form className='contact-form'>
            <label htmlFor='First Name'>First Name:</label> 
            <input type='text' placeholder='First name' className='input-field'></input>
            <label htmlFor='Last Name'>Last Name:</label> 
            <input type='text' placeholder='Last name' className='input-field'></input>
            <label htmlFor='Address'>Address:</label> 
            <input type='text' placeholder='Address' className='input-field'></input>
            <label htmlFor='Birthday'>Birthday:</label> 
            <input type='text' placeholder='Birthday' className='input-field'></input>
        </form>
            <button className='submit-button'>Submit</button>    
    </div>
  )
}

export default ContactList
