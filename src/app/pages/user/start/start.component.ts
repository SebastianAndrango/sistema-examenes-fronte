import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  examId: any;
  questions: any;
  collectPoints = 0;
  correctAnswers = 0;
  attempts = 0;
  isSend = false;
  timer: any;

  constructor(
    private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.preventButtonReverse();
    this.examId = this.route.snapshot.params['examId'];
    console.log(this.examId);
    this.loadQuestions();
  }

  public loadQuestions() {
    this.questionService.getQuestionsForExam(this.examId).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;

        this.questions.forEach((question: any) => {
          question['givenAnswer'] = '';
        });
        console.log(this.questions);
        this.startTemporizator();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar las preguntas del examen', 'error');
      }
    );
  }

  public startTemporizator() {
    let time = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalueExam();
        clearInterval(time);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  public preventButtonReverse() {
    history.pushState(null, null!, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null!, location.href);
    });
  }

  public sendExam() {
    Swal.fire({
      title: '¿Estás seguro de enviar el examen?',
      text: 'No podrás cambiar las respuestas una vez enviadas',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.evalueExam();
      }
    });
  }

  public evalueExam() {
    this.questionService.evalueExam(this.questions).subscribe(
      (data:any)=>{
        console.log(data);
        this.correctAnswers = data.correctAnswers;
        this.collectPoints = data.collectPoints;
        this.attempts = data.attempts;
        this.isSend = true;
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error', 'Error al evaluar el examen', 'error');
      }
    );
    /*this.isSend = true;
    this.questions.forEach((question: any) => {
      if (question.givenAnswer === question.answer) {
        this.correctAnswers++;
        let points = this.questions[0].exam.maxPoints / this.questions.length;
        this.collectPoints += points;
      }
      //this.attempts++;
      if (question.givenAnswer.trim() != '') {
        this.attempts++;
      }
    });
    console.log('respuestas correctas: ' + this.correctAnswers);
    console.log('puntos: ' + this.collectPoints);
    console.log('intentos: ' + this.attempts);
    console.log(this.questions);*/
  }

  public getFormatTime() {
    let minute = Math.floor(this.timer / 60);
    let second = this.timer - minute * 60;
    return `${minute}: min : ${second} seg`;
  }

  public printPage(){
    window.print();
  }
}
