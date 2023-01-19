class Animation {
  public static start(carId: string, duration: number) {
    console.log('start animation');
    const carTracks = document.querySelectorAll('.car-item');
    const finishFlagPosition = 0.85;
    const distance = carTracks[+carId - 1].clientWidth * finishFlagPosition;
    this.animate(carId, distance, duration);
  }

  static animate(carId: string, distance: number, duration: number) {
    const carIcons: NodeListOf<HTMLDivElement> = document.querySelectorAll('.car-image');
    const animatedCar: HTMLDivElement = carIcons[+carId - 1];
    console.log(animatedCar);
    console.log('carId', carId);
    console.log('distance', distance);
    console.log('duration', duration);

    let currentX = animatedCar.offsetLeft;
    const durationSec = duration / 1000;
    const framesPerSec = 60;
    const framesCount = durationSec * framesPerSec;
    const dX = (distance - currentX) / framesCount;
    console.log(dX);

    const move = () => {
      currentX += dX;
      animatedCar.style.transform = `translateX(${currentX}px)`;

      if (currentX < distance) {
        requestAnimationFrame(move);
      }
    };
    move();
  }
}

export default Animation;
