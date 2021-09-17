import React, { useState, useEffect } from 'react';
import Contact from './Contact';
import './Contacts.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { saveContact, selectContactData } from '../features/contactSlice.js';

function Contacts() {
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();
    const contactsData = useSelector(selectContactData);

    useEffect(() => {
        try{
            var data = JSON.parse(localStorage.getItem('contacts-data-list'));
            dispatch(saveContact(data));
        }
        catch (error){
            console.log(error)
        }
    }, [])

    function isPresent(value) {
        return ((value?.name.includes(searchText))
            ||  value?.email.includes(searchText)
            ||  value?.phoneNumber.includes(searchText)
            ||  value?.address.includes(searchText));
    }

    useEffect(() => {
        try{
            var data = JSON.parse(localStorage.getItem('contacts-data-list'));
            var newData= [];
            if(data?.length) {
                newData = data?.filter(isPresent);
                dispatch(saveContact(newData));
                console.log(newData);
            }
        }
        catch (error){
            console.log(error)
        }
    }, [searchText])

    return (
        <div className="contacts">
            <div className="contacts__header">
                <h2>Contacts List</h2>

                <div className="contacts__searchbox">
                    <input 
                        type="search" 
                        value={searchText}
                        placeholder="Search any field ..."
                        onChange={e => setSearchText(e.target.value)}
                    />
                    <input className="search__button" type="button" value="Search" />
                </div>

                <Link to="/addcontact">
                    <button className="addContact__button">
                        Add new contact
                    </button>
                </Link>
            </div>
            
            <div className="contacts__container">
                {(contactsData) 
                    ? 
                    contactsData.map((contact) => (
                        <Contact
                            name= {contact?.name}
                            address= {contact?.address}
                            phoneNumber= {contact?.phoneNumber}
                            email= {contact?.email}
                            itemKey= {contact?.itemKey}
                        />
                    ))
                    :
                    <p className="empty">There are no contacts to show</p>}
            </div>

        </div>
    )
}

export default Contacts
