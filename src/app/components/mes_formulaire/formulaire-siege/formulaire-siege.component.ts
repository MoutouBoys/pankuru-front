import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { RechercheComponent } from '../../recherche/recherche.component';
import { SiegeService } from '../../../service/sieges/siege.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulaire-siege',
  standalone: true,
  imports: [NgOptimizedImage, NavBarComponent, RechercheComponent, FormsModule],
  templateUrl: './formulaire-siege.component.html',
  styleUrl: './formulaire-siege.component.css'
})
export class FormulaireSiegeComponent   implements OnInit {

  faq: string= "assets/images/faq.svg";
  faq_icon: string= "assets/images/faq 1.png";
    ajouterImage: string = "assets/images/Ajouter.png";
    
    public sieges: any;
    public nouveauSiege: any = { nom: '', capaciteTotale: '', matricule: '', maintenance: '' };
  
    constructor(private siegeservice: SiegeService, private router: Router) {}
  
    ngOnInit(): void {
      this.afficher();
    }
  
    afficher(): void {
      this.siegeservice.getSiege().subscribe({
        next: (data) => {
          console.log(data);
          this.sieges = data;
          console.log("sieges: " + this.sieges);
        },
        error: (err) => {
          console.error("Erreur lors de la récupération des sieges: ", err);
        }
      });
    }
  
    ajouter(): void {
      this.siegeservice.postSiege(this.nouveauSiege).subscribe({
        next: (response) => {
          console.log("Siege ajouté avec succès", response);
          this.nouveauSiege = { nom: '', capaciteTotale: '', matricule: '', maintenance: '' }; // Réinitialiser le formulaire
          this.afficher(); // Mettre à jour la liste des sieges après ajout
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout du siege: ", err);
        }
      });
    }
  }
  
