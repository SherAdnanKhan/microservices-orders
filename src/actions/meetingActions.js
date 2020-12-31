import { START_MEETING, END_MEETING, UPDATE_TIMER, STOP_TIMER } from '../constants/actionTypes';

export const startMeeting = room => ({
  type: START_MEETING,
  paylaod: room
});

export const endMeeting = () => ({
  type: END_MEETING
});

export const updateTimer = () => ({
  type: UPDATE_TIMER,
});

export const stopTimer = () => ({
  type: STOP_TIMER,
});