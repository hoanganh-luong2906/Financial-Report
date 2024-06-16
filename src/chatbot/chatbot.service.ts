import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WebhookBody } from './chatbot.controller';
require('dotenv').config();

@Injectable()
export class ChatbotService {
  getHello(): string {
    return 'Hello World!';
  }

  handleMessage(sender_psid, received_message) {}

  // Handles messaging_postbacks events
  handlePostback(sender_psid, received_postback) {}

  // Sends response messages via the Send API
  callSendAPI(sender_psid, response) {}

  postWebhook(body: WebhookBody) {
    console.log(`Received webhook:`);
    console.dir(body);

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {
      // Iterate over each entry - there may be multiple if batched
      body.entry.forEach(function (entry: any) {
        // Get the webhook event. entry.messaging is an array, but
        // will only ever contain one event, so we get index 0
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);
      });

      // Return a '200 OK' response to all events
      return 'MESSAGE_RECEIVED';
    } else {
      // Return a '404 Not Found' if event is not from a page subscription
      throw new NotFoundException('NOT_FOUND');
    }
  }

  getWebhook(mode: string, token: string, challenge: string) {
    // Check if a token and mode is in the query string of the request
    if (mode && token) {
      // Check the mode and token sent is correct
      if (mode === 'subscribe' && token === process.env.MY_VERIFY_TOKEN) {
        // Respond with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        return challenge;
      } else {
        // Respond with '403 Forbidden' if verify tokens do not match
        throw new ForbiddenException('FORBIDDEN');
      }
    }
  }
}
