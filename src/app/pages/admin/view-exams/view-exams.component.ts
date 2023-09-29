import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-exams',
  templateUrl: './view-exams.component.html',
  styleUrls: ['./view-exams.component.css']
})
export class ViewExamsComponent implements OnInit {

  exams: any =[]

  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.examService.getExams().subscribe(
      (data: any) => {
        this.exams = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los exámenes', 'error');
      },
    )
  }

  public deleteExam(examId: any){
    Swal.fire({
      title: 'Eliminar examen',
      text: '¿Está seguro de eliminar el examen?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.examService.deleteExam(examId).subscribe(
          (data) => {
            this.exams= this.exams.filter((exam: any) => exam.examId !== examId);
            Swal.fire('Éxito', 'Examen eliminado', 'success');
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Error al eliminar el examen', 'error');
          }
        )
      }
    })
  }

}
