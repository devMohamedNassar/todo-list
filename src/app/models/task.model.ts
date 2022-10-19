export class Task {
  id: string = `${(new Date()).valueOf()}`;
  done: boolean = false;

  constructor(public name: string){
    
  }
}