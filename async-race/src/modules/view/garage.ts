import Controller from '../controller/controller';

class View {
  private readonly controller: Controller;

  constructor() {
    this.controller = new Controller();
  }

  // private renderButtons() {
  //   const getCarsBtn = document.createElement('button');
  //   getCarsBtn.innerText = 'Get Cars';
  //   document.body.append(getCarsBtn);

  //   const createBtn = document.createElement('button');
  //   createBtn.classList.add('create-btn');
  //   createBtn.innerText = 'Create';
  //   document.body.append(createBtn);

  //   const updateCarBtn = document.createElement('button');
  //   updateCarBtn.innerText = 'Update';
  //   document.body.append(updateCarBtn);

  //   getCarsBtn.addEventListener('click', this.controller.getCars);
  //   createBtn.addEventListener('click', this.controller.createCar);
  //   updateCarBtn.addEventListener('click', this.controller.updateCar);
  // }

  public render() {
    // this.renderButtons();
    this.controller.listenNav();
    this.controller.listenButtons();
  }
}

export default View;
