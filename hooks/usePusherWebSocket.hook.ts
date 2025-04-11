import { useEffect, useRef } from 'react'
import { usePusherWebSocketProps } from '../type'
import { getENV } from '../config/env.config'
import { ENV } from '../enum'

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
export function usePusherWebSocket({
  channelName,
  eventName,
  onMessage
}: usePusherWebSocketProps): void {
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const appKey = getENV(ENV.EXPO_PUBLIC_KEY_PUSHER)
    const cluster = getENV(ENV.EXPO_PUBLIC_CLUSTER_PUSHER)

    const wsUrl = `wss://ws-${cluster}.pusher.com/app/${appKey}?protocol=7&client=js&version=4.4.0`
    const socket = new WebSocket(wsUrl)
    socketRef.current = socket

    socket.onopen = () => {
      console.log('🔌 WebSocket abierto')

      const subscribeMessage = {
        event: 'pusher:subscribe',
        data: { channel: channelName }
      }

      socket.send(JSON.stringify(subscribeMessage))
      console.log('📡 Suscrito al canal:', channelName)
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      console.log('📨 Mensaje recibido:', message)

      if (message.event === eventName) {
        const data = JSON.parse(message.data)
        console.log('🎉 Evento recibido:', data)
        onMessage(data) // 👈 Aquí ejecutas tu callback personalizado
      }

      if (message.event === 'pusher:connection_established') {
        const connectionData = JSON.parse(message.data)
        console.log('✅ Conexión establecida:', connectionData)
      }

      if (message.event === 'pusher_internal:subscription_succeeded') {
        console.log('🎊 Suscripción exitosa al canal:', channelName)
      }
    }

    socket.onerror = (error) => {
      console.error('❌ WebSocket error:', error)
    }

    socket.onclose = () => {
      console.log('🔌 WebSocket cerrado')
    }

    return () => {
      socket.close()
    }
  }, [channelName, eventName, onMessage])
}
