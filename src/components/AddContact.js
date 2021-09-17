import React, { useState } from 'react';
import './AddContact.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveContact, saveCurrentContact, selectCurrentContact } from '../features/contactSlice.js';
import { useHistory } from "react-router-dom";

function AddContact() {
    const currentContact = useSelector(selectCurrentContact);
    const [name, setName] = useState(currentContact?.name);
    const [email, setEmail] = useState(currentContact?.email);
    const [address, setAddress] = useState(currentContact?.address);
    const [phoneNumber, setPhoneNumber] = useState(currentContact?.phoneNumber);

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    const generateUniqueKey = (pre) => {
        return `${ pre }_${ new Date().getTime() }`;
    }

    function isValid() {
        const errorMessage = 'Error: This is mandatory field';
        var ok= true;

        if(!name) {
            ok= false;
            setNameError(errorMessage);
        }
        else setNameError('');

        if(email?.length <= 10 || !(email?.includes('@gmail.com') || email?.includes('@yahoo.com'))){
            ok=false;
            if(!email) setEmailError(errorMessage);
            else setEmailError("Please enter the email id in proper format. example: abc@gmail.com || abc@yahoo.com");
        }
        else setEmailError('');

        if(!address){
            ok=false;
            setAddressError(errorMessage);
        }
        else setAddressError('');

        if(Number(phoneNumber?.trim()) < 7000000000 
            || Number(phoneNumber?.trim()[0]) < 7
            || isNaN(Number(phoneNumber?.trim()))){
            ok=false;
            if(!phoneNumber) setPhoneNumberError(errorMessage)
            else setPhoneNumberError("Please enter the Phone number in proper format. example: 9786312456");
        }
        else setPhoneNumberError('');

        return ok;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isValid()){
            alert("Form Submitted Successfully");
            var data = [];
            try {
                var temp= JSON.parse(localStorage.getItem('contacts-data-list'));
                if(temp?.length) data = temp;
            } catch (error) {
                alert(error.errorMessage);
            }

            const generatedKey = generateUniqueKey(name);
            let newData = {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                address: address,
                itemKey: generatedKey,
            }
            
            data?.push(newData);
            localStorage.setItem('contacts-data-list', JSON.stringify(data));
            setName('');
            setEmail('');
            setPhoneNumber('');
            setAddress('');

            dispatch(saveCurrentContact(null));
            history.push('/');
        }
    }

    return (
        <div className="addcontact">
            {(currentContact)? <h2>Edit Contact</h2>
            :<h2>Add new contact</h2>}

            {/* Add new contact form */}
            <form className="form__container">

                <div className="form__inputs">
                    <label htmlFor="name">Contact's Name</label>
                    <input 
                        type="text" 
                        maxLength="50" 
                        name="name"
                        value={name}
                        required
                        onChange={e => setName(e.target.value)}
                    />
                    <p className="form__error">{nameError}</p>
                </div>
                <div className="form__inputs">
                    <label htmlFor="number">Mobile Number</label>
                    <input 
                        type="tel" 
                        pattern="[7-9]{1}[0-9]{9}" 
                        name="number"
                        value={phoneNumber}
                        required
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                    <p className="form__error">{phoneNumberError}</p>
                </div>

                <div className="form__inputs">
                    <label htmlFor="address__text">Address</label>
                    <textarea 
                        required
                        className="address__text"
                        type="text" 
                        maxLength= "250"
                        name="address__text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                    <p className="form__error">{addressError}</p>
                </div>

                <div className="form__inputs">
                    <label htmlFor="email">Email Id</label>
                    <input 
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <p className="form__error">{emailError}</p>
                </div>

                <button className="form__submit" type="button" onClick={handleSubmit}>
                    Save
                </button>

            </form>

        </div>
    )
}

export default AddContact
