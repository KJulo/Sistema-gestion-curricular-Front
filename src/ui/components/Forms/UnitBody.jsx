import React from 'react'
import { useDispatch } from 'react-redux'
import { appendObjetiveManagement } from '@slices/teachers';
import { randomId } from '@utils/randomId';

import { PlusOutlined } from '@ant-design/icons';
import { Typography, Button } from 'antd';

import { Objetive } from "@components";

const UnitBody = ({unit}) => {
  const dispatch = useDispatch();

  const addOjetive = (objetive) => {
    dispatch(appendObjetiveManagement({unit: unit, objetive: objetive}))
  }

  return (
    <>
      {unit.objetivos.length > 0 ?
        unit.objetivos.map((objetive, i) => (
          <Objetive unit={unit} objetive={objetive} index={i} />
        ))
      : <></>}

      <br></br>

      <Button type="dashed" block icon={<PlusOutlined />}
        onClick={() => addOjetive({
          id: randomId(),
          descripcion: 'Descripcion'
        })}
      >
        Añadir objetivo
      </Button>
    </>
  )
}

export default UnitBody;