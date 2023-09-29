import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css'],
})
export class AddExamComponent implements OnInit {
  categories: any = [];

  examData = {
    title: '',
    description: '',
    maxPoints: '',
    questionNumbers: '',
    active: true,
    category: {
      categoryId: '',
    },
  };

  constructor(
    private categoryService: CategoryService,
    private snack: MatSnackBar,
    private examService: ExamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los datos', 'error');
      }
    );
  }

  public saveExam() {
    console.log(this.examData);
    if (this.examData.title.trim() == '' || this.examData.title == null) {
      this.snack.open('El título es requerido', '', {
        duration: 3000,
      });
      return;
    }
    this.examService.addExam(this.examData).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire('Examen guardado', 'Examen guardado correctamente', 'success');
        this.examData= {
          title: '',
          description: '',
          maxPoints: '',
          questionNumbers: '',
          active: true,
          category: {
            categoryId: '',
          },
        };
        this.router.navigate(['/admin/exams']);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al guardar el examen', 'error');
      }
    )
  }
}
