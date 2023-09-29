import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) { }

  public getExams() {
    return this.http.get(`${baserUrl}/exam/`);
  }

  public addExam (exam: any) {
    return this.http.post(`${baserUrl}/exam/`, exam);
  }

  public deleteExam (examId: any) {
    return this.http.delete(`${baserUrl}/exam/${examId}`);
  }

  public getExam (examId: any) {
    return this.http.get(`${baserUrl}/exam/${examId}`);
  }

  public updateExam (exam: any) {
    return this.http.put(`${baserUrl}/exam/`, exam);
  }

  public getExamsByCategory(categoryId: any){
    return this.http.get(`${baserUrl}/exam/category/${categoryId}`);
  }

  public getExamsActives(){
    return this.http.get(`${baserUrl}/exam/active`);
  }

  public getExamsActivesByCategory(categoryId: any){
    return this.http.get(`${baserUrl}/exam/category/active/${categoryId}`);
  }
}
