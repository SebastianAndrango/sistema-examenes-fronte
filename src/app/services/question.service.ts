import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrlProd from './helperProd';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  public getQuestionsExam(examId: any) {
    return this.http.get(`${baseUrlProd}/question/exam/all/${examId}`);
  }

  public addQuestion(question: any) {
    return this.http.post(`${baseUrlProd}/question/`, question);
  }

  public deleteQuestion(questionId: any) {
    return this.http.delete(`${baseUrlProd}/question/${questionId}`);
  }

  public updateQuestion(question: any) {
    return this.http.put(`${baseUrlProd}/question/`, question);
  }

  public getQuestion(questionId: any) {
    return this.http.get(`${baseUrlProd}/question/${questionId}`);
  }

  public getQuestionsForExam(examId: any) {
    return this.http.get(`${baseUrlProd}/question/exam/all/${examId}`);
  }

  public evalueExam(questions: any){
    return this.http.post(`${baseUrlProd}/question/evalue-exam`, questions);
  }
}
