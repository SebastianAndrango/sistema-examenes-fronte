import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  public getQuestionsExam(examId: any) {
    return this.http.get(`${baserUrl}/question/exam/all/${examId}`);
  }

  public addQuestion(question: any) {
    return this.http.post(`${baserUrl}/question/`, question);
  }

  public deleteQuestion(questionId: any) {
    return this.http.delete(`${baserUrl}/question/${questionId}`);
  }

  public updateQuestion(question: any) {
    return this.http.put(`${baserUrl}/question/`, question);
  }

  public getQuestion(questionId: any) {
    return this.http.get(`${baserUrl}/question/${questionId}`);
  }

  public getQuestionsForExam(examId: any) {
    return this.http.get(`${baserUrl}/question/exam/all/${examId}`);
  }

  public evalueExam(questions: any){
    return this.http.post(`${baserUrl}/question/evalue-exam`, questions);
  }
}
