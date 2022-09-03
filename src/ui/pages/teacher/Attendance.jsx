import React, { useState, useEffect } from 'react'

// antd
import { Checkbox, Collapse, Typography, Space, DatePicker, Button } from 'antd';
import moment from 'moment';
const { Title } = Typography;
const { Panel } = Collapse;


import "@styles/Attendance.less"

// components
import HomeNavBar from '@components/HomeNavBar';

// constants
import { teacher } from '@constants/users';
import { teacherMenu } from "@constants/menu.js"


let courses = [
	{
		id: "12s21ksjh2j12k4",
		nombre: "1ro Básico",
		año: "2022"
	},{
		id: "12sf424f234fj12k4",
		nombre: "2ro Básico",
		año: "2022"
	},{
		id: "12sf234f23d4d12k4",
		nombre: "3ro Básico",
		año: "2022"
	},
]

let data = [
  {
		id: '2k1928d9218',
    nombre: 'John Brown',
		idCurso: '12s21ksjh2j12k4',
  },
  {
		id: '2k2144ff39218',
    nombre: 'Jim Green',
		idCurso: '12s21ksjh2j12k4',
  },
  {
		id: '2kf432f423428',
    nombre: 'Karla Manson',
		idCurso: '12s21ksjh2j12k4',
  },
  {
		id: '2k193f42fsfs18',
		idCurso: "12sf424f234fj12k4",
    nombre: 'Joe Black',
  },
	{
		id: 'fqf14f124f1',
    nombre: 'John Brown',
		idCurso: '12sf424f234fj12k4',
  },
  {
		id: '2k212d1249218',
    nombre: 'Jim Green',
		idCurso: '12sf424f234fj12k4',
  },
  {
		id: '2k1923242gv218',
    nombre: 'Karla Manson',
		idCurso: '12sf234f23d4d12k4',
  },
  {
		id: '2k3f243g32gsfs18',
    nombre: 'Joe Black',
		idCurso: "12sf424f234fj12k4",
  },
];

const Attendance = () => {

	const currentDate = getCurrentDate();
	const [userState, setUserState] = useState(data)
	const [selectedDate, setSelectedDate] = useState(currentDate);

	useEffect(() => {
		setUserState(data.map((element) => {
			return { ...element, checked: false }
		}))
	}, [])

	useEffect(() => {
		console.log(selectedDate);
	}, [selectedDate])

	const onChange = (objDate, dateString) => {
		setSelectedDate(dateString)
	};

	const onClick = (course) => {
		let studentClass = userState.filter((student) => student.idCurso == course.id );
		// Cambio de nombre de la propiedad checked por la de presente
		const studentClassRenamed = studentClass.map(({checked: presente, ...rest}) => ({presente, ...rest})) // Datos finales a enviar a endpoint
	}
	
	function getCurrentDate () {
		let date = new Date();
		let year = date.getFullYear().toString();
		let month = (date.getMonth()+1).toString();
		let day = date.getDate().toString();

		month = month.length == 1 ? '0'+month : month;
		day = day.length == 1 ? '0'+day : day;

		return year+"-"+month+"-"+ day;
	}

	return (
		<div className="site-page-header-ghost-wrapper home-grid-layout all-height" style={{ margin: "0 40px 0 0", padding: 0 }}>
			<aside className='primary-bg-mobile'>
				<HomeNavBar toppics={teacherMenu} user={teacher} className='NavBar'/>
			</aside>

			<div className="content" style={{ marginTop: 60, marginLeft: 20 }}>
				<div className='header-container'>
					<Title>Módulo Asistencia</Title>
					<Space direction="vertical">
    				<DatePicker defaultValue={moment(currentDate, 'YYYY-MM-DD')} onChange={onChange} />
					</Space>
				</div>
					<Collapse>
						{courses.map((course, index) => (
							<Panel header={course.nombre} key={index}>
								<table className='table'>
									<thead className='thead'>
										<tr className='trHead'>
											<th>Presente/Ausente</th>
											<th>Presente</th>
										</tr>
									</thead>
									<tbody className='tbody'>
										{userState.map((student) => (
											student.idCurso == course.id ? (
												<tr className='trBody'>
													<td>{student.nombre}</td>
													<td>				
														<Checkbox
															type="checkbox"
															checked={student.checked}
															onChange={(event => {
																	setUserState(userState.map((element) => {
																		if (student.id == element.id) {
																			element.checked = event.target.checked;
																		}
																		return element;
																	}))
															})} />
													</td>
												</tr>
											) : null
										))}
									</tbody>
								</table>
								<Button type='primary' onClick={() => onClick(course)} style={{ marginTop: 10 }}>Guardar Cambios</Button>
							</Panel>
						))}
				</Collapse>
			</div>
		</div>
	)
}

export default Attendance;