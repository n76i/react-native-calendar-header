import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';

import { shouldUpdate } from '../../../component-updater';

import styleConstructor from './style';
import moment from 'moment';

class Day extends Component {
  static displayName = 'IGNORE';

  static propTypes = {
    // TODO: disabled props should be removed
    state: PropTypes.oneOf(['disabled', 'today', '']),

    // Specify theme properties to override specific styles for calendar parts. Default = {}
    theme: PropTypes.object,
    marking: PropTypes.any,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    date: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
    this.onDayPress = this.onDayPress.bind(this);
    this.onDayLongPress = this.onDayLongPress.bind(this);
  }

  onDayPress() {
    this.props.onPress(this.props.date);
  }

  onDayLongPress() {
    this.props.onLongPress(this.props.date);
  }

  shouldComponentUpdate(nextProps) {
    return shouldUpdate(this.props, nextProps, ['state', 'children', 'marking', 'onPress', 'onLongPress']);
  }

  renderDots(marking) {
    const baseDotStyle = [this.style.dot, this.style.visibleDot];
    if (marking.dots && Array.isArray(marking.dots) && marking.dots.length > 0) {
      // Filter out dots so that we we process only those items which have key and color property
      const validDots = marking.dots.filter(d => (d && d.color));

      const isToday = moment(String(this.props.date.dateString), 'YYYY-MM-DD').isSame(moment(), 'day');

      return validDots.map((dot, index) => {
        return (
          <View key={dot.key ? dot.key : index} style={[baseDotStyle,
            {
              backgroundColor: marking.selected && dot.selectedDotColor ? '#0abde3' : dot.color,
              width: (isToday || marking.selected) ? 2.5 : 4,
              height: (isToday || marking.selected) ? 2.5 : 4,
              borderRadius: (isToday || marking.selected) ? 1.25 : 2
            }]} />
        );
      });
    }
    return;
  }

  render() {
    const containerStyle = [this.style.base];
    const textStyle = [this.style.text];

    const marking = this.props.marking || {};
    const dot = this.renderDots(marking);

    if (marking.selected) {
      containerStyle.push(this.style.selected);
      textStyle.push(this.style.selectedText);
      if (marking.selectedColor) {
        containerStyle.push({ backgroundColor: marking.selectedColor });
      }
    } else if (typeof marking.disabled !== 'undefined' ? marking.disabled : this.props.state === 'disabled') {
      textStyle.push(this.style.disabledText);
    } else if (this.props.state === 'today') {
      containerStyle.push(this.style.today);
      textStyle.push(this.style.todayText);
    }
    return (
      <TouchableOpacity
        testID={this.props.testID}
        style={[containerStyle, { paddingTop: 0, justifyContent: 'center' }]}
        onPress={this.onDayPress}
        onLongPress={this.onDayLongPress}>
        <Text allowFontScaling={false} style={textStyle}>{String(this.props.children)}</Text>
        {dot ? <View style={{ flexDirection: 'row' }}>{dot}</View> : null}
      </TouchableOpacity>
    );
  }
}

export default Day;
