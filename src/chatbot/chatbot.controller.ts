import { Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { NextFunction } from 'express';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Get()
  getHello(): string {
    return this.chatbotService.getHello();
  }

  @Post()
  @ApiOkResponse({ description: '' })
  postWebhook(req: any, res: Response, next: NextFunction) {}
}
