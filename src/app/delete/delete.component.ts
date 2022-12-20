import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  
@Input() item:string|undefined

  //@Input() -decoratorr ,used to hold data  from the parent(dashboard)
  //item will send to the parent (property binding [item]="acno")-dashboard.html

onCancel=new EventEmitter();//user defined event
  constructor() { }

  ngOnInit(): void {
  }
  cancel(){
    this.onCancel.emit();
  }
}
