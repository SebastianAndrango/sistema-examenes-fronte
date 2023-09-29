import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  categories: any;

  constructor(
    private categoryService: CategoryService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error: any) => {
        this.snack.open('Error al cargar las categorías', '', {
          duration: 3000,
        });
        console.log(error);
      }
    );
  }
}
