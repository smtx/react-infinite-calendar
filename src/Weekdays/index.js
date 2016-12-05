import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import moment from 'moment';
import range from 'lodash/range';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
const style = require('./Weekdays.scss');


export default class Weekdays extends Component {
	static propTypes = {
		locale: PropTypes.object,
		theme: PropTypes.object
	};
	shouldComponentUpdate(nextProps) {
		return shallowCompare(this, nextProps);
	}
	render() {
		let {theme} = this.props;

		return (
			<ul className={style.root} style={{backgroundColor: theme.weekdayColor, color: theme.textColor.active, paddingRight: getScrollbarSize}} aria-hidden={true}>
				{range(0,7).map((val, index) => {
					return (
						<li key={`Weekday-${index}`} className={style.day}>{moment().weekday(index).format('ddd')}</li>
					);
				})}
			</ul>
		);
	}
}
