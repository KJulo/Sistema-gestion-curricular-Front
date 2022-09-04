import React from 'react'

export function useGetCurrentDate () {
  let date = new Date();
  let year = date.getFullYear().toString();
  let month = (date.getMonth()+1).toString();
  let day = date.getDate().toString();

  month = month.length == 1 ? '0'+month : month;
  day = day.length == 1 ? '0'+day : day;

  return year+"-"+month+"-"+ day;
}

export function useGetCurrentYear () {
  const date = new Date;
	const currentYear = date.getFullYear().toString();
  return currentYear;
}

export function useGetCurrentMonth () {
  const date = new Date;
	const month = (date.getMonth()+1).toString();
  const currentMonth = month.length == 1 ? '0' + month : month;
  return currentMonth;
}

export function useGetCurrentDay () {
  const date = new Date;
	const day = date.getDate().toString();
  const currentDay = day.length == 1 ? '0' + day : day;
  return currentDay;
}

export function useGetDateDaysFirst (date) {
  const splitDate = date.split('-');
  const day = splitDate[2];
  const month = splitDate[1];
  const year = splitDate[0];

  return day+'-'+month+'-'+year
}

export function useGetDateMonthFirst (date) {
  const splitDate = date.split('-');
  const month = splitDate[1];
  const year = splitDate[0];

  return month+'-'+year
}

export function useIsSameMonth (dateMonth, wholeDate) {
  const firstDate = dateMonth.split('-');
  const secondDate = wholeDate.fecha.split('-');

  if (firstDate[0] == secondDate[1]) return true;
  return false;
}