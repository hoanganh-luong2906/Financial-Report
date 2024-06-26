import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatbotController } from './chatbot/chatbot.controller';
import { ChatbotModule } from './chatbot/chatbot.module';
import { ChatbotService } from './chatbot/chatbot.service';

@Module({
  imports: [ChatbotModule],
  controllers: [AppController, ChatbotController],
  providers: [AppService, ChatbotService],
})
export class AppModule {}
