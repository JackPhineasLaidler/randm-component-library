"use client";

import React, { useRef, createContext, useState, useEffect } from 'react';
import styles from './form.module.scss';

export const FormContext = createContext();

export default function Select (props) {

    const [inputs, setInputs] = useState([]);
    const [formErrors, setFormErrors] = useState([]);

    const form = useRef();


    const checkForInputErrors = () => {
        const erroredInputs = [];
        const successfulInputs = {};

        inputs.forEach(input => {
            if (input.customInputValidation) {
                const inputErrorMessage = input.customInputValidation(input.value);

                if (inputErrorMessage) {
                    const erroredInput = {
                        ...input,
                        errorMessage: inputErrorMessage
                    };

                    erroredInputs.push(erroredInput)
                } else {
                    successfulInputs[input.label.toLowerCase()] = input.value;
                }
            }
        });
        return [erroredInputs, successfulInputs];
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //SET FORM ERRORS TO EMPTY ON NEW SUBMIT
        setFormErrors([]);

        const [erroredInputs, successfulInputs] = checkForInputErrors();

        //PUSH FORM ERRORS TO STATE
        if (erroredInputs.length > 0) return setFormErrors(erroredInputs);

        props.submitFunction(successfulInputs);

    }

    useEffect(() => { //SETS INITITAL INPUTS OF FORM TO STATE
        if (!props.children) return;

        console.log(props.children) 

        const inputArray = [];
        props.children.map(input => {
            //IF NOT AN INPUT (HAS NO INPUT ID)
            if (!input.props.inputId) return;

            const inputData = {
                required: input.props.isRequired,
                id: input.props.inputId,
                customInputValidation: input.props.customInputValidation,
                label: input.props.label
            };

            inputArray.push(inputData)
        });

        setInputs(inputArray)
    }, [])


    const handleInputChanges = (inputData) => { //ADDS VALUE TO EXISTING INPUTS IN STATE
        const index = inputs.findIndex(input => input.id === inputData.id);
        if (index === -1) return;
        
        const updatedInputs = [...inputs];
        updatedInputs[index] = {
            ...updatedInputs[index],
            value: inputData.value
        };

        setInputs(updatedInputs);
    }

    return (
        <form ref={form} className={styles.form} onSubmit={handleSubmit}>
            <FormContext.Provider value={{handleInputChanges, formErrors}}>
                {props.children.map((child, index) => {
                    return (
                        child.props.inputId ? <fieldset key={index}>{child}</fieldset> : child
                    )
                })}
            </FormContext.Provider>
        </form>
    )
}