import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  examId: any;
  title: any;
  question: any = {
    exam: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    this.title = this.route.snapshot.params['title'];
    this.question.exam['examId'] = this.examId;
  }

  public formSubmit() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      return;
    }
    if (this.question.option3.trim() == '' || this.question.option3 == null) {
      return;
    }
    if (this.question.option4.trim() == '' || this.question.option4 == null) {
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      return;
    }

    this.questionService.addQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire(
          'Pregunta guardada',
          'La pregunta ha sido agregada con éxito',
          'success'
        );
        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.answer = '';
      },
      (error) => {
        Swal.fire(
          'Error',
          'Ha ocurrido un error al agregar la pregunta',
          'error'
        );
        console.log(error);
      }
    );
  }
}
