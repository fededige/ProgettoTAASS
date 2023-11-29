import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  // constructor(private _renderer: Renderer2){

  // }
  // ngOnDestroy(): void {
  //   this._renderer.removeStyle(document.body, 'overflow');
  // }
  // ngOnInit(): void {
  //   this._renderer.setStyle(document.body, 'overflow', 'hidden');
  // }

} 
