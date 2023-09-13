'use client'
import { RecordModel } from 'pocketbase'
import React from 'react'

interface ReceivingFormProps {
    employees: RecordModel[];
    trackingNumbers: RecordModel[];
}

const ReceivingForm: React.FC<ReceivingFormProps> = ({ employees, trackingNumbers }) => {
  return (
    <div>ReceivingForm</div>
  )
}

export default ReceivingForm