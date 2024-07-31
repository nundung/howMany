import {
  Body,
  Post,
  Controller,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { MbtiService } from './mbti.service';
import { AnswersDto } from './dto/answers.dto';
import {
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@Controller('api/v1/mbti')
@ApiTags('mbti API')
export class MbtiController {
  constructor(private readonly mbtiService: MbtiService) {}

  @Post()
  @ApiOperation({
    summary: 'mbti API',
    description: '사용자의 mbti 답변결과를 필터링',
  })
  @ApiBadRequestResponse({
    description: 'Invalid request format',
  })
  @ApiOkResponse({
    //영어로 수정하기
    description: 'OK',
    schema: {
      type: 'object',
      properties: {
        mbtiType: { type: 'string', example: 'INTJ' }, // MBTI 결과를 문자열로 반환
        scores: {
          type: 'object',
          properties: {
            I: { type: 'number', example: 2 },
            E: { type: 'number', example: 1 },
            N: { type: 'number', example: 4 },
            S: { type: 'number', example: 2 },
            T: { type: 'number', example: 4 },
            F: { type: 'number', example: 0 },
            J: { type: 'number', example: 5 },
            P: { type: 'number', example: 2 },
          },
        },
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        answers: {
          type: 'array',
          items: { type: 'number' },
          example: [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1], // 사용자 답변 예시
        },
      },
    },
  })
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
