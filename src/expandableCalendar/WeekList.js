import React, { Component } from 'react'
import { Text, View, ScrollView, Dimensions, Animated, Platform } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';

const { width, height } = Dimensions.get('window');
const marginLeft = 15;
const marginRight = 15;
const widthItem = (width - marginLeft * 3 - marginRight) / 3

// get start and end date from current date (format YYYY-MM-DD)
export const weekDuration = (date) => {
  var now = moment(date, 'YYYY-MM-DD');
  var monday = now.clone().weekday(0);
  var sunday = now.clone().weekday(6);
  return weekDetail(monday, sunday);
}

export const weekDetail = (monday, sunday) => {
  return {
    weekNumber: monday.weeks(),
    title: `Tuần ${monday.weeks()}`,
    startDay: monday.format('YYYY-MM-DD'),
    endDay: sunday.format('YYYY-MM-DD'),
    shortString: `${monday.format('D/M')} - ${sunday.format('D/M')}`
  }
}

// get last week, current week, next week (total 9 weeks)
export const getWeeks = (date) => {
  var now = moment(date, 'YYYY-MM-DD');

  return [
    weekDuration(now.clone().add('days', -28)),
    weekDuration(now.clone().add('days', -21)),
    weekDuration(now.clone().add('days', -14)),
    weekDuration(now.clone().add('days', -7)),
    weekDuration(now),
    weekDuration(now.clone().add('days', 7)),
    weekDuration(now.clone().add('days', 14)),
    weekDuration(now.clone().add('days', 21)),
    weekDuration(now.clone().add('days', 28)),
  ];
}

export default class WeekList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weeks: getWeeks(moment().format('YYYY-MM-DD')),
      currentWeek: moment().format('YYYY-MM-DD'),
    }
    this.ref = null;
  }

  componentDidMount() {
    const date = (this.props.current ? moment(this.props.current, 'YYYY-MM-DD') : moment()).format('YYYY-MM-DD');
    const data_weeks = getWeeks(date);
    this.setState({ weeks: data_weeks, currentWeek: date });

    setTimeout(() => this.ref.scrollTo({ x: width, animated: false }), 1);
  }

  renderItem = (item, index) => {
    const weekNumber = (this.props.current ? moment(this.props.current, 'YYYY-MM-DD') : moment()).weeks();

    const textTitleColor = item.weekNumber === weekNumber ? '#fff' : 'rgba(255, 255, 255, 0.5)';
    const textDayColor = item.weekNumber === weekNumber ? '#0abde3' : 'rgba(255, 255, 255, 0.5)';
    const backgroundColor = item.weekNumber === weekNumber ? '#fff' : 'rgba(255, 255, 255, 0.0)';

    const isCurrentWeek = moment().isBetween(moment(item.startDay, 'YYYY-MM-DD'), moment(item.endDay, 'YYYY-MM-DD'));

    return (
      <TouchableOpacity style={{
        width: widthItem,
        marginLeft,
        marginRight: (index + 1) % 3 === 0 ? marginRight : 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Platform.OS === 'android' ? 0 : 18,
        marginTop: Platform.OS === 'android' ? 0 : 10,
      }}
        onPress={() => {
          this.props.onWeekChange && this.props.onWeekChange(item.startDay, item);
        }} >
        <Text style={{
          fontSize: 14,
          fontWeight: '500',
          color: textTitleColor,
        }}>{`${item.title}`}</Text>
        <View style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: isCurrentWeek ? '#ffffff' : textTitleColor,
          width: '100%',
          backgroundColor,
          marginTop: 5,
        }}>
          <Text style={{
            paddingVertical: 6,
            fontSize: 14,
            fontWeight: '500',
            textAlign: 'center',
            color: textDayColor
          }}>
            {item.shortString}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { weeks } = this.state;

    return (
      <ScrollView
        style={{
          width,
          paddingTop: 2,
          marginBottom: 8,
          height: 70
        }}
        ref={ref => this.ref = ref}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={({ nativeEvent }) => {
          const x = nativeEvent.contentOffset.x
          if (x % width === 0 && x === width * 2) {
            const week = weeks[7];
            const data_weeks = getWeeks(week.startDay);
            // this.props.onWeekChange && this.props.onWeekChange(week.startDay, week);
            this.setState({ weeks: data_weeks, currentWeek: week.startDay }, () => {
              this.ref.scrollTo({ x: x - width, animated: false });
            })
          } else if (x % width === 0 && x === 0) {
            const week = weeks[1];
            const data_weeks = getWeeks(week.startDay);
            this.setState({ weeks: data_weeks, currentWeek: week.startDay }, () => {
              this.ref.scrollTo({ x: x + width, animated: false });
            })
            // this.props.onWeekChange && this.props.onWeekChange(week.startDay, week);
          }
        }}>
        {
          this.state.weeks.map(this.renderItem)
        }
      </ScrollView>
    )
  }
}
