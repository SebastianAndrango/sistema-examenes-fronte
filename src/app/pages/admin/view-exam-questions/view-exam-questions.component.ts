import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-exam-questions',
  templateUrl: './view-exam-questions.component.html',
  styleUrls: ['./view-exam-questions.component.css'],
})
export class ViewExamQuestionsComponent implements OnInit {
  examId: any;
  title: any;
  questions: any = [];

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    this.title = this.route.snapshot.params['title'];
    this.questionService.getQuestionsExam(this.examId).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public deleteQuestion(questionId: any) {
    Swal.fire({
      title: 'Eliminar pregunta',
      text: '¿Seguro que desea eliminar la pregunta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(questionId).subscribe(
          (data) => {
            Swal.fire(
              'Pregunta eliminada',
              'La pregunta ha sido eliminada con éxito',
              'success'
            );
            this.questions = this.questions.filter(
              (question: any) => question.questionId != questionId
            );
          },
          (error) => {
            Swal.fire(
              'Error',
              'Ha ocurrido un error al eliminar la pregunta',
              'error'
            );
            console.log(error);
          }
        );
      }
    });
  }
}
