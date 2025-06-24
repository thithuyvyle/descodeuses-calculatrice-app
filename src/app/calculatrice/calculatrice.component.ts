import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-calculatrice',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './calculatrice.component.html',
  styleUrl: './calculatrice.component.css'
})
export class CalculatriceComponent {
  result: any = 0;
  operateurs = [
    { op: "+", value: "addition" },
    { op: "-", value: "soustraction" },
    { op: "/", value: "division" },
    { op: "x", value: "multiplication" },
  ];

  formGroup!: FormGroup;
  constructor(private fb: FormBuilder) {
    // si initialisation unique ss récup données externes: this.formGroup= this.fb.group ici dans constructor
    // this formGroup IngOnInit : pour récupérer formulaire avec données externes à l"ouverture 
    // puis init() { this.formGroup.setValue( {input1:1 , input2:2 operation: "soustraction"}) }
    this.formGroup = this.fb.group({
      input1: ["", [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      input2: ["", [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      operation: ["addition"], // valeur par défaut à l'affichage
    })
  };

  onInit() {
    {
      this.formGroup.setValue({   // .setValue permet de changer la valeur 
        input1: 1,
        input2: 2,
        operation: "soustraction",
      })
    }
  }

  onSubmit(input1: number, input2: number) {
    if(this.formGroup.invalid){
      alert('veuillez remplir les champs');
      return;
    } 
    if (this.formGroup.valid) {
      if (this.formGroup.value.operation == "addition") {
        this.result = input1 + input2
      };
      if (this.formGroup.value.operation == "soustraction") {
        this.result = input1 - input2
      };
      if (this.formGroup.value.operation == "division" && input2 !==0 ) {
        this.result = input1 / input2
      } else if ((this.formGroup.value.operation == "division" && input2 ==0 )){
        alert( "opération invalide");
        return;
      }
      if (this.formGroup.value.operation == "multiplication") {
        this.result = input1 * input2
      };
      if(this.result < 0) { this.result.style.color="red"}
    }
  }


}