import React, {Component} from 'react';
import classNames from 'classnames';
import Day from '../Day';
const style = require('./Month.scss');

export default class Month extends Component {
	shouldComponentUpdate(nextProps) {
		return (!nextProps.isScrolling && !this.props.isScrolling);
	}
	renderRows() {
		let {disabledDates, disabledDays, displayDate, locale, maxDate, minDate, onDaySelect, rowHeight, rows, selectedDate, today, theme, events} = this.props;
		let currentYear = today.date.year();
		let monthShort = displayDate.format('MMM');
		let monthRows = [];
		let day = 0;
		let isDisabled = false;
		let isSelected = false;
		let isToday = false;
		let isEvent = false;
		let isEventStart = false;
		let isEventMiddle = false;
		let isEventEnd = false;
		let eventsQty = 0;
		let row, date, days;

		// Oh the things we do in the name of performance...
		for (let i = 0, len = rows.length; i < len; i++) {
			row = rows[i];
			days = [];

			for (let k = 0, len = row.length; k < len; k++) {
				date = row[k];
				day++;

				isSelected = (selectedDate && date.yyyymmdd == selectedDate.yyyymmdd);
				isToday = (today && date.yyyymmdd == today.yyyymmdd);
				isDisabled = (
					minDate && date.yyyymmdd < minDate.yyyymmdd ||
					maxDate && date.yyyymmdd > maxDate.yyyymmdd ||
					disabledDays && disabledDays.length && disabledDays.indexOf(date.date.day()) !== -1 ||
					disabledDates && disabledDates.length && disabledDates.indexOf(date.yyyymmdd) !== -1
				);
				eventsQty = events.filter(event => date.yyyymmdd === event.eventStart && !event.eventEnd).length;
				isEvent = eventsQty > 0;
				isEventStart = events.filter(event => date.yyyymmdd === event.eventStart && event.eventEnd).length > 0;
				isEventMiddle = events.filter(event => date.yyyymmdd > event.eventStart && (event.eventEnd && date.yyyymmdd < event.eventEnd)).length > 0;
				isEventEnd = events.filter(event => date.yyyymmdd === event.eventEnd).length > 0;


				days[k] = (
					<Day
						key={`day-${day}`}
						currentYear={currentYear}
						date={date}
						day={day}
						handleDayClick={onDaySelect}
						isDisabled={isDisabled}
						isToday={isToday}
						isSelected={isSelected}
						locale={locale}
						monthShort={monthShort}
						theme={theme}
						isEvent={isEvent}
						isEventStart={isEventStart}
						isEventMiddle={isEventMiddle}
						isEventEnd={isEventEnd}
						eventsQty={eventsQty}
					/>
				);
			}
			monthRows[i] = (
				<ul className={classNames(style.row, {[style.partial]: row.length !== 7})} style={{height: rowHeight}} key={`Row-${i}`} role="row" aria-label={`Week ${i + 1}`}>
					{days}
				</ul>
			);
		}

		return monthRows;
	}
	render() {
		let {displayDate, today, rows, showOverlay, rowStyle, theme} = this.props;

		return (
			<div className={style.root} style={rowStyle}>
				<div className={style.rows}>
					{this.renderRows()}
					{showOverlay &&
						<label className={classNames(style.label, {[style.partialFirstRow] : (rows[0].length !== 7)})} style={theme && theme.overlayColor && {backgroundColor: theme.overlayColor}}>
							<span>{`${displayDate.format('MMMM')}${(!displayDate.isSame(today.date, 'year')) ? ' ' + displayDate.year() : ''}`}</span>
						</label>
					}
				</div>
			</div>
		);
	}
}
