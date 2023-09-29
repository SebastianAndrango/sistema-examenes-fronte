import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  examId: any;
  exam: any = new Object();

  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    this.examService.getExam(this.examId).subscribe(
      (data: any) => {
        console.log(data);
        this.exam = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public startExam() {
    Swal.fire({
      title: '¿Quieres comenzar el examen?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Comenzar',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/start/' + this.examId]);
      }
    });
  }
}
