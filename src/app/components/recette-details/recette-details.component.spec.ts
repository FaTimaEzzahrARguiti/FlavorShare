import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetteService } from '../../services/recette.service';
import { Recette } from 'src/app/recette.model';


@Component({
  selector: 'app-recette-details',
  templateUrl: './recette-details.component.html',
  styleUrls: ['./recette-details.component.css']
})
export class RecetteDetailsComponent implements OnInit {
  recette: Recette | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recetteService: RecetteService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', id); // Débogage
    if (id && !isNaN(+id)) {
      this.recetteService.getRecette(+id).subscribe({
        next: (data) => {
          console.log('Recette récupérée:', data); // Débogage
          this.recette = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors du chargement de la recette:', error);
          this.errorMessage = 'Impossible de charger la recette. Vérifiez l\'ID ou réessayez plus tard.';
          this.isLoading = false;
        }
      });
    } else {
      console.error('ID de recette invalide:', id);
      this.errorMessage = 'ID de recette invalide.';
      this.isLoading = false;
    }
  }

  deleteRecette(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette recette ?')) {
      this.recetteService.deleteRecette(id).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.errorMessage = 'Erreur lors de la suppression de la recette.';
        }
      });
    }
  }
}