"use client";

import React, { useEffect, useState, useContext, useRef } from 'react'
import styles from './number-toggle.module.scss'
import { FormContext } from '@/app/shared/components/form/Form';
import Label from '@/app/shared/components/form/input-label/InputLabel';


export default function NumberToggle ({label, externalIncrementHandler, externalDecrementHandler, inputId, isRequired, customInputValidation, defaultQuantity}) {

    const {handleInputChanges, formErrors} = React.useContext(FormContext) || { handleInputChanges: null, formErrors: [] };;

    const [quantity, setQuantity] = useState(0);
    const [fieldError, setFieldError] = useState('');

    const toggleInputRef = useRef(null);

    const handleClicked = (callback) => {
        let currentCounter = quantity;

        const newQuantity = callback(currentCounter);

        setQuantity(newQuantity)
    }

    const increaseCount = (currentCounter) => {
        if (externalIncrementHandler) return externalIncrementHandler();
        return currentCounter + 1;
    }

    const decreaseCount = (currentCounter) => {
        if (externalDecrementHandler) return externalDecrementHandler();

        if (currentCounter === 0) return 0;
        return currentCounter - 1;
    }

    const handleRemoveFieldError = () => {
        setFieldError('');
    }


    useEffect(() => {
        if (!handleInputChanges) return;

        if (fieldError) handleRemoveFieldError();

        const inputData = {
            id: inputId,
            value: quantity,
        };

        handleInputChanges(inputData);
    }, [quantity]);


    useEffect(() => {
        if (formErrors.length === 0) return;
        formErrors.forEach(input => {
            if (input.id === inputId) setFieldError(input.errorMessage);
        })
    }, [formErrors]);

    useEffect(() => {
        if (defaultQuantity) setQuantity(defaultQuantity);
    }, [])

    return (
        <>
            {label ? <Label inputId={inputId} isRequired={isRequired} labelText={label}></Label> : null}
            <div className={styles.numberToggle}>
                {fieldError ? <div>{fieldError}</div> : null}
                <button type="button" disabled={quantity === 0} onClick={() => handleClicked(decreaseCount)}>-</button>
                <input ref={toggleInputRef} id={inputId} type="number" value={quantity} readOnly={true} tabIndex={-1}/>
                <button type="button" onClick={() => handleClicked(increaseCount)}>+</button>
            </div>
        </>
    )
}