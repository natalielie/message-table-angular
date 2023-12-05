import { createReducer, on } from '@ngrx/store';

import * as MessageActions from '../actions/message.actions';
import { IMessage } from 'src/app/interfaces/message.interface';

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
  on(MessageActions.getMessages, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(MessageActions.messagesLoaded, (state, { messagesResponse }) => {
    const result = {
      ...state,
      messages: messagesResponse,
    };
    return result;
  }),
  on(MessageActions.messagesLoadError, (state, { error }) => {
    const result = {
      ...state,
      messages: [],
      error: error,
    };
    return result;
  }),
  // create a message
  on(MessageActions.createMessage, (state, { message }) => {
    const result = {
      ...state,
      messages: [...state.messages, message],
    };

    return result;
  }),
  on(MessageActions.createMessageSuccess, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(MessageActions.createMessageLoadError, (state, { error }) => {
    const result = {
      ...state,
      error: error,
    };
    return result;
  }),
  // delete a message
  on(MessageActions.deleteMessage, (state, { messageId }) => {
    const messages = [...state.messages];
    const index = messages.findIndex((message) => message.id === messageId);
    messages.splice(index, 1);
    const result = {
      ...state,
      messages: messages,
    };
    return result;
  }),
  on(MessageActions.deleteMessageSuccess, (state) => {
    const result = {
      ...state,
    };
    return result;
  }),
  on(MessageActions.deleteMessageLoadError, (state, { error }) => {
    const result = {
      ...state,
      error: error,
    };
    return result;
  })
);
