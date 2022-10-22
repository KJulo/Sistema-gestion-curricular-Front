import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteObjetiveManagement, editObjetiveManagement } from '@slices/teachers';

import { MinusCircleOutlined,} from '@ant-design/icons';
import { Typography, Popconfirm } from 'antd';
const { Text } = Typography;

const Objetive = ({unit, objetive, index}) => {
  const dispatch = useDispatch();
  const confirmText = '¿Deseas eliminar este objetivo?';

  function onEdit(value) {
    const objetiveUpdated = { ...objetive, descripcion: value }
    dispatch(editObjetiveManagement({unitId: unit.id, objetive: objetiveUpdated}))
  }

  function removeUnit(id) {
    dispatch(deleteObjetiveManagement({unitId: unit.id, objetiveId: id}))
  }

  return (
      <Typography>
        <pre>{index + ": "}
          <Text editable={{ onChange: onEdit }}>
            {objetive.descripcion}
          </Text>
            <Popconfirm placement="topLeft" title={confirmText} onConfirm={()=>removeUnit(objetive.id)} okText="Eliminar" cancelText="Cancelar">
              <MinusCircleOutlined />
            </Popconfirm>
        </pre>
      </Typography>
  )
}

export default Objetive;