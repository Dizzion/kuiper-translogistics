'use client'
import { RecordModel } from 'pocketbase'
import React from 'react'

interface OutboundFormProps {
    sapTotes: RecordModel[];
    trackingNumbers: RecordModel[];
}

const OutboundForm: React.FC<OutboundFormProps> = ({ sapTotes, trackingNumbers }) => {
  return (
    <div>OutboundForm</div>
  )
}

export default OutboundForm