import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteValueManagement, editValueManagement } from '@slices/teachers';

import { MinusCircleOutlined,} from '@ant-design/icons';
import { Typography, Popconfirm } from 'antd';
const { Text } = Typography;

const Value = ({unit, value, index}) => {
  const dispatch = useDispatch();
  const confirmText = '¿Deseas eliminar este objetivo?';

  function onEdit(newValue) {
    const valueUpdated = { ...value, descripcion: newValue }
    dispatch(editValueManagement({unitId: unit.id, value: valueUpdated}))
  }

  function removeUnit(id) {
    dispatch(deleteValueManagement({unitId: unit.id, valueId: id}))
  }

  return (
      <Typography>
        <pre>{index + ": "}
          <Text editable={{ onChange: onEdit }}>
            {value.descripcion}
          </Text>
            <Popconfirm placement="topLeft" title={confirmText} onConfirm={()=>removeUnit(value.id)} okText="Eliminar" cancelText="Cancelar">
              <MinusCircleOutlined />
            </Popconfirm>
        </pre>
      </Typography>
  )
}

export default Value;