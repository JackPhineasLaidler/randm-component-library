'use client'

import React, { Component, useContext } from 'react';
import { FormContext } from '@/app/shared/components/form/Form';
import styles from './textarea.module.scss';
import Label from '@/app/shared/components/form/input-label/InputLabel';

export default function Textarea ({isRequired=true, label, inputId, placeholderText, rows=5}) {

    const handleChangeFnc = React.useContext(FormContext);

    return (
        <fieldset>
            {label ? <Label inputId={inputId} isRequired={isRequired} labelText={label}></Label> : null}
            <textarea
                id={inputId}
                required={isRequired}
                placeholder={placeholderText ? placeholderText : null}
                onChange={handleChangeFnc}
                type="text"
                rows={rows}
                className={styles.textarea}
            />
        </fieldset>
    );
}