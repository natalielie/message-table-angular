import { createReducer, on } from '@ngrx/store';

import { IMessage } from 'src/app/interfaces/message.interface';
import {
  getMessages,
  messagesLoaded,
  messagesLoadError,
  createMessage,
  createMessageSuccess,
  createMessageLoadError,
  deleteMessage,
  deleteMessageSuccess,
  deleteMessageLoadError,
} from '../actions/message.actions';

export interface AppState {
  messages: IMessage[];
  error: string | null;
}

export const initialState: AppState = {
  messages: [],
  error: null,
};

export const MessageReducers = createReducer(
  initialState,
  // all messages
  on(getMessages, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(messagesLoaded, (state, { messagesResponse }) => {
    const result = {
      ...state,
      messages: messagesResponse,
    };
    return result;
  }),
  on(messagesLoadError, (state, { error }) => {
    const result = {
      ...state,
      messages: [],
      error: error,
    };
    return result;
  }),
  // create a message
  on(createMessage, (state, { message }) => {
    const result = {
      ...state,
      messages: [...state.messages, message],
    };

    return result;
  }),
  on(createMessageSuccess, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(createMessageLoadError, (state, { error }) => {
    const result = {
      ...state,
      error: error,
    };
    return result;
  }),
  // delete a message
  on(deleteMessage, (state, { messageId }) => {
    const messages = [...state.messages];
    const index = messages.findIndex((message) => message.id === messageId);
    messages.splice(index, 1);
    const result = {
      ...state,
      messages: messages,
    };
    return result;
  }),
  on(deleteMessageSuccess, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(deleteMessageLoadError, (state, { error }) => {
    const result = {
      ...state,
      error: error,
    };
    return result;
  })
);
