import { START_MEETING, END_MEETING } from '../constants/actionTypes';

export const startMeeting = room => ({
  type: START_MEETING,
  paylaod: room
});

export const endMeeting = () => ({
  type: END_MEETING
});
