import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrlProd from './helperProd';


@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) { }

  public getExams() {
    return this.http.get(`${baseUrlProd}/exam/`);
  }

  public addExam (exam: any) {
    return this.http.post(`${baseUrlProd}/exam/`, exam);
  }

  public deleteExam (examId: any) {
    return this.http.delete(`${baseUrlProd}/exam/${examId}`);
  }

  public getExam (examId: any) {
    return this.http.get(`${baseUrlProd}/exam/${examId}`);
  }

  public updateExam (exam: any) {
    return this.http.put(`${baseUrlProd}/exam/`, exam);
  }

  public getExamsByCategory(categoryId: any){
    return this.http.get(`${baseUrlProd}/exam/category/${categoryId}`);
  }

  public getExamsActives(){
    return this.http.get(`${baseUrlProd}/exam/active`);
  }

  public getExamsActivesByCategory(categoryId: any){
    return this.http.get(`${baseUrlProd}/exam/category/active/${categoryId}`);
  }
}
