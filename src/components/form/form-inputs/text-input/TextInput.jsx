"use client";

import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '@/app/shared/components/form/Form';
import Label from '@/app/shared/components/form/input-label/InputLabel';
import styles from './text-input.module.scss';

export default function TextInput ({isRequired=false, label, inputId, placeholderText, customInputValidation}) {

    const {handleInputChanges, formErrors} = React.useContext(FormContext);

    const [fieldError, setFieldError] = useState('');

    const handleInputChanged = (e) => {

        if (!handleInputChanges) return;

        if (fieldError) handleRemoveFieldError();

        const inputData = {
            id: inputId,
            value: e.target.value,
        };

        handleInputChanges(inputData);
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
            {fieldError ? <div>{fieldError}</div> : null}
            <input
                className={styles.textinput}
                id={inputId}
                required={isRequired}
                placeholder={placeholderText ? placeholderText : null}
                onChange={(e) => handleInputChanged(e)}
                type="text"
            />
        </>
    );
}