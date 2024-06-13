'use client';

import styles from './select.module.scss';
import React, { useContext, useState, useEffect } from 'react';
import { FormContext } from '@/app/shared/components/form/Form';
import Label from '@/app/shared/components/form/input-label/InputLabel';

export default function Select ({options, inputId, isRequired=true, label, defaultOption, customInputValidation}) {
    
    const {handleChangeFnc, formErrors} = React.useContext(FormContext);

    const [fieldError, setFieldError] = useState('');


    const handleInputChanged = (e) => {
        if (!handleChangeFnc) return;

        if (fieldError) handleRemoveFieldError();

        const inputData = {
            id: inputId,
            value: e.target.value,
        };

        handleChangeFnc(inputData);
    }

    const handleRemoveFieldError = () => {
        setFieldError('');
    }

    useEffect(() => {
        if (formErrors.length === 0) return;
        formErrors.forEach(input => {
            if (input.id === inputId) setFieldError(input.errorMessage);
        })
    }, [formErrors])

    return (
        <>
            {label ? <Label inputId={inputId} isRequired={isRequired} labelText={label}></Label> : null}
            <select onChange={(e) => handleInputChanged(e)} defaultValue={defaultOption} className={styles.select} id={inputId} required={isRequired}>
                <option hidden disabled>{defaultOption}</option>
                {options.map((option, i) => {
                    return (
                        <option key={i}>{option}</option>
                    )
                })}
            </select>
        </>
    )
}