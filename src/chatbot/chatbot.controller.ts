import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ApiProperty } from '@nestjs/swagger';

export class WebhookBody {
  @ApiProperty({
    example: 'page',
  })
  object: string;

  @ApiProperty({
    example: [
      {
        messaging: [
          {
            message: 'TEST_MESSAGE',
          },
        ],
      },
    ],
  })
  entry: any[];
}

@Controller('')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Get()
  getHello(): string {
    return this.chatbotService.getHello();
  }

  @Post('/webhook')
  postWebhook(@Body() reqBody: WebhookBody) {
    console.log('>>>Received body: ' + JSON.stringify(reqBody) + '<<<');
    this.chatbotService.postWebhook(reqBody);
  }

  @Get('/messaging-webhook')
  getWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
  ) {
    return this.chatbotService.getWebhook(mode, token, challenge);
  }
}
