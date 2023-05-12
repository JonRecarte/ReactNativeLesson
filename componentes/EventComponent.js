import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, Linking } from 'react-native';

const EventComponent = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [alarmTime, setAlarmTime] = useState(null);
    const [selectedTime, setSelectedTime] = useState(new Date());

    const handleConfirm = (date) => {
        setSelectedDate(date);
        setShowDateTimePicker(true);
        console.log('selectedDate:', selectedDate);
    };

    const handleAlarm = () => {
        if (alarmTime) {
            Linking.openURL(`alarm://?alarmtime=${alarmTime}`);
        }
    };

    const handleDateTimeChange = (event, date) => {
        if (date) {
            setSelectedTime(date);
            const newDate = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day, date.getHours(), date.getMinutes());
            setAlarmTime(newDate.getTime());
            console.log('selectedTime:', selectedTime);
        }
        setShowDateTimePicker(false);
    };

    return (
        <View>
            <Calendar onDayPress={handleConfirm} />
            {showDateTimePicker && (
                <DateTimePicker
                    mode="time"
                    value={selectedTime}
                    is24Hour={true}
                    display="default"
                    onChange={handleDateTimeChange}
                />
            )}
            {selectedDate && (
                <Text>
                    Fecha seleccionada: {selectedDate.day}/{selectedDate.month}/{selectedDate.year}
                </Text>
            )}
            <Button title="Establecer alarma" onPress={handleAlarm} disabled={!alarmTime} />
        </View>
    );
};

export default EventComponent;


