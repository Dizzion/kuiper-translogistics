import { RecordModel } from 'pocketbase'
import React from 'react'

interface DisplayContainerProps {
    container: RecordModel;
    trackingNumbers: RecordModel[];
    sapTotes: RecordModel[];
}

const DisplayContainer: React.FC<DisplayContainerProps> = ({ container, trackingNumbers, sapTotes }) => {
  return (
    <div>DisplayContainer</div>
  )
}

export default DisplayContainer