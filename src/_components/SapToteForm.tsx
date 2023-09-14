'use client'
import { HUUpdate } from '@/utils/pocketbase';
import { RecordModel } from 'pocketbase';
import React, { useState } from 'react'

interface SapToteFormProps {
    handlingUnits: RecordModel[];
}

const SapToteForm: React.FC<SapToteFormProps> = ({ handlingUnits }) => {
    const [uid, setUid] = useState(`SAP_${Date.now()}-${Math.floor(Math.random() * 10000)}`);
    const [enteredHandlingUnits, setEnteredHandlingUnits] = useState<number[]>([]);
    const [enteredHandlingUnit, setEnteredHandlingUnit] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    function handleClose() {
        setShowAlert(false);
    }

    const updateHandlingUnits = async (e: React.FormEvent) => {
        e.preventDefault();
        const enteredIndex = handlingUnits.findIndex((obj) => obj.HU === enteredHandlingUnit);
        if ((enteredIndex === -1) || (/^(199|133|299|233)/.test(enteredHandlingUnit))) {
            setShowAlert(true);
            return;
        } 
        const HUtoUpdate = {
            HU: handlingUnits[enteredIndex].HU,
            ToQI: handlingUnits[enteredIndex].ToQI,
            StagedTime: new Date(),
            alias: localStorage.getItem("id") as string
        }
        const updatedHU = await HUUpdate(handlingUnits[enteredIndex].id, HUtoUpdate);
        setEnteredHandlingUnits([...enteredHandlingUnits, updatedHU.HU]);
    }

  return (
    <div>SapToteForm</div>
  )
}

export default SapToteForm