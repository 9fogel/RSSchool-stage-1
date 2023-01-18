class Winners {
  public render() {
    console.log('render winners');
    const main: HTMLElement | null = document.querySelector('.main');
    if (main) {
      main.innerHTML = this.renderMain();
    }
  }

  private renderMain() {
    const mainContent = `<div class="winners-wrapper">
    <h2 class="page-title">Winners</h2>
  </div>`;

    return mainContent;
  }
}

export default Winners;
