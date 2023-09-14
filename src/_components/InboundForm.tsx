'use client';
import { RecordModel } from 'pocketbase';
import React, { useState } from 'react';

interface InboundFormProps {
    containers: RecordModel[];
    trackingNumbers: RecordModel[];
    sapTotes: RecordModel[];
}

const InboundForm: React.FC<InboundFormProps> = ({ containers, trackingNumbers, sapTotes }) => {
    const [enteredContId, setEnteredContId] = useState('');
    const [locationTag, setLocationTag] = useState('');
    const [enteredTracking, setEnteredTracking] = useState('');
    const [showAlert, setShowAlert] = useState(false);
  return (
    <></>
  );
};

export default InboundForm;