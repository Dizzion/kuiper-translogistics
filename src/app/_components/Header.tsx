'use client'
import React, { useEffect, useState } from 'react'
import pb from '../utils/pocketbase';
import { RecordModel } from 'pocketbase';

const Header: React.FC = () => {
  const [associate, setAssociate] = useState('');
  const [isUserIdInArray, setIsUserIdInArray] = useState(false);

  const handleUserIdEntered = async (enteredUserId: string) => {
    const collection = await pb
      .collection("WarehouseAssociates")
      .getFullList();
    setIsUserIdInArray(collection.some((obj) => obj.alias === enteredUserId));
    if (isUserIdInArray) {
      const aliasIndex = collection.findIndex(
        (record) => record.alias === enteredUserId
      );
      setAssociate(collection[aliasIndex].alias);
    }
  };

  useEffect(() => {

  }, [])

  return (
    <div>Header</div>
  )
}

export default Header