import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ExpoCalendar from 'expo-calendar';

const EventComponent = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date());

    const handleConfirm = (date) => {
        const selectedDate = new Date(date.timestamp);
        if (selectedDate.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) {
            setSelectedDate(date);
            setShowDateTimePicker(true);
        }
    };

    const handleDateTimeChange = async (event, date) => {
        setShowDateTimePicker(false);

        if (date && selectedDate) {
            const selectedDateTime = new Date(selectedDate.timestamp);
            selectedDateTime.setHours(date.getHours(), date.getMinutes());

            if (selectedDateTime < new Date()) {
                setSelectedTime(new Date());
            } else {
                setSelectedTime(date);
            }

            // Crear evento en el calendario
            const calendarId = await getCalendarId();
            const eventDetails = {
                title: 'Nuevo evento',
                startDate: selectedDateTime,
                endDate: selectedDateTime,
                timeZone: 'America/New_York',
            };
            const eventId = await ExpoCalendar.createEventAsync(calendarId, eventDetails);
            Alert.alert('Evento creado', `El evento con ID ${eventId} ha sido creado en el calendario`);
        }
    };

    const minimumDate = new Date(); // Fecha actual

    // Función para obtener el ID del calendario
    const getCalendarId = async () => {
        const calendar = await ExpoCalendar.getDefaultCalendarAsync();
        return calendar.id;
    };

    return (
        <View>
            <Calendar onDayPress={handleConfirm} />
            {showDateTimePicker && (
                <DateTimePicker
                    mode="time"
                    value={selectedTime}
                    is24Hour={true}
                    minimumDate={minimumDate}
                    onChange={handleDateTimeChange}
                />
            )}
            {selectedDate && (
                <Text>
                    Fecha seleccionada: {selectedDate.day}/{selectedDate.month}/{selectedDate.year}{'   '}
                    {selectedTime.getHours()}:{selectedTime.getMinutes()}
                </Text>
            )}
        </View>
    );
};

export default EventComponent;
