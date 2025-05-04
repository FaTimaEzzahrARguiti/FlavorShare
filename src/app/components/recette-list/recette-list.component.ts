import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecetteService } from '../../services/recette.service';
import { Recette } from 'src/app/recette.model';

@Component({
  selector: 'app-recette-list',
  templateUrl: './recette-list.component.html',
  styleUrls: ['./recette-list.component.css']
})
export class RecetteListComponent implements OnInit {
  recettes: Recette[] = [];
  filteredRecettes: Recette[] = [];
  recetteForm: FormGroup;
  selectedCategory: string = 'Toutes';

  constructor(private recetteService: RecetteService, private fb: FormBuilder) {
    this.recetteForm = this.fb.group({
      nom: ['', Validators.required],
      ingredient: ['', Validators.required],
      etapes: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRecettes();
  }

  loadRecettes(): void {
    this.recetteService.getRecettes().subscribe({
      next: (data) => {
        this.recettes = data;
        this.filterCategory(this.selectedCategory); // Appliquer le filtre initial
      },
      error: (error) => {
        console.error('Erreur lors du chargement des recettes:', error);
      }
    });
  }

  filterCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'Toutes') {
      this.filteredRecettes = [...this.recettes];
    } else {
      this.filteredRecettes = this.recettes.filter(recette => recette.category === category);
    }
  }

  openModal(): void {
    const modal = document.getElementById('addRecetteModal');
    if (modal) {
      const modalInstance = new (window as any).bootstrap.Modal(modal);
      modalInstance.show();
    }
  }

  onSubmit(): void {
    if (this.recetteForm.valid) {
      const recette: Recette = this.recetteForm.value;
      this.recetteService.createRecette(recette).subscribe({
        next: () => {
          this.loadRecettes();
          this.recetteForm.reset();
          this.closeModal();
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la recette:', error);
        }
      });
    }
  }

  closeModal(): void {
    const modal = document.getElementById('addRecetteModal');
    if (modal) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modal);
      modalInstance?.hide();
    }
  }
}