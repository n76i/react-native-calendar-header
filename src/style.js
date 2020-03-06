import { Platform } from 'react-native';

export const foregroundColor = '#0abde3';
export const backgroundColor = '#f4f4f4'; // Agenda's reservations bg color
export const separatorColor = '#e8e9ec'; // not in use

export const processedColor = '#a7e0a3';
export const processingColor = '#ffce5c';
export const failedColor = '#f67e7e';

export const textDefaultColor = '#ffffff';
export const textColor = '#ffffff';
export const textLinkColor = '#fff';
export const textSecondaryColor = 'rgba(255, 255, 255, 0.5)';

export const textDayFontFamily = 'System';
export const textMonthFontFamily = 'System';
export const textDayHeaderFontFamily = 'System';
export const todayButtonFontFamily = 'System';

export const textDayFontWeight = '500';
export const textMonthFontWeight = '500';
export const textDayHeaderFontWeight = '500';
export const todayButtonFontWeight = '600';

export const textDayFontSize = 14;
export const textMonthFontSize = 16;
export const textDayHeaderFontSize = 14;
export const todayButtonFontSize = 14;

export const textDayStyle = undefined;
export const dotStyle = undefined;
export const arrowStyle = undefined;

export const calendarBackground = '#00000000';
export const textSectionTitleColor = '#ffffff';
export const selectedDayBackgroundColor = textLinkColor;
export const selectedDayTextColor = foregroundColor;
export const todayBackgroundColor = undefined;
export const todayTextColor = textLinkColor;
export const dayTextColor = textDefaultColor;
export const textDisabledColor = '#d9e1e8';
export const dotColor = textLinkColor;
export const selectedDotColor = '#4ac4f7';
export const disabledDotColor = '#ffffff';
export const todayDotColor = undefined;
export const arrowColor = textLinkColor;
export const monthTextColor = textDefaultColor;
export const indicatorColor = undefined; // use the default color of React Native ActivityIndicator
export const agendaDayTextColor = '#7a92a5';
export const agendaDayNumColor = '#7a92a5';
export const agendaTodayColor = textLinkColor;
export const agendaKnobColor = Platform.OS === 'ios' ? '#f2F4f5' : '#4ac4f7';
export const todayButtonTextColor = textLinkColor;
export const todayButtonPosition = undefined; // right' / 'left' (default)
