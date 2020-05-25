import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {CargoService} from '../../services/cargo.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data = {};

  constructor(
    private cargoService: CargoService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
this.getAllCargos();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.updateCargo();
  }

  addCargo(cargo) {
    const obj = {todo: cargo.value};
    this.cargoService.addCargo(obj)
      .subscribe((res: any) => {
        this.openSnackBar(res.message);
       this.getAllCargos();
       cargo.value='';
      }, (err) => {
        console.log(err);
      });
  }

  getAllCargos() {
    this.cargoService.getAllCargos()
      .subscribe((res) => {
        Object.keys(res).forEach(key =>{
          this.data[key]=res[key];
        });
      }, (err) => {
        console.log(err);
      });
  }

  updateCargo() {
    this.cargoService.updateCargo(this.data).subscribe((res: any) => {
      this.openSnackBar(res.message);
      this.getAllCargos();
    }, (err) => {
      console.log(err);
    });
  }

  removeCargo(id) {
    if (confirm('Bu maddeyi silmek istediğinize emin misiniz?')){
      this.cargoService.deleteCargo(id).subscribe((res: any) => {
        this.openSnackBar(res.message);
        this.getAllCargos();
      }, (err) => {
        console.log(err);
      });
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Tamam', {
      duration: 2000,
    });
  }
}
