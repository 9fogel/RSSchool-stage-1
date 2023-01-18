class View {
  public render(): void {
    this.renderHeader();
    this.renderMain();
  }

  private renderHeader(): void {
    const headerContent = `<header class="header container">
      <nav class="navigation">
        <ul class="nav-list">
          <li class="nav-item nav-item-active">Garage</li>
          <li class="nav-item">Winners</li>
        </ul>
      </nav>
    </header>`;

    document.body.innerHTML = headerContent;
  }

  private renderMain(): void {
    const mainContent = `<main class="main container">
    <h1 class="hidden">Async race</h1>
    </main>`;
    document.body.innerHTML += mainContent;
  }
}

export default View;
