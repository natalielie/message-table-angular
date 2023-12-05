import { createAction, props } from '@ngrx/store';

import { IMessage } from 'src/app/interfaces/message.interface';

/** all messages */
export const getMessages = createAction('[Messages] Get Messages');

export const messagesLoaded = createAction(
  '[Messages] Messages Loaded',
  props<{ messagesResponse: IMessage[] }>()
);

export const messagesLoadError = createAction(
  '[Messages] Messages Not Loaded',
  props<{ error: string }>()
);

/** create a message */
export const createMessage = createAction(
  '[Messages] Proceed Creation',
  props<{ message: IMessage }>()
);

export const createMessageLoaded = createAction(
  '[Message] Create Loaded',
  props<{ resultText: string }>()
);

export const createMessageLoadError = createAction(
  '[Message] Create Not Loaded',
  props<{ error: string }>()
);

/** delete a message */
export const deleteMessage = createAction(
  '[Message] Proceed Delete',
  props<{ messageId: string }>()
);

export const deleteMessageLoaded = createAction(
  '[Message] Delete Loaded',
  props<{ resultText: string }>()
);

export const deleteMessageLoadError = createAction(
  '[Message] Delete Not Loaded',
  props<{ error: string }>()
);
