import React, { Fragment, Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Platform,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import { ExpandableCalendar, AgendaList, CalendarProvider, LocaleConfig } from './';
import WeekList, { weekDuration } from './expandableCalendar/WeekList';

import moment from 'moment';

const IS_IOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');

LocaleConfig.locales['vn'] = {
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay'
};
LocaleConfig.defaultLocale = 'vn';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: moment().format('YYYY-MM-DD'),
      weekNumber: moment().week(),
      header_title: moment().format('D MMMM').replace(/[a-z]/, c => c.toUpperCase()),
      weekView: false,
    }
  }

  onDateChanged = (date, updateSource) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
    updateSource && this.updateHeaderTitle(date);
  }

  updateHeaderTitle(date) {
    this.props.onDateChanged && this.props.onDateChanged(date);
    this.setState({ current: date, header_title: moment(date, 'YYYY-MM-DD').format('D MMMM').replace(/[a-z]/, c => c.toUpperCase()) })
  }

  onMonthChanged = (month, updateSource) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
    this.props.onDateChanged && this.props.onDateChanged(month.dateString);
    updateSource && this.updateHeaderTitle(month.dateString);
  }

  onWeekChanged = (date, week) => {
    this.props.onWeekChanged && this.props.onWeekChanged(week);
    this.setState({ current: date, header_title: week.title })
  }

  render() {
    const { current, header_title, weekView } = this.state;
    const { sections } = this.props;

    // console.log(width)
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#f7f8f9',
      }}>
        {/* <StatusBar backgroundColor="transparent" barStyle="light-content" /> */}
        <LinearGradient
          style={{ width, height, paddingTop: Platform.OS === 'android' ? 0 : 0 }}
          colors={['rgb(0,135,193)', 'rgb(0,211,186)']}
          start={{ x: 1, y: 0.5 }}
          end={{ x: -0.2, y: 0.5 }}>
          <View style={{
            width: '100%',
            flexDirection: 'row',
            paddingLeft: 28,
            paddingRight: 5,
          }}>
            <TouchableOpacity style={{
              flex: 1,
              paddingTop: Platform.select({ ios: 24, android: 0 }) + 13,
            }}>
              <Text style={{
                fontSize: 24,
                fontWeight: '500',
                color: '#fff'
              }}>{header_title}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_header}
              onPress={() => {
                if (!weekView) {
                  var title = weekDuration(this.state.current).title;
                } else {
                  var title = moment(current, 'YYYY-MM-DD').format('D MMMM').replace(/[a-z]/, c => c.toUpperCase())
                }

                this.setState({ weekView: !weekView, header_title: title });
              }}>
              <Image style={styles.image24} source={require('./img/iconActionViewDay24Px.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_header}
              onPress={() => {
                this.props.onSearchPress && this.props.onSearchPress();
              }}>
              <Image style={styles.image24} source={require('./img/iconActionSearch24Px.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_header}
              onPress={() => {
                this.props.onFilterPress && this.props.onFilterPress();
              }}>
              <Image style={styles.image24} source={require('./img/iconContentFilterList24Px.png')} />
            </TouchableOpacity>
          </View>
          <CalendarProvider
            style={{
              marginTop: 8,
            }}
            date={moment().format("YYYY-MM-DD")}
            onDateChanged={this.onDateChanged}
            onMonthChange={this.onMonthChanged}
            // showTodayButton
            disabledOpacity={0.6}
          // theme={{
          //   todayButtonTextColor: themeColor
          // }} 
          // todayBottomMargin={16}
          >
            {weekView ?
              <WeekList
                current={this.state.current}
                onWeekChange={this.onWeekChanged}
                firstDay={1}
                markedDates={this.props.markedDates}
              /> :
              <ExpandableCalendar
                // horizontal={false}
                hideArrows
                // disablePan
                markingType={'multi-dot'}
                // hideKnob
                initialPosition={ExpandableCalendar.positions.CLOSE}
                // calendarStyle={styles.calendar}
                // headerStyle={styles.calendar} // for horizontal only
                disableWeekScroll={false}
                firstDay={1}
                markedDates={this.props.markedDates} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
              />
            }
            <AgendaList
              {...this.props}
              sections={this.props.sections}
              extraData={this.state}
              renderItem={this.props.renderItem}
              renderSectionHeader={this.props.renderSectionHeader}
              style={{
                backgroundColor: '#f7f8f9',
                minHeight: height - 150
              }}
              ListFooterComponentStyle={{ minHeight: 100 }}
              stickySectionHeadersEnabled={this.props.stickySectionHeadersEnabled}
            />
          </CalendarProvider>
        </LinearGradient>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    position: 'absolute'
  },
  header_container: {
    paddingLeft: 19,
    flexDirection: 'row',
    paddingTop: 21,
    width: '100%'
  },
  text_small: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    flex: 1,
    fontSize: 15
  },
  button_header: {
    paddingTop: Platform.select({ ios: 24, android: 0 }) + 13,
    paddingHorizontal: 15,
  },
  image24: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
