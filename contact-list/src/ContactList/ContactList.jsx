import React, { useState, useEffect } from 'react';
import './ContactList.css';

function ContactList() {
  // Initialize contacts from localStorage
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  });
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    birthday: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    console.log('Saving contacts to localStorage:', contacts);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      ...formData,
      id: editingId || Date.now()
    };

    if (editingId) {
      // Update existing contact
      const updatedContacts = contacts.map(contact => 
        contact.id === editingId ? newContact : contact
      );
      setContacts(updatedContacts);
    } else {
      // Add new contact
      setContacts(prevContacts => [...prevContacts, newContact]);
    }

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      address: '',
      birthday: ''
    });
    setEditingId(null);
  };

  const handleEdit = (contact) => {
    setFormData({
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      birthday: contact.birthday
    });
    setEditingId(contact.id);
  };

  const handleDelete = (id) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <div className='contact-list'>
      <h2>{editingId ? 'Edit Contact' : 'Add New Contact'}</h2>
      <form className='contact-form' onSubmit={handleSubmit}>
        <label htmlFor='firstName'>First Name:</label>
        <input
          type='text'
          id='firstName'
          name='firstName'
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder='First name'
          className='input-field'
          required
        />
        <label htmlFor='lastName'>Last Name:</label>
        <input
          type='text'
          id='lastName'
          name='lastName'
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder='Last name'
          className='input-field'
          required
        />
        <label htmlFor='address'>Address:</label>
        <input
          type='text'
          id='address'
          name='address'
          value={formData.address}
          onChange={handleInputChange}
          placeholder='Address'
          className='input-field'
          required
        />
        <label htmlFor='birthday'>Birthday:</label>
        <input
          type='date'
          id='birthday'
          name='birthday'
          value={formData.birthday}
          onChange={handleInputChange}
          className='input-field'
          required
        />
        <button type='submit' className='submit-button'>
          {editingId ? 'Update Contact' : 'Add Contact'}
        </button>
      </form>

      <div className='contacts-display'>
        <h2>Contact List</h2>
        {contacts.length === 0 ? (
          <p className="no-contacts">No contacts yet. Add your first contact above!</p>
        ) : (
          contacts.map(contact => (
            <div key={contact.id} className='contact-item'>
              <p><strong>Name:</strong> {contact.firstName} {contact.lastName}</p>
              <p><strong>Address:</strong> {contact.address}</p>
              <p><strong>Birthday:</strong> {contact.birthday}</p>
              <div className='contact-actions'>
                <button onClick={() => handleEdit(contact)} className='edit-button'>Edit</button>
                <button onClick={() => handleDelete(contact.id)} className='delete-button'>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ContactList;
