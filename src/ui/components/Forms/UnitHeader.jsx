import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteUnitManagement, updateUnitManagement } from '@slices/teachers';

import { MinusCircleOutlined } from '@ant-design/icons';
import { Typography, Popconfirm } from 'antd';
const { Text } = Typography;

const UnitHeader = ({unit}) => {
  const dispatch = useDispatch();
  const confirmText = '¿Deseas eliminar esta unidad?';

  function onEdit(value) {
    const unitUpdated = { ...unit, nombre: value }
    dispatch(updateUnitManagement(unitUpdated))
  }
  function removeUnit(unit) {
    dispatch(deleteUnitManagement(unit))
  }

  return (
    <>
      <Text editable={{ onChange: onEdit }}>{unit.nombre}</Text>
      <Popconfirm placement="topLeft" title={confirmText} onConfirm={()=>removeUnit(unit)} okText="Eliminar" cancelText="Cancelar">
        <MinusCircleOutlined />
      </Popconfirm>
    </>
  )
}

export default UnitHeader