import React, { useState, useEffect } from 'react'
import { Checkbox, Button, Typography } from 'antd';

import "@styles/Attendance.less"

// components
import HomeNavBar from '@components/HomeNavBar';

// constants
import { student } from '@constants/users';
import { studentMenu } from "@constants/menu.js"

const { Title } = Typography;

let course = {
	id: "12s21ksjh2j12k4",
	nombre: "1ro Básico",
	año: "2022"
}

let data = [
  {
		id: '2k1928d9218',
    nombre: 'John Brown',
    presente: false
  },
  {
		id: '2k2144ff39218',
    nombre: 'Jim Green',
    presente: false
  },
  {
		id: '2k1923242gv218',
    nombre: 'Karla Manson',
    presente: false
  },
  {
		id: '2k193f42fsfs18',
    nombre: 'Joe Black',
    presente: false
  },
];

const Attendance = () => {

	const [userState, setUserState] = useState(data)

	useEffect(() => {
		setUserState(data.map((element) => {
			return { ...element, checked: false }
		}))
	}, [])

	return (
		<div className="site-page-header-ghost-wrapper home-grid-layout all-height" style={{ margin: "0 40px 0 0", padding: 0 }}>
			<aside className='primary-bg-mobile'>
				<HomeNavBar toppics={studentMenu} user={student} className='NavBar'/>
			</aside>

			<div className="content" style={{ marginTop: 60, marginLeft: 20 }}>
				<Title> {course.nombre} </Title>
				<table className='table'>
					<thead className='thead'>
						<tr className='trHead'>
							<th>Presente/Ausente</th>
							<th>Presente</th>
						</tr>
					</thead>
					<tbody className='tbody'>
						{userState.map((student) => (
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
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Attendance;