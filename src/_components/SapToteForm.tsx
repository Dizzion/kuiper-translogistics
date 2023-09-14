'use client'
import { HUUpdate, STCreate } from '@/utils/pocketbase';
import { RecordModel } from 'pocketbase';
import React, { useState } from 'react'
import HandlingUnitList from './HanldingUnitList';
import { Modal, Button, Form } from 'react-bootstrap';

interface SapToteFormProps {
    handlingUnits: RecordModel[];
}

const SapToteForm: React.FC<SapToteFormProps> = ({ handlingUnits }) => {
    const [uid, setUid] = useState(`SAP_${Date.now()}-${Math.floor(Math.random() * 10000)}`);
    const [HUids, setHUids] = useState<string[]>([]);
    const [enteredHandlingUnits, setEnteredHandlingUnits] = useState<number[]>([]);
    const [enteredHandlingUnit, setEnteredHandlingUnit] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [startTime, setStartTime] = useState(new Date());

    function handleClose() {
        setShowAlert(false);
        setEnteredHandlingUnit('');
    }

    const updateHandlingUnits = async (e: React.FormEvent) => {
        e.preventDefault();
        if (enteredHandlingUnits.length === 0) {
            setStartTime(new Date());
        }
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
        setHUids([...HUids, updatedHU.id]);
        setEnteredHandlingUnits([...enteredHandlingUnits, updatedHU.HU]);
        setEnteredHandlingUnit('');
    }

    const submitSapTote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (enteredHandlingUnits.length === 0) {
            return;
        }
        const SapToteCreated = {
            ToteID: uid,
            StartLoading: startTime,
            StagedTime: new Date(),
            HU: HUids,
            alias: localStorage.getItem("id") as string
        }
        const created = await STCreate(SapToteCreated);
        setUid(`SAP_${Date.now()}-${Math.floor(Math.random() * 10000)}`);
        setHUids([]);
        setEnteredHandlingUnit('');
        setEnteredHandlingUnits([]);
    }

  return (
    <>
        <Modal centered show={showAlert} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Handling Unit Not Valid</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This is not a valid Handling Unit make sure you scanning the write barcode.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Form onSubmit={submitSapTote}>
          <Form.Label className="text-white">Tote ID</Form.Label>
          <Form.Control disabled size="lg" value={uid} />
          <Button type="submit" variant="outline-light">
            Submit SAP Tote
          </Button>
        </Form>
        <Form onSubmit={updateHandlingUnits}>
          <Form.Label className="text-white">Handling Unit</Form.Label>
          <Form.Control
            type="Handling Unit"
            required
            value={enteredHandlingUnit}
            onChange={(e) =>
              setEnteredHandlingUnit(e.target.value)
            }
          />
        </Form>

        <HandlingUnitList handlingUnits={enteredHandlingUnits} />
      </>
  )
}

export default SapToteForm