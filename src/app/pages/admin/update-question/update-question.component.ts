import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css'],
})
export class UpdateQuestionComponent implements OnInit {
  questionId: any = 0;
  question: any;
  exam: any;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionId = this.route.snapshot.params['questionId'];
    this.questionService.getQuestion(this.questionId).subscribe(
      (data: any) => {
        this.question = data;
        console.log(this.question);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public updateQuestion() {
    this.questionService.updateQuestion(this.question).subscribe(
      (data) => {
        Swal.fire(
          'Pregunta actualizada',
          'La pregunta ha sido actualizada con éxito',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate([
              '/admin/view-questions/' +
                this.question.exam.examId +
                '/' +
                this.question.exam.title,
            ]);
          }
        });
        this.router.navigate([
          '/admin/exams/questions',
          this.question.exam.examId,
          this.question.exam.title,
        ]);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
