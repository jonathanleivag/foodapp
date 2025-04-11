import React, { FC, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CountdownTimerProps, Timer } from '../../../../type'

const CountdownTimer: FC<CountdownTimerProps> = ({
  targetDate,
  minutesToAdd,
  currentDate,
  finished
}) => {
  const [referenceDate] = useState<Date>(() =>
    typeof currentDate === 'string' && currentDate !== ''
      ? new Date(currentDate)
      : new Date()
  )

  const getFinalTargetDate = (): Date => {
    const date = new Date(targetDate)
    date.setMinutes(date.getMinutes() + minutesToAdd)
    return date
  }

  const calculateTimeLeft = (): Timer => {
    const finalDate = getFinalTargetDate()
    const now = new Date() // Ahora usamos siempre la fecha actual
    const elapsed = +now - +referenceDate
    const difference = +finalDate - (+referenceDate + elapsed)

    let timeLeft = {
      hours: '0',
      minutes: '00',
      seconds: '00',
      isFinished: difference <= 0
    }

    if (difference > 0) {
      timeLeft = {
        hours: String(
          Math.floor((difference / (1000 * 60 * 60)) % 24)
        ).padStart(1, '0'),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
          2,
          '0'
        ),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
        isFinished: false
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, minutesToAdd])

  if (finished) {
    return (
      <View style={styles.container}>
        <Text style={styles.timerText}>¡Pedido listo!</Text>
      </View>
    )
  }

  if (timeLeft.isFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.timerText}>¡Tiempo terminado!</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    alignItems: 'center'
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f57c00'
  }
})

export default CountdownTimer
