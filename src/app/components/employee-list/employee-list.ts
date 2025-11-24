import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  employees: Employee[] = [];
  loading = false;
  error = '';
  private isLoading = false; // Protection contre les appels multiples

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('EmployeeList ngOnInit appelé');
    this.loadEmployees();
  }

  loadEmployees(): void {
    // Protection contre les appels multiples
    if (this.isLoading) {
      console.log('Chargement déjà en cours, ignore...');
      return;
    }

    this.isLoading = true;
    this.loading = true;
    this.error = '';
    
    // Vérifier que l'utilisateur est authentifié
    if (!this.authService.isAuthenticated()) {
      this.error = 'Vous n\'êtes pas authentifié. Redirection...';
      this.loading = false;
      this.isLoading = false;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
      return;
    }
    
    console.log('Chargement des employés...');
    console.log('Token présent:', !!this.authService.getToken());
    
    this.employeeService.getAll().pipe(
      finalize(() => {
        this.isLoading = false;
        this.loading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (data) => {
        console.log('Employés chargés:', data);
        this.employees = data || [];
        this.error = '';
      },
      error: (err) => {
        console.error('Erreur lors du chargement des employés:', err);
        console.error('Détails de l\'erreur:', {
          status: err.status,
          statusText: err.statusText,
          message: err.message,
          error: err.error
        });
        if (err.status === 401 || err.status === 403) {
          this.error = 'Session expirée. Veuillez vous reconnecter.';
        } else if (err.status === 0) {
          this.error = 'Impossible de se connecter au serveur. Vérifiez que le backend est démarré sur http://localhost:8080';
        } else {
          this.error = `Erreur lors du chargement des employés: ${err.message || err.statusText || 'Erreur inconnue'}`;
        }
      }
    });
  }

  deleteEmployee(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      this.employeeService.delete(id).subscribe({
        next: () => {
          this.loadEmployees();
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression';
        }
      });
    }
  }

  editEmployee(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/employees/edit', id]);
    }
  }

  addEmployee(): void {
    this.router.navigate(['/employees/new']);
  }
}
