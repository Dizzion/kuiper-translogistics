'use client'
import { RecordModel } from 'pocketbase';
import React from 'react'

interface SapToteFormProps {
    handlingUnits: RecordModel[];
}

const SapToteForm: React.FC<SapToteFormProps> = ({ handlingUnits }) => {
  return (
    <div>SapToteForm</div>
  )
}

export default SapToteForm