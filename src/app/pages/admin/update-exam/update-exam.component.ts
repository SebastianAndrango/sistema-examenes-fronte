import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-exam',
  templateUrl: './update-exam.component.html',
  styleUrls: ['./update-exam.component.css'],
})
export class UpdateExamComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  examId = 0;
  exam: any;
  categories: any;

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    this.examService.getExam(this.examId).subscribe(
      (data: any) => {
        this.exam = data;
        console.log(this.exam);
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        alert('Error al cargar las categorias');
      }
    );
  }

  public updateExam() {
    this.examService.updateExam(this.exam).subscribe(
      (data) => {
        Swal.fire(
          'Examen Actualizado',
          'El examen ha sido actualizado correctamente',
          'success'
        ).then(() => {
          this.router.navigate(['/admin/exams']);
        });
      },
      (error) => {
        Swal.fire(
          'Error',
          'Ha ocurrido un error al actualizar el examen',
          'error'
        );
      }
    );
  }
}
