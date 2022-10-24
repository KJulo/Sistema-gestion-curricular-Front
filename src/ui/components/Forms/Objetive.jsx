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
    let objetiveUpdated;
    if (value.search(':') == -1) {
      objetiveUpdated = { ...objetive, descripcion: (index+1) + ": " + value }
    } else {
      objetiveUpdated = { ...objetive, descripcion: value }
    }
    dispatch(editObjetiveManagement({unitId: unit.id, objetive: objetiveUpdated}))
  }

  function removeObjetive(id) {
    dispatch(deleteObjetiveManagement({unitId: unit.id, objetiveId: id}))
  }

  return (
      <Typography>
        <pre>
          <Text editable={{ onChange: onEdit }}>
            {objetive.descripcion}
          </Text>
            <Popconfirm placement="topLeft" title={confirmText} onConfirm={()=>removeObjetive(objetive.id)} okText="Eliminar" cancelText="Cancelar">
              <MinusCircleOutlined />
            </Popconfirm>
        </pre>
      </Typography>
  )
}

export default Objetive;