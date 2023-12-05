import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers/message.reducers';

export const messagesFeature = createFeatureSelector<AppState>('messages');

export const selectAllMessages = createSelector(
  messagesFeature,
  (state) => state.messages
);

export const selectResultText = createSelector(
  messagesFeature,
  (state) => state.resultText
);

export const selectState = createSelector(messagesFeature, (state) => state);
