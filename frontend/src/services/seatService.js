import api from './api';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class SeatService {
  constructor() {
    this.stompClient = null;
    this.connected = false;
  }

  // Get seats by flight ID
  getSeatsByFlightId(flightId) {
    return api.get(`/api/seats/flight/${flightId}`);
  }

  // Get seat by flight ID and seat ID
  getSeatByFlightIdAndSeatId(flightId, seatId) {
    return api.get(`/api/seats/flight/${flightId}/seat/${seatId}`);
  }

  // Get seats by flight ID and status
  getSeatsByFlightIdAndStatus(flightId, status) {
    return api.get(`/api/seats/flight/${flightId}/status/${status}`);
  }

  // Lock a seat
  lockSeat(flightId, seatId) {
    return api.post(`/api/seats/flight/${flightId}/seat/${seatId}/lock`);
  }

  // Unlock a seat
  unlockSeat(flightId, seatId) {
    return api.post(`/api/seats/flight/${flightId}/seat/${seatId}/unlock`);
  }

  // Book a seat
  bookSeat(flightId, seatId) {
    return api.post(`/api/seats/flight/${flightId}/seat/${seatId}/book`);
  }

  // Connect to WebSocket for real-time seat updates
  connectToSeatUpdates(flightId, onSeatUpdate) {
    if (this.connected) {
      return;
    }

    const socket = new SockJS('http://localhost:8080/ws-seats');
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.connected = true;
      
      // Subscribe to seat updates for this flight
      this.stompClient.subscribe(`/topic/seats/${flightId}`, (response) => {
        if (onSeatUpdate) {
          const seatUpdate = JSON.parse(response.body);
          onSeatUpdate(seatUpdate);
        }
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.stompClient.activate();
  }

  // Disconnect from WebSocket
  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.connected = false;
    }
  }
}

export default new SeatService();