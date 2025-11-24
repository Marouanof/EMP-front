import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm implements OnInit {
  employee: Employee = {
    firstName: '',
    lastName: '',
    email: '',
    salary: 0
  };
  
  isEdit = false;
  loading = false;
  error = '';
  employeeId: number | null = null;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.employeeId = +id;
      this.loadEmployee(+id);
    }
  }

  loadEmployee(id: number): void {
    this.loading = true;
    this.employeeService.getById(id).subscribe({
      next: (data) => {
        this.employee = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement de l\'employé';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (!this.isValid()) {
      this.error = 'Veuillez remplir tous les champs correctement';
      return;
    }

    this.loading = true;
    this.error = '';

    if (this.isEdit && this.employeeId) {
      this.employeeService.update(this.employeeId, this.employee).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          this.error = 'Erreur lors de la mise à jour';
          this.loading = false;
        }
      });
    } else {
      this.employeeService.create(this.employee).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          this.error = 'Erreur lors de la création';
          this.loading = false;
        }
      });
    }
  }

  isValid(): boolean {
    return !!(
      this.employee.firstName &&
      this.employee.lastName &&
      this.employee.email &&
      this.employee.salary > 0 &&
      this.isValidEmail(this.employee.email)
    );
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
