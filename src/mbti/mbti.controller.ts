import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MbtiService } from './mbti.service';
import { AnswersDto } from './dto/answers.dto';

@Controller('mbti')
export class MbtiController {
  constructor(private readonly mbtiService: MbtiService) {}

  @Post()
  async analyzeAnswers(@Body() answersDto: AnswersDto) {
    const { answers } = answersDto;

    if (!answers || !Array.isArray(answers)) {
      throw new HttpException('Invalid answers format', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.mbtiService.analyzeAnswers(answers);
      return { result };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
