import { Injectable } from '@nestjs/common';

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

  postWebhook(req: any, res: Response) {
    let body = req.body;

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {
      // Iterate over each entry - there may be multiple if batched
      body.entry.forEach(function (entry) {
        // Get the webhook event. entry.messaging is an array, but
        // will only ever contain one event, so we get index 0
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);
      });

      // Return a '200 OK' response to all events
      res.ok;
      return 'MESSAGE_RECEIVED';
    } else {
      // Return a '404 Not Found' if event is not from a page subscription
      return 'NOT_FOUND';
    }
  }
}
