import React from 'react';
const style = require('./Day.scss');

export default function Day({
	currentYear,
	date,
	day,
	handleDayClick,
	isDisabled,
	isToday,
	isSelected,
	monthShort,
	locale,
	theme,
	isEventStart,
	isEventMiddle,
	isEventEnd,
	eventsList,
}) {
	var {date: mmt, yyyymmdd} = date;
	var year = mmt.year();

	return (
		<li
			style={(isToday) ? {color: theme.todayColor} : null}
			className={`
				${style.root}${isToday ? ' ' + style.today : ''}
				${isSelected ? ' ' + style.selected : ''}
				${isDisabled ? ' ' + style.disabled : ' ' + style.enabled}
				${eventsList.length > 0 ? ' ' + style.event : ''}
				${isEventStart && !isEventMiddle && !isEventEnd ? ' ' + style.eventStart : ''}
				${isEventMiddle ? ' ' + style.eventMiddle : ''}
				${isEventEnd && !isEventMiddle && !isEventStart ? ' ' + style.eventEnd : ''}
			`}
			data-date={yyyymmdd}
			onClick={(!isDisabled && handleDayClick) ? handleDayClick.bind(this, mmt, eventsList) : null}
		>
			{(eventsList.length > 1) &&	<span className={style.multipleEvents} style={{backgroundColor: ((isEventStart && !isEventEnd) || isEventMiddle || (!isEventStart && isEventEnd) ) ? '#ff0000' : '#0077ff'}}>{`x${eventsList.length}`}</span>}
			{(day === 1) && <span className={style.month}>{monthShort}</span>}
			<span>{day}</span>
			{(day === 1 && currentYear !== year) && <span className={style.year}>{year}</span>}
			{isSelected &&
				<div className={`
						${isEventStart ? ' ' + style.selectionStart : ''}
						${isEventMiddle ? ' ' + style.selectionMiddle : ''}
						${isEventEnd && !isEventMiddle? ' ' + style.selectionEnd : ''}
						${!isEventStart && !isEventMiddle && !isEventEnd? ' ' + style.selection : ''}
					`} style={{backgroundColor: (typeof theme.selectionColor == 'function') ? theme.selectionColor(mmt) : theme.selectionColor, color: theme.textColor.active}}>
					<span className={style.month}>{(isToday) ? (locale.todayLabel.short || locale.todayLabel.long) : monthShort}</span>
					<span className={style.day}>{day}</span>
				</div>
			}
		</li>
	);
}
