import { Injectable } from '@nestjs/common';

@Injectable()
export class MbtiService {
  analyzeAnswers(answers: number[]): string {
    let scores: { [key: string]: number } = {
      I: 0,
      E: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    };

    const answerMappings: { [index: number]: [string, string] } = {
      0: ['I', 'E'],
      1: ['N', 'S'],
      2: ['P', 'J'],
      3: ['N', 'S'],
      4: ['T', 'F'],
      5: ['N', 'S'],
      6: ['P', 'J'],
      7: ['S', 'N'],
      8: ['T', 'F'],
      9: ['J', 'P'],
      10: ['P', 'J'],
      11: ['I', 'E'],
      12: ['J', 'P'],
      13: ['N', 'S'],
      14: ['F', 'T'],
      15: ['T', 'F'],
      16: ['N', 'S'],
      17: ['E', 'I'],
      18: ['J', 'P'],
      19: ['P', 'J'],
    };

    answers.forEach((answer, index) => {
      const [type1, type2] = answerMappings[index];
      scores[answer === 0 ? type1 : type2]++;
    });

    console.log(scores);

    return (
      (scores.I > scores.E ? 'I' : 'E') +
      (scores.N > scores.S ? 'N' : 'S') +
      (scores.T > scores.F ? 'T' : 'F') +
      (scores.J > scores.P ? 'J' : 'P')
    );
  }
}
